/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  type AxiosInstance
} from 'axios'
import { toast } from 'react-toastify'

// components
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import authLS from './auth'
import { AuthResponse, RefreshTokenResponse } from 'src/types/auth.type'
import config from 'src/constants/config'
import {
  URL_LOGIN,
  URL_LOGOUT,
  URL_REFRESH_TOKEN,
  URL_REGISTER
} from 'src/apis/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorResponsiveApi } from 'src/types/utils.type'

export class Http {
  instance: AxiosInstance
  private access_token: string
  private refresh_token: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    ;(this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
        // gửi lên headers reset lại time cho acc và ref
        // 'expire-access-token': 10,
        // 'expire-refresh-token': 60 * 60
      }
    })),
      (this.access_token = authLS.getAccessTokenFromLs()),
      (this.refresh_token = authLS.getRefreshTokenFromLs()),
      (this.refreshTokenRequest = null),
      // Add a request interceptor
      this.instance.interceptors.request.use(
        (config) => {
          // Do something before request is sent
          if (this.access_token && config.headers) {
            config.headers.Authorization = this.access_token
            return config
          }
          return config
        },
        function (error) {
          // Do something with request error
          return Promise.reject(error)
        }
      )

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        const data = response.data as AuthResponse
        if (url === URL_LOGIN || url === URL_REGISTER) {
          this.access_token = data.data.access_token
          this.refresh_token = data.data.refresh_token
          authLS.setAccessTokenToLs(this.access_token)
          authLS.setRefreshTokenToLs(this.refresh_token)
          authLS.setProfileToLS(data.data.user)
        } else if (url === URL_LOGOUT) {
          this.access_token = ''
          this.refresh_token = ''
          authLS.removeLs()
        }

        return response
      },
      (error: AxiosError) => {
        // Nếu response trả về lỗi và ngoại trừ lỗi 422 và 401 thì sẽ vào đây.
        if (
          ![
            HttpStatusCode.UnprocessableEntity,
            HttpStatusCode.Unauthorized
          ].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data

          const message = data?.message || error.message

          if (message === 'Network Error') {
            toast.error('Dung lượng ảnh quá lớn')
          } else {
            toast.error(message)
          }
        }

        // Lỗi 401 có nhiều trường hợp:
        // th1:token không đúng.
        // th2: token hết hạn
        // th3:Không có token
        // Lỗi 401 sẽ vào đây
        if (
          isAxiosUnauthorizedError<
            ErrorResponsiveApi<{ message: string; name: string }>
          >(error)
        ) {
          const config =
            error.response?.config ||
            ({ headers: {}, url: '' } as InternalAxiosRequestConfig)
          const { url } = config

          // th2: token hết hạn nhưng request không phải từ refresh token
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(
                  () =>
                    // Để khi gọi lại refresh token lần hai để lấy access token hết hạn thì vẫn dùng biến refreshTokenRequest mà không cần gán lại lần hai
                    {
                      setTimeout(() => {
                        this.refreshTokenRequest = null
                      }, 10000)
                    }
                  // (this.refreshTokenRequest = null)
                )
            return this.refreshTokenRequest?.then((accessToken) => {
              return this.instance({
                ...config,
                headers: { ...config.headers, authorization: accessToken }
              })
            })
          }

          // th1: token không đúng.
          // th2: token hết hạn nhưng request là của refresh token
          // th3:không truyền token
          authLS.removeLs()
          this.access_token = ''
          this.refresh_token = ''
          toast.error(
            error.response?.data?.data?.message || error.response?.data.message
          )
        }
        return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken() {
    // console.log('refresh------')
    return this.instance
      .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refresh_token
      })
      .then((res) => {
        const { access_token } = res.data.data
        authLS.setAccessTokenToLs(access_token)
        this.access_token = access_token
        return access_token
      })
      .catch((error) => {
        authLS.removeLs()
        this.access_token = ''
        this.refresh_token = ''
        throw error
      })
  }
}
const http = new Http().instance

export default http
