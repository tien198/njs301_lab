const fs = require('fs')
const { log, error } = require('console')

const { prodsDataPath } = require('../utils/paths')

class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }
    
    save() {
        fs.readFile(prodsDataPath(), (err, data) => {
            if (err)
                error(err)
            else {
                const uptProds = JSON.parse(data.toString())
                uptProds.push(this)
                fs.writeFile(
                    prodsDataPath(),
                    JSON.stringify(uptProds), (err =>
                        err && error(err)
                ))
            }

        })
    }

    static getProds(cb) {
        fs.readFile(prodsDataPath(), 'utf-8', (err, data) => {
            if (err)
                error(err)
            else
                cb(JSON.parse(data))
        })
    }

    static fromObject(obj) {
        const prod = new Product()
        Object.assign(prod, obj)
        return prod
    }
}

module.exports = Product