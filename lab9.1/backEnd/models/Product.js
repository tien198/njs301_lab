const fs = require('fs')
const { log, error } = require('console')

const database = require('../utils/database')

class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }

    save() {

    }

    static find() {
        return database.execute('SELECT * FROM products')
            .catch(err => error(err))
    }

    static findByPk(id) {
        return database.execute('SELECT * FROM products WHERE products.id=?', [id])
            .catch(err => error(err))
    }

    static fromObject(obj) {
        const prod = new Product()
        Object.assign(prod, obj)
        return prod
    }
}

module.exports = Product