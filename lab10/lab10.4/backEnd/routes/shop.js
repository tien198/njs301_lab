const router = require('express').Router()
const { log } = require('console')

const shopController = require('../controllers/shop')


router.get('/', shopController.getProds)

router.get('/cart', shopController.getCart)
router.post('/cart', shopController.postCart)


module.exports = router