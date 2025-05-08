import type { Document, ObjectId } from 'mongoose'

export interface ICartItem {
    product: ObjectId
    quantity: number
}

export default interface IUser extends Document {
    name: string,
    email: string,
    cart: {
        items: ICartItem[],
        total: number
    },
}