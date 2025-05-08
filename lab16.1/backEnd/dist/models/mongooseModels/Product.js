import mongoose, { Schema } from 'mongoose';
const productSchema = new Schema({
    title: String,
    price: Number,
    imageUrl: String,
    description: String
});
export default mongoose.model('Product', productSchema);
