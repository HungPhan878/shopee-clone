const order = {
  desc: 'desc',
  asc: 'asc'
} as const

const sortBy = {
  createdAt: 'createdAt',
  view: 'view',
  sold: 'sold',
  price: 'price'
} as const

export { order, sortBy }
