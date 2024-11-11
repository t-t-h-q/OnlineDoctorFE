import { useLazySearchDoctorsQuery } from '@/services/patient'
import { STORAGE_KEYS } from '@/constants/storageKeys'
import StorageService from '@/services/localStorage'
import { ISearchDoctorParams } from '@/interfaces/doctor'

const useSearchDoctor = () => {
  const [searchDoctors, { data, isLoading: isLoadingData, isFetching }] = useLazySearchDoctorsQuery()

  const fetchDoctorSearchList = async (params: ISearchDoctorParams) => {
    const tokens = StorageService.get(STORAGE_KEYS.AUTH_PROFILE)?.accessToken
    if (!tokens) return

    try {
      await searchDoctors(params).unwrap()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Fetch doctor search list error:', error)
    }
  }

  return { fetchDoctorSearchList, data, isLoadingData, isFetching }
}

export default useSearchDoctor
