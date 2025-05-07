const { log } = require('console')

const Product = require('../models/product')

exports.getProds = (req, res, next) => {
    Product.getProds(data =>
        res.send(data)
    )
}