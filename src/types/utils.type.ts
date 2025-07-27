export interface SuccessResponse<Data> {
  message: string
  data: Data
}
export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

export type NoUndefinedFields<T> = {
  [P in keyof T]-?: NoUndefinedFields<NonNullable<T[P]>>
}
