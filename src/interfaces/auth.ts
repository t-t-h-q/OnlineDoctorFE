import { IUser } from './user'

export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  token: string
  refreshToken: string
  tokenExpires: string
  user: IUser
}

export interface IRefreshRequest {
  refreshToken: string
}

export interface IRefreshResponse {
  token: string
  refreshToken: string
  tokenExpires: string
}

export interface IRegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  role?: {
    id: string
  }
  status?: {
    id: string
  }
}
