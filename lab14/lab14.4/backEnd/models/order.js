const mongoose = require('mongoose')
const { Schema } = mongoose

const { schema: productSchema } = require('./product')

const orderSchema = new Schema({
    items: [
        {
            product: {
                _id: Schema.Types.ObjectId,
                ...productSchema.obj
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

module.exports = mongoose.model('Order', orderSchema)