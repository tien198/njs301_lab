import { Router } from 'express'

import adminController from '../controllers/admin.js'
import Product from '../models/mongooseModels/Product.js'
import { error } from 'console'

const router = Router()

router.get('/products', adminController.getFindAll)
router.get('/product/:prodId', adminController.getFindById)
router.post('/add-product', adminController.postAddProduct);
router.post('/edit-product', adminController.postEditProduct);
router.post('/delete-product', adminController.postDeleteProduct)

export default router