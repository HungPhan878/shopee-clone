/* eslint-disable prettier/prettier */
// set, remove and get AT to LocalStorage

import { User } from 'src/types/user.type'

const authLS = {
  setAccessTokenToLs(access_token: string) {
    localStorage.setItem('access_token', access_token)
  },

  removeLs() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('profile')
  },

  getAccessTokenFromLs() {
    return localStorage.getItem('access_token') || ''
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
