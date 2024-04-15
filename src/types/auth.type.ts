import { User } from './user.type'
import { SuccessResponsiveApi } from './utils.type'

export type AuthResponse = SuccessResponsiveApi<{
  access_token: string
  refresh_token: string
  expires_refresh_token: string
  expires: string
  user: User
}>

export type RefreshTokenResponse = SuccessResponsiveApi<{
  access_token: string
}>
