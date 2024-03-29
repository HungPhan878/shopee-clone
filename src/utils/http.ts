/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'

// components
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import authLS from './auth'
import { AuthResponse } from 'src/types/auth.type'
import { path } from 'src/constants/auth'

export class Http {
  instance: AxiosInstance
  private access_token: string
  constructor() {
    ;(this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })),
      (this.access_token = authLS.getAccessTokenFromLs())

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
        if (url === path.login || url === path.register) {
          this.access_token = data.data.access_token
          authLS.setAccessTokenToLs(this.access_token)
          authLS.setProfileToLS(data.data.user)
        } else if (url === path.logout) {
          this.access_token = ''
          authLS.removeLs()
        }

        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data

          const message = data.message || error.message

          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
