import { Request, Response } from 'express'
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
import { IProduct } from './product.interface'

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

// // delete user
// const deleteUser: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const id = req.params.id
//     await userService.deleteUser(id)

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'User deleted successfully!',
//     })
//   }
// )

// // update user
// const updateUser: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const id = req.params.id
//     const updateData = req.body
//     const updatedUser = await userService.updateUser(id, updateData)

//     if (!updatedUser) {
//       throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
//     }

//     sendResponse<IUser>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'User updated successfully!',
//       data: updatedUser,
//     })
//   }
// )

export const ProductController = {
  createProduct,
  getProducts,
  getSingleProduct,
}
