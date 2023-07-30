import express from 'express'
import { ProductRoutes } from '../modules/product/product.route'
import { PcBuild } from '../modules/pcBuild/pcBuild.route'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/pcbuild',
    route: PcBuild,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
