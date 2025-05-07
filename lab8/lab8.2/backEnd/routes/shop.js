const router = require('express').Router()
const { log } = require('console')

const shopController = require('../controllers/shop')
const Product = require('../models/Product')


router.get('/', shopController.getProds)
router.get('/product/:prodId', shopController.getProd)

router.get('/cart', shopController.getCart)
router.post('/cart', shopController.postCart)


module.exports = router