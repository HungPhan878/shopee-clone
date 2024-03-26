export type ErrorResponsiveApi<Data> = {
  message: string
  data?: Data
}

export type SuccessResponsiveApi<Data> = {
  message: string
  data: Data
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
