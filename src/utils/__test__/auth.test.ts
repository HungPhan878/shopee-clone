/* eslint-disable import/no-duplicates */
import { describe, expect, it } from 'vitest'
import authLS from '../auth'
import { beforeEach } from 'vitest'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGRmYWU3YTcxYTZjMDI5ZGVjMzI1YiIsImVtYWlsIjoiaHVuZ3BoYW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNC0xN1QxNDoyMjoxMS40NjVaIiwiaWF0IjoxNzEzMzYzNzMxLCJleHAiOjE3MTM5Njg1MzF9.aWLpeS4nhUXrjOOYXpRs_4KdskWb2_ouVeViY4dGGes'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGRmYWU3YTcxYTZjMDI5ZGVjMzI1YiIsImVtYWlsIjoiaHVuZ3BoYW5AZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNC0xN1QxNDoyMjoxMS40NjVaIiwiaWF0IjoxNzEzMzYzNzMxLCJleHAiOjE3MjIwMDM3MzF9.oXOQNc_Qw_8pIp_-wOczm-_J8-Vn1cHU0XtL_nX14hk'

// const profile = {
//   _id: '660dfae7a71a6c029dec325b',
//   roles: ['User'],
//   email: 'hungphan@gmail.com',
//   createdAt: '2024-04-04T00:57:11.695Z',
//   updatedAt: '2024-04-13T13:18:06.579Z',
//   __v: 0,
//   avatar: '589a5030-6813-424a-9994-dfe90c7d3ac1.jpg',
//   name: 'Rich Grimers 8',
//   address: 'Vũng thùng 1 khu B 107',
//   date_of_birth: '1999-09-16T17:00:00.000Z',
//   phone: '0796626444'
// }

beforeEach(() => {
  // console.log('before')
  localStorage.clear()
})

describe('access_token', () => {
  it('get access_token', () => {
    authLS.setAccessTokenToLs(access_token)
    expect(authLS.getAccessTokenFromLs()).toEqual(access_token)
  })
})

describe('refresh_token', () => {
  it('get refresh_token', () => {
    authLS.setRefreshTokenToLs(refresh_token)
    expect(authLS.getRefreshTokenFromLs()).toEqual(refresh_token)
  })
})

describe('clearLS', () => {
  it('delete localStorage', () => {
    authLS.setAccessTokenToLs(access_token)
    authLS.setRefreshTokenToLs(refresh_token)

    authLS.removeLs()
    expect(authLS.getAccessTokenFromLs()).toEqual('')
    expect(authLS.getRefreshTokenFromLs()).toEqual('')
  })
})

// describe('Profile', () => {
//   it('get profile', () => {
//     authLS.setProfileToLS(profile)
//     const profileItem = authLS.getProfileFromLS()
//     expect(profileItem._id).toBe(profile._id)
//   })
// })
