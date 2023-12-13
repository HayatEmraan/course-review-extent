import { Router } from 'express'
import { CourseController } from './course.controller'

export const CourseRoutes = Router()

CourseRoutes.post('/', CourseController.createCourse)

CourseRoutes.get('/', CourseController.getCourses)
