const mongoose = require('mongoose')

const { Schema } = mongoose

const productSchema = new Schema({
    title: String,
    price: Number,
    imageUrl: String,
    description: String
})

module.exports = mongoose.model('Product', productSchema)