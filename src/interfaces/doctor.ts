import { IUser } from './user'

export interface IGeneralInformation extends IUser {
  phone: string
  email: string
  address: string
  types_of: string
  experience: string
  languages: string[]
}

export interface IReview {
  patient_id: string
  rating: number
  review: string
  created_at: string
}

export interface IRatings {
  average_rating: number
  review_count: number
  reviews: IReview[]
}

export interface ILocation {
  address: string
  coordinates: number[]
}

export interface IDoctor extends IUser {
  id: string
  name: string
  specialties: string[]
  avatar: string
  general_information: IGeneralInformation
  location: ILocation
  ratings: IRatings
}
