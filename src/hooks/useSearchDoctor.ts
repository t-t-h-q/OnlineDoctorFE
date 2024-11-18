import { useLazySearchDoctorsQuery } from '@/services/doctor'
import { ISearchDoctorParams } from '@/interfaces/doctor'
import { generateFakeUsers } from '@/fakeData/doctorsData'

const fakeData = {
  data: generateFakeUsers(100),
  totalItems: 100,
}
const useSearchDoctor = () => {
  const [searchDoctors, { data = fakeData, isLoading: isLoadingData, isFetching }] = useLazySearchDoctorsQuery()

  const fetchDoctorSearchList = async (params: ISearchDoctorParams) => {
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
