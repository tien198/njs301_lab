const fs = require('fs')
const { log, error } = require('console')

const { prodsDataPath } = require('../utils/paths')

class Product {
    id
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
                if (!this.id) {
                    uptProds.push(this)
                    this.id = uptProds.length.toString()

                } else {
                    const index = uptProds.findIndex(i => i.id === this.id)
                    uptProds[index] = this
                }
                fs.writeFile(
                    prodsDataPath(),
                    JSON.stringify(uptProds), (err =>
                        err && error(err)
                ))
            }

        })
    }

    static find(cb) {
        fs.readFile(prodsDataPath(), 'utf-8', (err, data) => {
            if (err)
                error(err)
            else
                cb(JSON.parse(data))
        })
    }

    static findById(id, cb) {
        this.find(prods => {
            const prod = prods.find(i => i.id === id)
            if (prod)
                cb(prod)
            else try {
                throw Error(`Product with id: ${id}`)
            } catch (err) {
                error(err)
            }
        })
    }

    static fromObject(obj) {
        const prod = new Product()
        Object.assign(prod, obj)
        return prod
    }
}

module.exports = Product