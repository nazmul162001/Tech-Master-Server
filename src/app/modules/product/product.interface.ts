import { Model } from 'mongoose'

export type IPriceFilters = {
  maxPrice?: number
  minPrice?: number
}

export type IProduct = {
  name: string
  category: ICategories
  image: string
  price: number
  status?: IStatus
  description: string
  keyFeatures: IKeyFeature
  individualRating?: number
  averageRating?: number
  reviews?: IReview[]
  _id?: string
  data?: Date
  userEmail?: string
}

export type IProductFilter = {
  searchTerm?: string
  name?: string
  category?: ICategories
  price?: number
  status?: IStatus
  keyFeatures?: IKeyFeature
  individualRating?: number
  averageRating?: number
}

export type ICategories =
  | 'CPU / Processor'
  | 'Motherboard'
  | 'RAM'
  | 'Power Supply Unit'
  | 'Storage Device'
  | 'Monitor'
  | 'Others'

export type IStatus = 'In Stock' | 'Out Of Stock'

export type IKeyFeature = {
  Brand: string
  Model: string
  Specification: string
  Port: number
  Type: string
  Resolution: string
  Voltage: string
}

// export type IReview = [
//   {
//     name: string;
//     individualRating: number;
//     comment: string;
//     date: string;
//   },
//   ];
export type IReview = {
  name: string
  individualRating: number
  comment: string
  date?: Date
}

export type ProductModel = Model<IProduct, Record<string, unknown>>
