import { ERoles } from '@/enums/role'
import { EStatus } from '@/enums/status'

export interface IRole {
  id: string
  name: ERoles
}

export interface IStatus {
  id: string
  name: EStatus
}

export interface IUser {
  id: string
  name: string
  email: string
  provider: string
  socialId: string
  firstName: string
  lastName: string
  role: IRole
  status: IStatus
  createdAt: string
  updatedAt: string
  deletedAt: string
}
