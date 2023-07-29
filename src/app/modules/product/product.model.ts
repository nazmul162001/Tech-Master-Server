import { Schema, model } from 'mongoose'
import { IProduct } from './product.interface'
import { categoriesArray, status } from './product.constant'

// Creating a product schema
const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: categoriesArray,
      required: true,
    },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: status, required: true },
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
        date: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
)

const Product = model<IProduct>('products', productSchema)
export default Product
