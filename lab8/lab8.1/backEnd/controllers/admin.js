const Product = require('../models/Product')

exports.addProduct = (req, res, next) => {
    const prod = Product.fromObject(req.body)
    prod.save()
    res.send('add-product complete!')
}