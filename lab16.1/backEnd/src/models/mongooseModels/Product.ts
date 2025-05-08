import mongoose, { Schema } from 'mongoose'

import type IProduct  from '../interfaces/IProduct.ts'

const productSchema = new Schema<IProduct>({
    title: String,
    price: Number,
    imageUrl: String,
    description: String
})

export default mongoose.model<IProduct>('Product', productSchema)