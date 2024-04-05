/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { User } from 'src/types/user.type'
import { SuccessResponsiveApi } from 'src/types/utils.type'
import http from 'src/utils/http'

interface BodyUser
  extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  new_password?: string
}

const userApi = {
  getUser() {
    return http.get<SuccessResponsiveApi<User>>('me')
  },
  updateUser(body: BodyUser) {
    return http.put<SuccessResponsiveApi<User>>('user', body)
  },
  updateAvatar(body: FormData) {
    return http.post<SuccessResponsiveApi<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/from-data'
      }
    })
  }
}

export default userApi
