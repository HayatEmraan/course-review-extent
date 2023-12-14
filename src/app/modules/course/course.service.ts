import mongoose from 'mongoose'
import { ReviewModel } from '../review/review.schema'
import { detailsConst, durationCourse } from './course.constant'
import { CourseModel } from './course.schema'
import { TCourse } from './course.type'
import AppError from '../../errors/AppError'

const createCourse = async (payload: TCourse) => {
  const durationInWeeks = await durationCourse(
    payload?.startDate,
    payload?.endDate,
  )
  return CourseModel.create({
    ...payload,
    durationInWeeks,
  })
}

// todo
const getCourses = async () => {
  return CourseModel.find({})
}

const updateACourse = async (id: string, payload: Partial<TCourse>) => {
  const { tags, details, ...courseInfo } = payload
  const session = await mongoose.startSession()

  let durationInWeeks

  if (courseInfo?.startDate && courseInfo?.endDate) {
    durationInWeeks = await durationCourse(
      courseInfo?.startDate,
      courseInfo?.endDate,
    )
  }
  try {
    await session.startTransaction()
    const deletedTags = tags
      ?.filter(tag => tag.name && tag.isDeleted)
      .map(tag => tag.name)
    const addedTags = tags?.filter(tag => tag.name && !tag.isDeleted)

    if (details && Object.keys(details).length > 0) {
      const detailsObject = await detailsConst(details)
      await CourseModel.findByIdAndUpdate(id, detailsObject, {
        session,
      })
    }

    if (addedTags) {
      await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { tags: { $each: addedTags } },
        },
        {
          session,
        },
      )
    }

    if (deletedTags) {
      await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            tags: {
              name: {
                $in: deletedTags,
              },
            },
          },
        },
        {
          session,
        },
      )
    }
    const result = await CourseModel.findByIdAndUpdate(
      id,
      { ...courseInfo, durationInWeeks },
      { new: true, session },
    )

    await session.commitTransaction()
    await session.endSession()
    return result
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(500, 'Something went wrong')
  }
}

const getCourseWithReviews = async (id: string) => {
  const course = await CourseModel.findById(id)
  const reviews = await ReviewModel.find({ courseId: id })
  return {
    course,
    reviews,
  }
}

const getCourseWithBestRating = async () => {
  const avgRatingNCount = await ReviewModel.aggregate([
    {
      $group: {
        _id: '$courseId',
        reviewCount: {
          $count: {},
        },
        averageRating: {
          $avg: '$rating',
        },
      },
    },
    {
      $sort: {
        reviewCount: -1,
        averageRating: -1,
      },
    },
    {
      $limit: 1,
    },
  ])
    .lookup({
      from: 'courses',
      localField: '_id',
      foreignField: '_id',
      as: 'course',
    })
    .project({
      _id: 0,
      course: 1,
      averageRating: 1,
      reviewCount: 1,
    })

  return {
    course: avgRatingNCount[0]?.course[0],
    averageRating: avgRatingNCount[0]?.averageRating,
    reviewCount: avgRatingNCount[0]?.reviewCount,
  }
}

export const CourseService = {
  createCourse,
  getCourses,
  updateACourse,
  getCourseWithReviews,
  getCourseWithBestRating,
}
