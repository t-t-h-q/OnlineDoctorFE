import { useLazyGetAppointmentsListQuery } from '@/services/patients'

const useAppointmentsList = () => {
  const [getAppointmentsList, { data, isLoading: isLoadingData, isFetching }] = useLazyGetAppointmentsListQuery()

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
