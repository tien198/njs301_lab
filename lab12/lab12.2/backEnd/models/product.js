const { error } = require('console')
const MongoDb = require('mongodb')
const { productCollection } = require('../utils/database')

class Product {
    constructor(title, price, imageUrl, description, _id) {
        this.title = title
        this.price = price
        this.imageUrl = imageUrl
        this.description = description
        this._id = _id ? MongoDb.ObjectId.createFromHexString(_id) : undefined
    }

    save() {
        if (!this._id)
            return productCollection()
                .then(col => col.insertOne(this))
        else
            return productCollection()
                .then(col => col.updateOne(
                    { _id: this._id },
                    { $set: this },
                ))
    }

    static findAll() {
        return productCollection()
            .then(col => col.find().toArray())
    }

    static findById(id) {
        return productCollection()
            .then(col => col.findOne({ _id: MongoDb.ObjectId.createFromHexString(id) }))
    }

    static deleteById(id) {
        return productCollection()
            .then(col => col.deleteOne({ _id: MongoDb.ObjectId.createFromHexString(id) }))
    }
}

module.exports = Product