const { log, error } = require('console')

const Product = require('../models/Product')

exports.postAddProduct = (req, res, next) => {
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

exports.getFindAll = (req, res, next) => {
    Product.findAll()
        .then(prods => res.status(200).send(prods))
        .catch(err => error(err))
}

exports.getFindById = (req, res, next) => {
    const { prodId } = req.params
    Product.findAll({ where: { id: prodId } })
        .then(prods => res.send(prods[0]))
        .catch(err => error(err))
}

exports.postEditProduct = (req, res, next) => {
    const { prodId, title, price, imageUrl, description } = req.body
    if (!prodId)
        return res.status(400).send(`'/admin/edit-product' request require 'prodId' property!`)
    Product.findByPk(prodId)
        .then(prod => {
            prod.title = title ? title : ''
            prod.price = price ? price : 0
            prod.imageUrl = imageUrl ? imageUrl : ''
            prod.description = description ? description : ''
            return prod.save()
                .catch(err => error(err))
        })
        .then(() => res.status(200).send('edit successfully!'))
        .catch(err => error(err))
}

exports.postDeleteProduct = (req, res, next) => {
    const { prodId } = req.body
    Product.findByPk(prodId)
        .then(prod => {
            prod.destroy()
            res.status(200).send(`Product with ${prodId} was deleted`)
        })
        .catch(err => error(err))
}