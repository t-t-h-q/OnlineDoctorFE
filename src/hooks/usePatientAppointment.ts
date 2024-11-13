import { Dayjs } from 'dayjs'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setAppointmentDate, setPatientInfo } from '../store/patient/appointment'
import { useCreateAppointmentMutation } from '../services/patient'

export const usePatientAppointment = () => {
  const dispatch = useAppDispatch()
  const [
    createAppointment,
    { isLoading: isCreatingAppointment, error: createAppointmentError, isSuccess: isCreatingAppointmentSuccess },
  ] = useCreateAppointmentMutation()

  const appointmentDate = useAppSelector((state) => state.patientAppointment.appointmentDate)
  const patientInfo = useAppSelector((state) => state.patientAppointment.patientInfo)
  const selectedDoctor = useAppSelector((state) => state.patientAppointment.selectedDoctor)

  const handleDateChange = (date: Dayjs) => {
    dispatch(setAppointmentDate(date.toISOString()))
  }

  const handlePatientInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setPatientInfo({ name: e.target.value }))
  }

  const handleSubmitAppointment = async () => {
    try {
      await createAppointment({ doctorId: selectedDoctor!.id, ...patientInfo, appointmentDate })
      return true
    } catch (error) {
      console.error('Failed to create appointment:', error)
      return false
    }
  }

  return {
    appointmentDate,
    handleDateChange,
    patientInfo,
    handlePatientInfoChange,
    selectedDoctor,
    handleSubmitAppointment,
    isCreatingAppointment,
    createAppointmentError,
    isCreatingAppointmentSuccess,
  }
}
