import 'express'

import type IUser from '../models/interfaces/IUser.ts'
import type { Document } from 'mongoose'

declare global {
    namespace Express {

        interface Request {
            user?: IUser
        }
    }
}