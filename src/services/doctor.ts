import { createApi } from '@reduxjs/toolkit/query/react'
// import { customBaseQuery } from './base'
import { CATCH_TIME_SECONDS } from 'constants/time'
import { generateFakeUsers } from 'fakeData/doctorsData'
import { IDoctor } from 'interfaces/doctor'
import { ISearchDoctorParams, ISearchDoctorResponse } from '@/interfaces/doctor'
import { filter, toLower, includes } from 'lodash'

// Generate fake data once and reuse
const CACHED_DOCTORS = generateFakeUsers(100)

/**
 * Processes a list of doctors based on the provided search parameters.
 * Filters the list of doctors based on specialty, location, name, rating, and availability criteria.
 * If no search parameters are provided, returns the original list of doctors.
 *
 * @param doctors - The list of doctors to be processed.
 * @param searchParams - The search parameters to filter the list of doctors.
 * @returns An object containing the filtered list of doctors and the total number of items after filtering.
 */
const processDoctors = (doctors: IDoctor[], searchParams: ISearchDoctorParams): ISearchDoctorResponse => {
  const { specialty, location, name } = searchParams
  if (!specialty && !location && !name) {
    return {
      data: doctors,
      totalItems: doctors.length,
    }
  }

  const filteredDoctors = filter(doctors, (doctor) => {
    const conditions = {
      specialty: !specialty || doctor.specialty === specialty,
      location: !location || includes(toLower(doctor.location), toLower(location)),
      name: !name || includes(toLower(doctor.name), toLower(name)),
    }

    return Object.values(conditions).every(Boolean)
  })

  return {
    data: filteredDoctors,
    totalItems: filteredDoctors.length,
  }
}

/**
 * Asynchronous function that simulates a delay of 500 milliseconds before resolving with a null data object.
 */
export const fakeBaseQuery = () => async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return { data: null }
}

// TODO: change when real api is available
export const doctorApi = createApi({
  // baseQuery: customBaseQuery,
  baseQuery: fakeBaseQuery(),
  reducerPath: 'doctorApi',
  tagTypes: ['doctors'],
  keepUnusedDataFor: CATCH_TIME_SECONDS,
  endpoints: (builder) => ({
    searchDoctors: builder.query<ISearchDoctorResponse, ISearchDoctorParams>({
      query: (params) => ({
        url: 'patients/find-doctors/search',
        method: 'GET',
        params: params,
      }),
      providesTags: ['doctors'],
      transformResponse: (_response, _meta, arg) => {
        return processDoctors(CACHED_DOCTORS, arg || {})
      },
    }),
  }),
})

export const { useLazySearchDoctorsQuery } = doctorApi
