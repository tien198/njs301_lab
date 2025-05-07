const router = require('express').Router()
const {log}= require('console')

const adminController = require('../controllers/admin')

router.post('/add-product', adminController.addProduct)

module.exports = router