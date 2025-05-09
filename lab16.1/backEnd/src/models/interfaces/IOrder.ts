import { Document } from 'mongoose'
import type IProduct from './IProduct.ts'

interface IOrderItem {
    product: IProduct
    quantity: Number
}

export default interface IOrder extends Document {
    items: IOrderItem[]
    total: number
    user: {}
}