import { describe, it, expect, beforeEach } from 'vitest'
import { Http } from '../http'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import authLS from '../auth'

describe('http axios', () => {
  let http = new Http().instance

  beforeEach(() => {
    localStorage.clear()
    http = new Http().instance
  })

  const access_token_1s =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGRmYWU3YTcxYTZjMDI5ZGVjMzI1YiIsImVtYWlsIjoiaHVuZ3BoYW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNC0xOVQwNTozNTo1MS45MjNaIiwiaWF0IjoxNzEzNTA0OTUxLCJleHAiOjE3MTM1MDQ5NTJ9.JKQOIf4Q69o2mmUQHDuerXKSEJUf9tBRT3MxITkWs5s'

  const refresh_token_1000000s =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGRmYWU3YTcxYTZjMDI5ZGVjMzI1YiIsImVtYWlsIjoiaHVuZ3BoYW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNC0xOVQwNTozNTo1MS45MjNaIiwiaWF0IjoxNzEzNTA0OTUxLCJleHAiOjE3MTQ1MDQ5NTF9.8TO50lPWiZxmmK7U6k4e4jFqxrqujvLyLB0nAVbTNMI'

  it('call api product', async () => {
    const res = await http.get('products')
    // console.log(res)
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('get profile', async () => {
    await http.post('login', {
      email: 'Hungphanhung8@gmail.com',
    })

    // need accessToken moi request duoc
    const res = await http.get('me')
    // console.log(res)
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('refresh token', async () => {
    authLS.setAccessTokenToLs(access_token_1s)
    authLS.setRefreshTokenToLs(refresh_token_1000000s)

    const newHttp = new Http().instance
    const res = await newHttp.get('me')
    // console.log(res)
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
