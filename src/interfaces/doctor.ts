export interface IDoctor {
  id?: number
  avatar?: string
  name: string
  specialty: string
  rating: number
  availability?: boolean
  location?: string
  image?: string
  experience?: string
}

export interface ISearchDoctorParams {
  page?: number
  specialty?: string
  location?: string
  name?: string
  rating?: number
}

export interface ISearchDoctorResponse {
  data: IDoctor[]
  totalItems: number
}
