import { ICategories, IStatus } from "./product.interface";

export const productFilterableField = [
  'searchTerm',
  'price',
  'name',
  'category',
  'status',
  'keyFeatures',
  'averageRating',
]

export const productSearchableFields = [
  'price',
  'name',
  'category',
  'status',
  'keyFeatures',
  'averageRating',
]


export const categoriesArray: ICategories[] = [
  'CPU / Processor',
  'Motherboard',
  'RAM',
  'Power Supply Unit',
  'Storage Device',
  'Monitor',
  'Others',
];
export const status: IStatus[] = ['In Stock', 'Out Of Stock'];

export const pcBuildFilterableFields = ['searchTerm', 'userEmail'];
export const PriceSearchableFields = ['maxPrice', 'minPrice']
