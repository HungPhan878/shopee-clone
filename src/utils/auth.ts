/* eslint-disable prettier/prettier */
// set, remove and get AT to LocalStorage

import { User } from 'src/types/user.type'

export const localStorageEventTarget = new EventTarget()

const authLS = {
  setAccessTokenToLs(access_token: string) {
    localStorage.setItem('access_token', access_token)
  },

  setRefreshTokenToLs(refresh_token: string) {
    localStorage.setItem('refresh_token', refresh_token)
  },

  removeLs() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('profile')
    // Tạo ra một event lắng nghe khi token hết hạn.
    const removeLS = new Event('removeLS')
    localStorageEventTarget.dispatchEvent(removeLS)
  },

  getAccessTokenFromLs() {
    return localStorage.getItem('access_token') || ''
  },

  getRefreshTokenFromLs() {
    return localStorage.getItem('refresh_token') || ''
  },

  // get, set profile(user) to LS

  setProfileToLS(profile: User) {
    localStorage.setItem('profile', JSON.stringify(profile))
  },

  getProfileFromLS() {
    const result = localStorage.getItem('profile')
    return result ? JSON.parse(result) : null
  }
}

export default authLS
