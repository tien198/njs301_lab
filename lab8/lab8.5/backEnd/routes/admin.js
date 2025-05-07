const router = require('express').Router()
const {log}= require('console')

const adminController = require('../controllers/admin')

router.post('/add-product', adminController.addProduct)
router.post('/edit-product', adminController.editProduct)

module.exports = router