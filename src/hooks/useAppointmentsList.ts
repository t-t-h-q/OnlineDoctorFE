import { STORAGE_KEYS } from '@/constants/storageKeys'
import StorageService from '@/services/localStorage'
import { useLazyGetAppointmentsListQuery } from '@/services/patients'

const useAppointmentsList = () => {
  const [getAppointmentsList, { data, isLoading: isLoadingData, isFetching }] = useLazyGetAppointmentsListQuery()

  const fetchAppointmentsList = async () => {
    const tokens = StorageService.get(STORAGE_KEYS.AUTH_PROFILE)?.accessToken
    if (!tokens) return

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
