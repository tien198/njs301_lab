const router = require('express').Router()

const { addProduct } = require('../controllers/admin')

router.post('/add-product', addProduct)

module.exports = router