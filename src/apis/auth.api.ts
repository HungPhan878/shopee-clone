import {path} from 'src/constants/auth'
import { AuthResponse } from 'src/types/auth.type'

// components
import http from 'src/utils/http'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>('/register', body)
  },

  loginAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(path.login, body)
  },

  logoutAccount() {
    return http.post(path.logout)
  }
}

export default authApi
