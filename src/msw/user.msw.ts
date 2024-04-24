/* eslint-disable prettier/prettier */
import { http, HttpResponse } from 'msw'
import config from 'src/constants/config'
import { access_token_1s } from './auth.msw'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

const meRes = {
  message: 'Lấy người dùng thành công',
  data: {
    _id: '660dfae7a71a6c029dec325b',
    roles: ['User'],
    email: 'hungphan@gmail.com',
    createdAt: '2024-04-04T00:57:11.695Z',
    updatedAt: '2024-04-13T13:18:06.579Z',
    avatar: '589a5030-6813-424a-9994-dfe90c7d3ac1.jpg',
    name: 'Rich Grimers 8',
    address: 'Vũng thùng 1 khu B 107',
    date_of_birth: '1999-09-16T17:00:00.000Z',
    phone: '0796626444'
  }
}

export const meRequest = http.get(`${config.baseURL}me`, (req) => {
  const access_token = req.request.headers.get('authorization')
  if (access_token === access_token_1s) {
    return HttpResponse.json(
      {
        message: 'Lỗi',
        data: {
          message: 'Token hết hạn',
          name: 'EXPIRED_TOKEN'
        }
      },
      {
        status: HttpStatusCode.Unauthorized
      }
    )
  }

  return HttpResponse.json(meRes, { status: HttpStatusCode.Ok })
})

const userRequests = [meRequest]

export default userRequests
