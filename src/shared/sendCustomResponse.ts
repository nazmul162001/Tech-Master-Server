import { Response } from 'express'
import httpStatus from 'http-status'
import { IGenericResponseRoot } from '../interfaces/common'

export const sendSuccessResponse = <T>(
  res: Response,
  data: IGenericResponseRoot<T>
): void => {
  const response: IGenericResponseRoot<T> = {
    statusCode: httpStatus.OK,
    success: true,
    meta: data.meta,
    data: data.data,
    message: data.message || 'Success',
  }
  res.status(httpStatus.OK).json(response)
}
