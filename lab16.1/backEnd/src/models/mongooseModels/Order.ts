import  mongoose from 'mongoose'
const { Schema } = mongoose

import Product from './Product.js'

import type IOrder from '../interfaces/IOrder.ts'

const orderSchema = new Schema<IOrder>({
    items: [
        {
            product: {
                _id: Schema.Types.ObjectId,
                ...Product.schema.obj
            },
            quantity: Number
        }
    ],
    total: Number,

    user: {
        _id: Schema.Types.ObjectId,
        name: String
    }
})

export default mongoose.model<IOrder>('Order', orderSchema)