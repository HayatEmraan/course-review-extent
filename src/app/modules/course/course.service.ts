import { CourseModel } from "./course.schema";
import { TCourse } from "./course.type";

const createCourse = async (payload: TCourse) => {
    return CourseModel.create(payload);
}

const getCourses = async () => {
    return CourseModel.find({});
}


export const CourseService = {
    createCourse,
    getCourses
}