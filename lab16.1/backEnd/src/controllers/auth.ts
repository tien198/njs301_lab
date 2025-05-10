import type { Request, Response, NextFunction } from 'express'

import type IAuthError from '../models/auth/authError.interface.ts'


import User from '../models/mongooseModels/user.ts'
import bcrypt from 'bcryptjs'
import ErrorRes from '../models/errorResponse.ts'



// req.body = { email, password }
export async function login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email }).lean()
        if (!user)
            throw new ErrorRes('User Not Found!')
        const isValid = await bcrypt.compare(password, user?.password)

    } catch (error) {
        next(error)
    }
}


// req.body = { email, password, confirmPassword }
export async function signup(req: Request, res: Response, next: NextFunction) {
    const { email, password, confirmPassword } = req.body
    try {
        if (password !== confirmPassword)
            throw new ErrorRes<IAuthError>('Creating user failed!', 400, { confirmPass: 'confirm password is not same to password' })

        const user = await User.findOne({ email }).lean()
        if (!user)
            throw new ErrorRes<IAuthError>('Creating user failed!', 400, { wasExist: 'user is existed' })

        const hashed = bcrypt.hashSync(password, 12)

        const created = await User.create({
            email: email, password: hashed
        })

        res.status(201).json(created)

    } catch (error) {
        next(error)
    }
}


export default { login, signup }