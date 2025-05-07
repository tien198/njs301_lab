const fs = require('fs')
const { prodsDataPath, cartsDataPath } = require('../utils/paths')
const { error, log } = require('console')

module.exports = class Cart {
    static addProduct(id, price, cb) {
        let cProds
        this.readCart(cartData => {
            const cart = JSON.parse(cartData)

            cProds = cart.products
            const exProd = cProds.find(i => i.id === id)
            if (!exProd) {
                cProds.push({
                    id: id,
                    qty: 1
                })
                cart.products = cProds
                cart.totalPrice = +cart.totalPrice + +price
                this.writeCart(JSON.stringify(cart))
            }
            else {
                const index = cProds.findIndex(i => i.id === id)
                cProds[index].qty++
                cart.totalPrice += +price
                this.writeCart(JSON.stringify(cart))
            }
            cb()
        })
    }

    static readCart(cb) {
        fs.readFile(cartsDataPath(), { encoding: 'utf-8' }, (err, data) => {
            if (err && err.message.includes('no such file or directory')) {
                error(err)
                log('create new file', cartsDataPath())
                const cart = {
                    products: [],
                    totalPrice: 0
                };
                const jsonCart = JSON.stringify(cart)
                fs.writeFileSync(cartsDataPath(), jsonCart)
                cb(jsonCart)
            }
            else if (err)
                error(err)
            else
                cb(data)
        })
    }

    static writeCart(jsonCart) {
        fs.writeFile(cartsDataPath(), jsonCart, err => err && error(err))
    }
}
