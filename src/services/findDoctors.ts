import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from './base'

interface IUser {
  id: number
  name: string
  specialty: string
  rating: number
  availability: boolean
  location: string
}

interface IRequiredSearchParams {
  page: number
  limit: number
  search: string
  specialty: string
  location: string
  minRating: number
  availability: boolean | undefined
  sortBy: 'rating' | 'name'
  sortOrder: 'asc' | 'desc'
}

interface ISearchParams {
  page?: number
  limit?: number
  search?: string
  specialty?: string
  location?: string
  minRating?: number
  availability?: boolean
  sortBy?: 'rating' | 'name'
  sortOrder?: 'asc' | 'desc'
}

const defaultParams: IRequiredSearchParams = {
  page: 1,
  limit: 10,
  search: '',
  specialty: '',
  location: '',
  minRating: 0,
  availability: undefined,
  sortBy: 'rating',
  sortOrder: 'desc',
}

interface ISearchResponse {
  users: IUser[]
  total: number
  currentPage: number
  totalPages: number
  hasMore: boolean
}

function processUsers(params: Partial<ISearchParams>): ISearchResponse {
  // Merge params với default params và assert type
  const finalParams: IRequiredSearchParams = { ...defaultParams, ...params }

  // Generate fake data
  const fakeUsers: IUser[] = generateFakeUsers(100)

  // Apply search filters
  const filteredUsers = fakeUsers.filter((user) => {
    let matches = true

    if (finalParams.search) {
      matches = matches && user.name.toLowerCase().includes(finalParams.search.toLowerCase())
    }

    if (finalParams.specialty) {
      matches = matches && user.specialty === finalParams.specialty
    }

    if (finalParams.location) {
      matches = matches && user.location.toLowerCase().includes(finalParams.location.toLowerCase())
    }

    if (finalParams.minRating) {
      matches = matches && user.rating >= finalParams.minRating
    }

    if (finalParams.availability !== undefined) {
      matches = matches && user.availability === finalParams.availability
    }

    return matches
  })

  // Apply sorting
  if (finalParams.sortBy) {
    filteredUsers.sort((a, b) => {
      const modifier = finalParams.sortOrder === 'desc' ? -1 : 1
      if (finalParams.sortBy === 'rating') {
        return (a.rating - b.rating) * modifier
      }
      return a.name.localeCompare(b.name) * modifier
    })
  }

  // Apply pagination
  const start = (finalParams.page - 1) * finalParams.limit
  const end = start + finalParams.limit
  const paginatedUsers = filteredUsers.slice(start, end)

  return {
    users: paginatedUsers,
    total: filteredUsers.length,
    currentPage: finalParams.page,
    totalPages: Math.ceil(filteredUsers.length / finalParams.limit),
    hasMore: end < filteredUsers.length,
  }
}

export const userApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'userApi',
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    searchUsers: builder.query<ISearchResponse, ISearchParams>({
      query: (params) => ({
        url: 'users/search',
        method: 'GET',
        params: params,
      }),
      transformResponse: (_, params) => {
        return processUsers(params || {})
      },
    }),

    // API để lấy danh sách specialties cho filter
    getSpecialties: builder.query<string[], void>({
      query: () => 'specialties',
      transformResponse: () => {
        return [
          'Frontend Developer',
          'Backend Developer',
          'Full Stack Developer',
          'UI/UX Designer',
          'DevOps Engineer',
          'Data Scientist',
          'Product Manager',
        ]
      },
    }),

    // API để lấy danh sách locations cho filter
    getLocations: builder.query<string[], void>({
      query: () => 'locations',
      transformResponse: () => {
        return [
          'Ha Noi, Vietnam',
          'Ho Chi Minh City, Vietnam',
          'Da Nang, Vietnam',
          'Tokyo, Japan',
          'Singapore',
          'San Francisco, USA',
        ]
      },
    }),
  }),
})

// Helper function to generate fake users
function generateFakeUsers(count: number): IUser[] {
  const specialties = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'UI/UX Designer',
    'DevOps Engineer',
    'Data Scientist',
    'Product Manager',
  ]

  const locations = [
    'Ha Noi, Vietnam',
    'Ho Chi Minh City, Vietnam',
    'Da Nang, Vietnam',
    'Tokyo, Japan',
    'Singapore',
    'San Francisco, USA',
  ]

  const firstNames = ['Alex', 'John', 'Mary', 'Sarah', 'Michael', 'David', 'Linda', 'James']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller']

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
      lastNames[Math.floor(Math.random() * lastNames.length)]
    }`,
    specialty: specialties[Math.floor(Math.random() * specialties.length)],
    rating: Number((Math.random() * 4 + 1).toFixed(1)), // Rating từ 1.0 đến 5.0
    availability: Math.random() > 0.3, // 70% chance available
    location: locations[Math.floor(Math.random() * locations.length)],
  }))
}

// Export hooks
export const { useSearchUsersQuery, useGetSpecialtiesQuery, useGetLocationsQuery } = userApi
