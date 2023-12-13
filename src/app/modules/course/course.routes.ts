import { Router } from 'express'
import { CourseController } from './course.controller'
// Course Routes
export const CourseRoutes = Router()

CourseRoutes.post('/', CourseController.createCourse)
CourseRoutes.get('/best', CourseController.getCourses)

// Courses Routes
export const CoursesRoutes = Router()

CoursesRoutes.get('/', CourseController.getCourses)
CoursesRoutes.put('/:courseId', CourseController.getCourses)
CoursesRoutes.put('/:courseId/reviews', CourseController.getCourses)
