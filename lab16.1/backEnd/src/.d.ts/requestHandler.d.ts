import 'express'

import type IUser from '../models/interfaces/user.ts'
import type { Document, Model } from 'mongoose'

declare global {
    namespace Express {

        interface Request {
            user?: IUser
        }
    }
}