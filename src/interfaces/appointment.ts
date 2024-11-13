import { IDoctor } from './doctor'
import { IUser } from './user'

export interface IAppointment {
  id: number
  date: Date
  doctor: IDoctor
  patient: IUser
}
