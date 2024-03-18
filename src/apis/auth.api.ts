import { path } from 'src/constants/auth'
import { AuthResponse } from 'src/types/auth.type'

// components
import http from 'src/utils/http'

export const registerAccount = (body: { email: string; password: string }) => {
  return http.post<AuthResponse>('/register', body)
}

export const loginAccount = (body: { email: string; password: string }) => {
  return http.post<AuthResponse>(path.login, body)
}

export const logoutAccount = () => {
  return http.post('/logout')
}
