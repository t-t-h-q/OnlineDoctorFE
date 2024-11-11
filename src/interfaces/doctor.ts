export interface IDoctor {
  id?: number
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
}

export interface ISearchDoctorResponse {
  data: IDoctor[]
  totalItems: number
}
