import { useMemo, useState } from 'react'
import { useGetDoctorsQuery } from '../services/doctor'
import { IDoctor } from '../interfaces/doctor'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setDoctor } from '../store/patient/appointment'
import mockDoctors from '../services/mock/doctors'

export const useQueryDoctors = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortOption, setSortOption] = useState<'rating' | 'name'>('rating')
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | undefined>(undefined)

  const dispatch = useAppDispatch()
  const selectedDoctor = useAppSelector((state) => state.patientAppointment.selectedDoctor)

  const queryParams = useMemo(() => {
    return {
      searchQuery,
      sortOption,
      specialty: selectedSpecialty,
    }
  }, [searchQuery, sortOption, selectedSpecialty])

  const { data: doctors = mockDoctors, isLoading } = useGetDoctorsQuery({ searchQuery: queryParams, sortOption })

  const handleDoctorSelect = (doctor: IDoctor) => {
    dispatch(setDoctor(doctor))
  }

  return {
    doctors,
    isLoading,
    handleDoctorSelect,
    selectedDoctor,
    setSortOption,
    setSearchQuery,
    searchQuery,
    sortOption,
    selectedSpecialty,
    setSelectedSpecialty,
  }
}
