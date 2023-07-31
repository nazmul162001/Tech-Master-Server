"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const product_service_1 = require("./product.service");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const product_constant_1 = require("./product.constant");
const pagination_1 = require("../../../constants/pagination");
// create a new product
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = __rest(req.body, []);
    const result = yield product_service_1.productService.createProduct(productData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product created successfully!',
        data: result,
    });
}));
// get all users
const getProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, product_constant_1.productFilterableField);
    const priceQuery = (0, pick_1.default)(req.query, product_constant_1.PriceSearchableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield product_service_1.productService.getProducts(filters, paginationOptions, priceQuery);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All products retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
}));
// get single product
const getSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const product = yield product_service_1.productService.getSingleProduct(productId);
    if (!product) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product retrieved successfully!',
        data: product,
    });
}));
// Add product review
const addProductReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const { name, individualRating, comment } = req.body;
    const product = yield product_service_1.productService.getSingleProduct(productId);
    if (!product) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    }
    // Make sure product.reviews is defined before pushing the new review
    if (!product.reviews) {
        product.reviews = [];
    }
    // Add the review to the product's reviews array
    const newReview = { name, individualRating, comment };
    product.reviews.push(newReview);
    // Save the updated product with the new review
    yield product_service_1.productService.addProductReview(productId, newReview);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Review added successfully!',
        data: product,
    });
}));
// Create a new collection and copy the data from the Product collection
// const copyProductToMypc: RequestHandler = catchAsync(async (req, res) => {
//   const { id } = req.body
//   // Call the service function to copy the product to 'mypc' collection
//   await productService.copyProductToMypc(id)
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Product data copied to "mypc" collection successfully!',
//   })
// })
exports.ProductController = {
    createProduct,
    getProducts,
    getSingleProduct,
    addProductReview,
};
