import express from 'express'
import { ProductController } from './product.controller'
const router = express.Router()

// create new product
router.post('/', ProductController.createProduct)
router.post('/:id/reviews', ProductController.addProductReview);
router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getSingleProduct)
// router.delete('/:id', ProductController.deleteUser)
// router.patch('/:id', ProductController.updateUser)
export const ProductRoutes = router
