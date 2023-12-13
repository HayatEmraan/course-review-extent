import { Router } from 'express'
import { CategoryRoutes } from '../modules/category/category.routes'

export const router = Router()

const stackRoutes = [
  {
    path: '/categories',
    route: CategoryRoutes,
  },
]

stackRoutes.forEach(({ path, route }) => {
  router.use(path, route)
})
