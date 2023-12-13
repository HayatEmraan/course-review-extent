import { RequestHandler } from 'express'
import { CategoryService } from './category.service'
import { globalResponseSend } from '../../utils/globalResponseSend'

const createCategory: RequestHandler = async (req, res) => {
  return globalResponseSend(res, {
    status: 201,
    message: 'Category created successfully',
    data: await CategoryService.createCategory(req.body),
  })
}

const getCategories: RequestHandler = async (req, res) => {
  return globalResponseSend(res, {
    status: 200,
    message: 'Categories retrieved successfully',
    data: await CategoryService.getCategories(),
  })
}

const updateReview: RequestHandler = async (req, res) => {
  return globalResponseSend(res, {
    status: 200,
    message: 'Review updated successfully',
    data: [],
  })
}

export const CategoryController = {
  createCategory,
  getCategories,
  updateReview,
}
