const router = require('express').Router()

const adminController = require('../controllers/admin')

router.get('/products', adminController.findAll)
router.get('/product/:prodId', adminController.findById)
router.post('/add-product', adminController.addProduct)
router.post('/delete-product', adminController.deleteProduct)

module.exports = router