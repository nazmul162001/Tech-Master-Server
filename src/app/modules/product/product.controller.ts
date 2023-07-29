import { Request, Response } from 'express'
import { Document } from 'mongoose';
import { RequestHandler } from 'express-serve-static-core'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { productService } from './product.service'
import ApiError from '../../../errors/ApiError'
import pick from '../../../shared/pick'
import {
  PriceSearchableFields,
  productFilterableField,
} from './product.constant'
import { paginationFields } from '../../../constants/pagination'
import { IProduct, IReview } from './product.interface'

// create a new product
const createProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...productData } = req.body
    const result = await productService.createProduct(productData)

    sendResponse<IProduct>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product created successfully!',
      data: result,
    })
  }
)

// get all users
const getProducts: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, productFilterableField)
    const priceQuery = pick(req.query, PriceSearchableFields)
    const paginationOptions = pick(req.query, paginationFields)

    const result = await productService.getProducts(
      filters,
      paginationOptions,
      priceQuery
    )

    sendResponse<IProduct[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All products retrieved successfully!',
      meta: result.meta,
      data: result.data,
    })
  }
)

// get single product
const getSingleProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const productId = req.params.id
    const product = await productService.getSingleProduct(productId)

    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
    }

    sendResponse<IProduct>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product retrieved successfully!',
      data: product,
    })
  }
)

// Add product review
const addProductReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const productId = req.params.id;
    const { name, individualRating, comment } = req.body;

    const product = await productService.getSingleProduct(productId);

    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }

    // Make sure product.reviews is defined before pushing the new review
    if (!product.reviews) {
      product.reviews = [];
    }

    // Add the review to the product's reviews array
    const newReview: IReview = { name , individualRating, comment };
    product.reviews.push(newReview);

    // Save the updated product with the new review
    await productService.addProductReview(productId, newReview);

    sendResponse<IProduct>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review added successfully!',
      data: product,
    });
  }
);

export const ProductController = {
  createProduct,
  getProducts,
  getSingleProduct,
  addProductReview
}
