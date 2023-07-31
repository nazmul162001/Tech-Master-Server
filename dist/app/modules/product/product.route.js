"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
// create new product
router.post('/', product_controller_1.ProductController.createProduct);
router.post('/:id/reviews', product_controller_1.ProductController.addProductReview);
router.get('/', product_controller_1.ProductController.getProducts);
router.get('/:id', product_controller_1.ProductController.getSingleProduct);
// router.delete('/:id', ProductController.deleteUser)
// router.patch('/:id', ProductController.updateUser)
exports.ProductRoutes = router;
