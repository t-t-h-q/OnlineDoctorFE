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
  specialty?: string
  location?: string
  name?: string
  rating?: number
  showAvailableOnly?: boolean
}

export interface ISearchDoctorResponse {
  data: IDoctor[]
  totalItems: number
}
