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
exports.productService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const product_model_1 = __importDefault(require("./product.model"));
const product_constant_1 = require("./product.constant");
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check duplicates entries
        const existingProduct = yield product_model_1.default.findOne(payload);
        if (existingProduct) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Product already exists');
        }
        const createProduct = yield product_model_1.default.create(payload);
        return createProduct;
    }
    catch (error) {
        throw error;
    }
});
// get all Product
const getProducts = (filters, paginationOptions, priceQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters
    // shortCut way
    , ["searchTerm"]);
    // shortCut way
    const andConditions = [];
    // price filter
    if (priceQuery.minPrice !== undefined && priceQuery.maxPrice !== undefined) {
        const minPrice = Number(priceQuery.minPrice);
        const maxPrice = Number(priceQuery.maxPrice);
        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
            andConditions.push({
                price: {
                    $gte: minPrice,
                    $lte: maxPrice,
                },
            });
        }
    }
    else if (priceQuery.minPrice !== undefined) {
        const minPrice = Number(priceQuery.minPrice);
        if (!isNaN(minPrice)) {
            andConditions.push({
                price: { $gte: minPrice },
            });
        }
    }
    else if (priceQuery.maxPrice !== undefined) {
        const maxPrice = Number(priceQuery.maxPrice);
        if (!isNaN(maxPrice)) {
            andConditions.push({
                price: { $lte: maxPrice },
            });
        }
    }
    // search term
    if (searchTerm)
        andConditions.push({
            $or: product_constant_1.productSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    // exact filter
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: {
                    $regex: new RegExp(`\\b${value}\\b`, 'i'),
                },
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield product_model_1.default.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield product_model_1.default.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get single user
const getSingleProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findById(productId);
        return product;
    }
    catch (error) {
        throw error;
    }
});
// Add product review
const addProductReview = (productId, review) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findById(productId).lean().exec();
        if (!product) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
        }
        // Make sure product.reviews is defined before pushing the new review
        if (!product.reviews) {
            product.reviews = [];
        }
        // Add the review to the product's reviews array
        review.date = new Date();
        product.reviews.push(review);
        // Save the updated product with the new review
        yield product_model_1.default.findByIdAndUpdate(productId, {
            reviews: product.reviews,
        }).exec();
    }
    catch (error) {
        throw error;
    }
});
// Check if the provided ID exists in the Product collection
// const checkProductExists = async (productId: string): Promise<boolean> => {
//   try {
//     const product = await Product.findById(productId)
//     return !!product // Return true if the product is found, false otherwise
//   } catch (error) {
//     throw error
//   }
// }
// const copyProductToMypc = async (productId: string): Promise<void> => {
//   try {
//     // Check if the product exists in the Product collection
//     const product = await Product.findById(productId)
//     if (!product) {
//       throw new Error('Product not found')
//     }
//     // Create a new collection 'mypc' and save the product data in it
//     const Mypc = mongoose.model('Mypc', Product.schema)
//     await Mypc.create(product.toObject())
//   } catch (error) {
//     throw error
//   }
// }
exports.productService = {
    createProduct,
    getProducts,
    getSingleProduct,
    addProductReview
};
