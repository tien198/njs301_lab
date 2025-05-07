const { log, error } = require('console')

const Product = require('../models/Product')

exports.addProduct = (req, res, next) => {
    const { title, price, imageUrl, description } = req.body
    Product.create({
        title,
        price: +price,
        imageUrl,
        descriptions
    })
        .then(() => res.status(201).send('add-product complete!'))
        .catch(err => error(err))
}

exports.findAll = (req, res, next) => {
    Product.findAll()
        .then(prods => res.status(200).send(prods))
        .catch(err => error(err))
}

exports.findById = (req, res, next) => {
    const { prodId } = req.params
    Product.findByPk(prodId)
        .then(prod => res.send(prod))
        .catch(err => error(err))
}

exports.deleteProduct = req, res, next => {
    const { prodId } = req.body
    Product.findByPk(prodId)
        .then(prod => {
            prod.destroy()
                .then(() => res.status(200).send(`Product with ${prodId} was deleted`))
                .catch(err => error(err))
        })
        .catch(err => error(err))
}