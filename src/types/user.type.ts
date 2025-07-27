type Role = 'User' | 'Admin'
export interface User {
  _id: string
  roles: Role[]
  email: string
  createdAt: string
  updatedAt: string
  __v: 0
}
