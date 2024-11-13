import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IDoctor } from '../../interfaces/doctor'
import { IUser } from '../../interfaces/user'

interface AppointmentState {
  selectedDoctor: IDoctor | null
  appointmentDate: string | null
  // TODO: update later for patient information
  patientInfo: IUser
}

const initialState: AppointmentState = {
  selectedDoctor: null,
  appointmentDate: null,
  patientInfo: {} as IUser,
}

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setDoctor: (state, action: PayloadAction<IDoctor>) => {
      state.selectedDoctor = action.payload
    },
    setAppointmentDate: (state, action: PayloadAction<string>) => {
      state.appointmentDate = action.payload
    },
    setPatientInfo: (state, action: PayloadAction<Partial<IUser>>) => {
      state.patientInfo = { ...state.patientInfo, ...action.payload }
    },
    resetAppointment: () => initialState,
  },
})

export const { setDoctor, setAppointmentDate, setPatientInfo, resetAppointment } = appointmentSlice.actions
export default appointmentSlice.reducer
