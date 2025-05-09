import mongoose, { Model, Schema } from 'mongoose'

import type IProduct from '../interfaces/IProduct.ts'

const productSchema = new Schema<IProduct>({
    title: { type: String, require: true },
    price: { type: Number, require: true },
    imageUrl: { type: String, require: true },
    description: { type: String, require: true }
})

const ProductModel: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema)

export default ProductModel