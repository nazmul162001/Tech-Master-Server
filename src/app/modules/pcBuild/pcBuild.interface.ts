import { Model, Types } from 'mongoose'
import { IProduct } from '../product/product.interface'

export interface IPCBuild {
  product: Types.ObjectId | IProduct
  userEmail: string
}

export interface IPCBuildFilter {
  searchTerm?: string
  userEmail?: string
}

export type PcBuildModel = Model<IPCBuild, Record<string, unknown>>
