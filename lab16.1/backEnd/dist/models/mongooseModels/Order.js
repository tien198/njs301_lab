import mongoose from 'mongoose';
const { Schema } = mongoose;
import Product from './Product.js';
const orderSchema = new Schema({
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
});
export default mongoose.model('Order', orderSchema);
