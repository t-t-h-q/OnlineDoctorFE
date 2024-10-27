import { useMemo } from 'react'
import { useGetDoctorDetailQuery } from '../services/doctor'
import { mock as doctorSample } from '../services/mock/doctor'
import { IGeneralInformation, IRatings, IReview } from '../interfaces/doctor'

export const useDoctorDetail = (doctorId: string) => {
  const { data = doctorSample, error, isLoading } = useGetDoctorDetailQuery(doctorId)

  const general_information = useMemo<IGeneralInformation>(
    () => (data?.general_information || {}) as IGeneralInformation,
    [data],
  )
  const ratings = useMemo<IRatings>(() => (data?.ratings || {}) as IRatings, [data])
  const reviews = useMemo<IReview[]>(() => ratings.reviews || [], [ratings])

  return {
    doctor: data,
    error,
    isLoading,
    general_information,
    ratings,
    reviews,
  }
}
