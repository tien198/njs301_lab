import type { Document, ObjectId, UpdateResult } from 'mongoose'
import type IProduct from './IProduct.ts'
import type IOrder from './IOrder.ts'

export interface ICartItem {
    product: ObjectId
    quantity: number
}

interface ICart {
    items: ICartItem[],
    total: number
}

export default interface IUser extends Document {
    name: string
    email: string
    cart: ICart
    getCart(): Promise<ICart>
    addToCart(prod: IProduct, quantity: number): Promise<Document<IUser>>
    addOrder(): Promise<Document<IUser>>
    getOrders(): Promise<IOrder>
}