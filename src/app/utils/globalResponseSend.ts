/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'

export const globalResponseSend = (
  res: Response,
  payload: { status: number; message: string; data: any },
) => {
  return res.status(payload.status).json({
    success: true,
    statusCode: payload.status,
    message: payload.message,
    data: payload.data,
  })
}
