import 'express'

import type IUser from '../models/interfaces/IUser'
import type { Document } from 'mongoose'

declare global {
    namespace Express {

        interface Request {
            user?: Document<IUser>
        }
    }
}