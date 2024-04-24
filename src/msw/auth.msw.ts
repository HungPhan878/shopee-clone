/* eslint-disable prettier/prettier */
import { http, HttpResponse } from 'msw'
import config from 'src/constants/config'

export const access_token_1s =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGRmYWU3YTcxYTZjMDI5ZGVjMzI1YiIsImVtYWlsIjoiaHVuZ3BoYW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNC0xOVQwNTozNTo1MS45MjNaIiwiaWF0IjoxNzEzNTA0OTUxLCJleHAiOjE3MTM1MDQ5NTJ9.JKQOIf4Q69o2mmUQHDuerXKSEJUf9tBRT3MxITkWs5s'

export const refresh_token_1000000s =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGRmYWU3YTcxYTZjMDI5ZGVjMzI1YiIsImVtYWlsIjoiaHVuZ3BoYW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNC0xOVQwNTozNTo1MS45MjNaIiwiaWF0IjoxNzEzNTA0OTUxLCJleHAiOjE3MTQ1MDQ5NTF9.8TO50lPWiZxmmK7U6k4e4jFqxrqujvLyLB0nAVbTNMI'

export const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGRmYWU3YTcxYTZjMDI5ZGVjMzI1YiIsImVtYWlsIjoiaHVuZ3BoYW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNC0yM1QxMzozOTozMS4xNTdaIiwiaWF0IjoxNzEzODc5NTcxLCJleHAiOjE3MTQ3Njg0NTl9.Pqez1D14xYGZyj5WmrpbxzbyhQRNwFVKJiLs0zEtSmk'
const loginRes = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGRmYWU3YTcxYTZjMDI5ZGVjMzI1YiIsImVtYWlsIjoiaHVuZ3BoYW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNC0yM1QwNzo1MTo1Ni42OTlaIiwiaWF0IjoxNzEzODU4NzE2LCJleHAiOjE3MTQ3NDc2MDR9.jtgqVVmAdLE_yC9_AdjD4xAvNATgWKFYYYLGaDqcyY4',
    expires: 888888,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGRmYWU3YTcxYTZjMDI5ZGVjMzI1YiIsImVtYWlsIjoiaHVuZ3BoYW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNC0yM1QwNzo1MTo1Ni42OTlaIiwiaWF0IjoxNzEzODU4NzE2LCJleHAiOjE3MjM4NTg3MjV9.jzG2EFEsdjKfvt2oeTWghpH8uwAXwZ0BVxJ_I0rGF0M',
    expires_refresh_token: 10000009,
    user: {
      _id: '660dfae7a71a6c029dec325b',
      roles: ['User'],
      email: 'hungphan@gmail.com',
      createdAt: '2024-04-04T00:57:11.695Z',
      updatedAt: '2024-04-13T13:18:06.579Z',
      __v: 0,
      avatar: '589a5030-6813-424a-9994-dfe90c7d3ac1.jpg',
      name: 'Rich Grimers 8',
      address: 'Vũng thùng 1 khu B 107',
      date_of_birth: '1999-09-16T17:00:00.000Z',
      phone: '0796626444'
    }
  }
}

const refreshTokenRes = {
  message: 'Refresh Token thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGRmYWU3YTcxYTZjMDI5ZGVjMzI1YiIsImVtYWlsIjoiaHVuZ3BoYW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNC0yM1QwNDowMDozOS44MTBaIiwiaWF0IjoxNzEzODQ0ODM5LCJleHAiOjE3MTQ0NDk2Mzl9.zCu3YQoY57qZ0Ks_sQhL6jlzoI4v8jaR9iLGeTwrg70'
  }
}

export const loginRequest = http.post(`${config.baseURL}login`, () => {
  return HttpResponse.json(loginRes)
})

export const refreshTokenRequest = http.post(
  `${config.baseURL}refresh-access-token`,
  () => {
    return HttpResponse.json(refreshTokenRes)
  }
)

const authRequests = [loginRequest, refreshTokenRequest]

export default authRequests
