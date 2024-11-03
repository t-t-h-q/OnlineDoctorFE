import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export interface Testimonial {
  name: string
  comment: string
  rating: number
}

export interface Feature {
  icon: IconDefinition
  title: string
  description: string
}

export interface Doctor {
  name: string
  specialty: string
  rating: number
  image: string
  experience: string
}
