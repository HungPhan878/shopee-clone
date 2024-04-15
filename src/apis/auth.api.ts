/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/namespace */
import { AuthResponse } from 'src/types/auth.type'

// components
// eslint-disable-next-line import/default, import/no-named-as-default
import http from 'src/utils/http'

export const URL_LOGIN = 'login'
export const URL_REGISTER = 'register'
export const URL_REFRESH_TOKEN = 'refresh-access-token'
export const URL_LOGOUT = 'logout'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_REGISTER, body)
  },

  loginAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, body)
  },

  logoutAccount() {
    return http.post(URL_LOGOUT)
  }
}

export default authApi
