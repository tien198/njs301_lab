const { log, error } = require('console')

const Product = require('../models/product')

exports.getProds = (req, res, next) => {
    Product.find()
        .then(prods => res.send(prods))
}

exports.getCart = (req, res, next) => {
    const user = req.user
    user.getCart()
        .then(cart =>
            res.status(200).send(cart)
        )
        .catch(err => res.status(400).send(err))
}

exports.postCart = (req, res, next) => {
    const { prodId } = req.body
    const user = req.user

    Product.findById(prodId)
        .then(prod => {
            if (!prod)
                throw Error(`Not found product with id: ${prodId}`)
            return user.addToCart(prod, 1)
        })
        .then(_ =>
            res.status(200).send(`Added to cart product with id: ${prodId}`)
        )
        .catch(err => {
            error(err)
            res.status(400).send(err)
        })
}

exports.getOrders = (req, res, next) => {
    const user = req.user
    user.getOrders()
        .then(orders =>
            res.status(200).send(orders)
        )
        .catch(err => res.status(400).send(err))
}

exports.postOrder = (req, res, next) => {
    const user = req.user
    user.addOrder()
        .then(() => res.status(200).send(`Add order successfully! cart'll be reseted!`))
        .catch(err => {
            error(err)
            res.status(400).send(err)
        })
}