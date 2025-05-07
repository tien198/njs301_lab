const { error } = require('console')
const { ObjectId } = require('mongodb')
const Product = require('../models/product')

exports.postAddProduct = (req, res, next) => {
    const { title, price, imageUrl, description } = req.body
    const prod = new Product({ title, price, imageUrl, description })
    prod.save()
        .then(() => res.status(201).send('add-product complete!'))
        .catch(err => { error(err); res.status(400).send(err) })
}

exports.getFindAll = (req, res, next) => {
    Product.find()
        .then(prods => res.status(200).send(prods))
        .catch(err => { error(err); res.status(400).send(err) })
}

exports.getFindById = (req, res, next) => {
    const { prodId } = req.params
    Product.findById(prodId)
        .then(prod => res.send(prod))
        .catch(err => { error(err); res.status(400).send(err) })
}

exports.postEditProduct = (req, res, next) => {
    const { prodId, title, price, imageUrl, description } = req.body
    if (!prodId)
        return res.status(400).send(`'/admin/edit-product' request require 'prodId' property!`)
    Product.findByIdAndUpdate(
        prodId,
        { title, price, imageUrl, description }
    )
        .then(_ => res.status(200).send(`updated successfully, product with id: '${prodId}'`))
        .catch(err => { error(err); res.status(400).send(err) })
}

exports.postDeleteProduct = (req, res, next) => {
    const { prodId } = req.body
    Product.findByIdAndDelete(prodId)
        // Product.deleteById(prodId)
        //     .then(deleted => {
        //         let result = `Product with id: '${prodId}' was deleted`
        //         if (deleted.deletedCount === 0) {
        //             result = `Not found product with id: '${prodId}' to delete!`
        //             return res.status(404).send(result)
        //         }
        //         
        //     })
        .then(deleted => {
            let result = `Product with id: '${prodId}' was deleted`
            if (!deleted) 
                result = `Not found product with id: '${prodId}' to delete!`
            
            return res.status(404).send(result)
        })
        .catch(err => { error(err); res.status(400).send(err) })
}