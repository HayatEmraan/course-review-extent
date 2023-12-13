import { RequestHandler } from 'express'
import { globalResponseSend } from '../../utils/globalResponseSend'
import { CourseService } from './course.service'


// Single Course Routes Controller
const createCourse: RequestHandler = async (req, res) => {
  return globalResponseSend(res, {
    status: 201,
    message: 'Course created successfully',
    data: await CourseService.createCourse(req.body),
  })
}





// Courses Routes Controller
const getCourses: RequestHandler = async (req, res) => {
  return globalResponseSend(res, {
    status: 200,
    message: 'Courses retrieved successfully',
    data: await CourseService.getCourses(),
  })
}




export const CourseController = {
  createCourse,
  getCourses,
}
