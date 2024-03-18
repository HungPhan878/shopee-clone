import { User } from './user.type'
import { SuccessResponsiveApi } from './utils.type'

export type AuthResponse = SuccessResponsiveApi<{
  access_token: string
  expires: string
  user: User
}>
