// set, remove and get AT to LocalStorage

const setAccessTokenToLs = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

const removeAccessTokenToLs = () => {
  localStorage.removeItem('access_token')
}

const getAccessTokenFromLs = () => {
  return localStorage.getItem('access_token') || ''
}

export { setAccessTokenToLs, removeAccessTokenToLs, getAccessTokenFromLs }
