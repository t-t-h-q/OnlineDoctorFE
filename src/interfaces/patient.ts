import { IDoctor } from 'interfaces/doctor'

export interface SearchFormValues {
  specialty: string
  location: string
  name: string
  rating: number
  showAvailableOnly: boolean
}

export interface ISearchParams {
  specialty?: string
  location?: string
  name?: string
  rating?: number
  showAvailableOnly?: boolean
}

export interface ISearchResponse {
  data: IDoctor[]
  totalItems: number
}
