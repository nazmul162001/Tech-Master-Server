import ApiError from '../../../errors/ApiError'
import { IPriceFilters, IProduct, IProductFilter } from './product.interface'
import httpStatus from 'http-status'
import User from './product.model'
import { IPaginationOptions } from '../../../interfaces/paginations'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelper } from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'
import Product from './product.model'
import { productSearchableFields } from './product.constant'

const createProduct = async (payload: IProduct): Promise<IProduct> => {
  try {
    // check duplicates entries
    const existingProduct = await Product.findOne(payload)
    if (existingProduct) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Product already exists')
    }
    const createProduct = await Product.create(payload)
    return createProduct
  } catch (error) {
    throw error
  }
}

// get all Product
const getProducts = async (
  filters: IProductFilter,
  paginationOptions: IPaginationOptions,
  priceQuery: IPriceFilters
): Promise<IGenericResponse<IProduct[]>> => {
  const { searchTerm, ...filtersData } = filters
  // shortCut way
  const andConditions = []

  // price filter
  if (priceQuery.minPrice !== undefined && priceQuery.maxPrice !== undefined) {
    const minPrice = Number(priceQuery.minPrice)
    const maxPrice = Number(priceQuery.maxPrice)

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      andConditions.push({
        price: {
          $gte: minPrice,
          $lte: maxPrice,
        },
      })
    }
  } else if (priceQuery.minPrice !== undefined) {
    const minPrice = Number(priceQuery.minPrice)

    if (!isNaN(minPrice)) {
      andConditions.push({
        price: { $gte: minPrice },
      })
    }
  } else if (priceQuery.maxPrice !== undefined) {
    const maxPrice = Number(priceQuery.maxPrice)

    if (!isNaN(maxPrice)) {
      andConditions.push({
        price: { $lte: maxPrice },
      })
    }
  }
  // search term
  if (searchTerm)
    andConditions.push({
      $or: productSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })

  // exact filter
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: {
          $regex: new RegExp(`\\b${value}\\b`, 'i'),
        },
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Product.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Product.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

// get single user
const getSingleProduct = async (productId: string): Promise<IProduct | null> => {
  try {
    const product = await Product.findById(productId)
    return product
  } catch (error) {
    throw error
  }
}
// delete user
// const deleteUser = async (id: string): Promise<void> => {
//   try {
//     const user = await User.findByIdAndDelete(id)
//     if (!user) {
//       throw new Error('User not found')
//     }
//   } catch (error) {
//     throw error
//   }
// }
// // update user
// const updateUser = async (
//   id: string,
//   payload: Partial<IUser>
// ): Promise<IUser | null> => {
//   try {
//     const user = await User.findByIdAndUpdate(id, payload, { new: true })
//     return user
//   } catch (error) {
//     throw error
//   }
// }

export const productService = {
  createProduct,
  getProducts,
  getSingleProduct
}
