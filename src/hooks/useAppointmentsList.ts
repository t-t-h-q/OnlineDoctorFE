import { appointments } from '@/fakeData/appointment'
import { useLazyGetAppointmentsListQuery } from '@/services/appointmentsApi'
const fakeAppointmentList = appointments
const useAppointmentsList = () => {
  const [getAppointmentsList, { data = fakeAppointmentList, isLoading: isLoadingData, isFetching }] =
    useLazyGetAppointmentsListQuery()

  const fetchAppointmentsList = async () => {
    try {
      await getAppointmentsList().unwrap()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Fetch doctor error:', error)
    }
  }
  return { fetchAppointmentsList, data, isLoadingData, isFetching }
}

export default useAppointmentsList
