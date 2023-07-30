"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const product_constant_1 = require("./product.constant");
// Creating a product schema
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    category: {
        type: String,
        enum: product_constant_1.categoriesArray,
        required: true,
    },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: product_constant_1.status, required: true },
    userEmail: { type: String, default: '' },
    description: { type: String, required: true },
    keyFeatures: {
        type: {
            Brand: { type: String, required: true },
            Model: { type: String, required: true },
            Specification: { type: String, required: true },
            Port: { type: Number, required: true },
            Type: { type: String, required: true },
            Resolution: { type: String, required: true },
            Voltage: { type: String, required: true },
        },
        required: true,
    },
    individualRating: { type: Number },
    averageRating: { type: Number },
    reviews: [
        {
            name: { type: String, required: true },
            individualRating: { type: Number, required: true },
            comment: { type: String, required: true },
            date: { type: Date },
        },
    ],
}, { timestamps: true });
const Product = (0, mongoose_1.model)('products', productSchema);
exports.default = Product;
