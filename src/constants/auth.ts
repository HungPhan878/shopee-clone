const path = {
  home: '/',
  register: '/register',
  login: '/login',
  user: '/user',
  profile: '/user/profile',
  historyPurchase: '/user/purchase',
  changePassword: '/user/password',
  logout: '/logout',
  product: ':nameId',
  cart: '/cart'
} as const

export { path }
