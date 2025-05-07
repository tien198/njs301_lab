const Product = require('../models/Product')

exports.addProduct = (req, res, next) => {
    const prod = Product.fromObject(req.body)
    prod.save()
    res.send('add-product complete!')
}

exports.editProduct = (req,res,next)=>{
    const prod = Product.fromObject(req.body)
    prod.save()
    res.send('edit-product complete!')
}