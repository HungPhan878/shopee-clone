import { User } from './user.type'
import { ResponsiveApi } from './utils.type'

export type AuthResponse = ResponsiveApi<{
  access_token: string
  expires: string
  user: User
}>
