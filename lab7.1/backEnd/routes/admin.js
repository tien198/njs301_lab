const router = require('express').Router()

const Product = require('../models/product')

router.post('/add-product', (req, res, next) => {
    const prod = Product.fromObject(req.body)
    prod.save()
    res.send('add-product complete!')
})

module.exports = router