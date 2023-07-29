import { IGenericErrorMessage } from './error'

export type IGenericResponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}

export interface IGenericResponseRoot<T> {
  statusCode?: number
  success?: boolean
  meta?: {
    page?: number
    limit?: number
    total?: number
  }
  data?: T
  message: string
}


export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}
