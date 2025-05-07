const { log, error } = require('console')

const Product = require('../models/Product')
const Cart = require('../models/Cart')

exports.getProds = (req, res, next) => {
    Product.findAll()
        .then(prods => res.send(prods))
        .catch(err => error(err))
}

exports.getCart = (req, res, next) => {
    Cart.readCart(cart =>
        res.send(cart)
    )
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.prodId
    const price = req.body.price
    Cart.addProduct(prodId, price, () => res.send(301))
}
