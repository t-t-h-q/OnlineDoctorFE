import { useGetSpecialtiesQuery } from '../services/config'
import mockSpecialties from '../services/mock/specialties'

export const useConfig = () => {
  const { data = mockSpecialties, error, isLoading } = useGetSpecialtiesQuery()

  return {
    specialties: data,
    error,
    isLoading,
  }
}
