const router = require('express').Router()
const { log } = require('console')

const shopController = require('../controllers/shop')


router.get('/', shopController.getProds)


module.exports = router