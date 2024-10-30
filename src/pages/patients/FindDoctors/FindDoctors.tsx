import React, { useState } from 'react'
import { Input, Select, Rate, Button, Card, Space, Tag } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faStethoscope,
  faLocationDot,
  faStar,
  faCalendarCheck,
  faUser,
} from '@fortawesome/free-solid-svg-icons'

// Types
interface Doctor {
  id: number
  name: string
  specialty: string
  rating: number
  availability: boolean
  location: string
}

interface SearchFilters {
  specialty: string
  location: string
  name: string
  rating: number
  showAvailableOnly: boolean
}

// Sample data
const SAMPLE_DOCTORS: Doctor[] = [
  {
    id: 1,
    name: 'Dr. John Smith',
    specialty: 'Cardiology',
    rating: 4.5,
    availability: true,
    location: 'New York',
  },
  {
    id: 2,
    name: 'Dr. Sarah Johnson',
    specialty: 'Pediatrics',
    rating: 5,
    availability: false,
    location: 'Los Angeles',
  },
  // Add more sample doctors as needed
]

const SPECIALTIES = ['Cardiology', 'Pediatrics', 'Neurology', 'Dermatology', 'Orthopedics']

const FindDoctors: React.FC = () => {
  const [doctors] = useState<Doctor[]>(SAMPLE_DOCTORS)
  const [filters, setFilters] = useState<SearchFilters>({
    specialty: '',
    location: '',
    name: '',
    rating: 0,
    showAvailableOnly: false,
  })

  // Filter doctors based on search criteria
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialty = !filters.specialty || doctor.specialty === filters.specialty
    const matchesLocation = !filters.location || doctor.location.toLowerCase().includes(filters.location.toLowerCase())
    const matchesName = !filters.name || doctor.name.toLowerCase().includes(filters.name.toLowerCase())
    const matchesRating = !filters.rating || doctor.rating >= filters.rating
    const matchesAvailability = !filters.showAvailableOnly || doctor.availability

    return matchesSpecialty && matchesLocation && matchesName && matchesRating && matchesAvailability
  })

  return (
    <div className='max-w-7xl mx-auto p-6'>
      {/* Page Title */}
      <div className='flex items-center gap-3 mb-8'>
        <FontAwesomeIcon icon={faStethoscope} className='text-3xl text-blue-600' />
        <h1 className='text-3xl font-bold text-gray-800'>Find Doctors</h1>
      </div>

      {/* Search Section */}
      <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
          <div className='relative'>
            <Select
              placeholder='Select Specialty'
              className='w-full'
              onChange={(value) => setFilters((prev) => ({ ...prev, specialty: value }))}
              options={SPECIALTIES.map((specialty) => ({ value: specialty, label: specialty }))}
              allowClear
              suffixIcon={<FontAwesomeIcon icon={faStethoscope} className='text-gray-400' />}
            />
          </div>

          <div className='relative'>
            <Input
              placeholder='Enter Location'
              prefix={<FontAwesomeIcon icon={faLocationDot} className='text-gray-400' />}
              onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
            />
          </div>

          <div className='relative'>
            <Input
              placeholder='Search by Doctor Name'
              prefix={<FontAwesomeIcon icon={faSearch} className='text-gray-400' />}
              onChange={(e) => setFilters((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>
        </div>

        {/* Additional Filters */}
        <div className='flex flex-wrap gap-6 items-center'>
          <Space>
            <span className='text-gray-700 flex items-center gap-2'>
              <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
              Minimum Rating:
            </span>
            <Rate
              allowHalf
              value={filters.rating}
              onChange={(value) => setFilters((prev) => ({ ...prev, rating: value }))}
            />
          </Space>
          <Button
            type={filters.showAvailableOnly ? 'primary' : 'default'}
            onClick={() => setFilters((prev) => ({ ...prev, showAvailableOnly: !prev.showAvailableOnly }))}
            icon={<FontAwesomeIcon icon={faCalendarCheck} />}
          >
            Available Only
          </Button>
        </div>
      </div>

      {/* Doctor List */}
      <div className='space-y-4'>
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className='shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex justify-between items-center'>
              <div>
                <div className='flex items-center gap-2'>
                  <FontAwesomeIcon icon={faUser} className='text-gray-500' />
                  <h3 className='text-xl font-semibold text-gray-800'>{doctor.name}</h3>
                </div>
                <div className='flex items-center gap-2 mt-1'>
                  <FontAwesomeIcon icon={faStethoscope} className='text-blue-500' />
                  <p className='text-gray-600'>{doctor.specialty}</p>
                </div>
                <div className='mt-2'>
                  <Rate disabled defaultValue={doctor.rating} />
                  <span className='ml-2 text-gray-600'>({doctor.rating})</span>
                </div>
                <div className='flex items-center gap-2 mt-1'>
                  <FontAwesomeIcon icon={faLocationDot} className='text-red-500' />
                  <p className='text-gray-600'>{doctor.location}</p>
                </div>
              </div>
              <div className='text-right'>
                <Tag
                  color={doctor.availability ? 'green' : 'red'}
                  className='mb-4 inline-flex items-center gap-1'
                  icon={<FontAwesomeIcon icon={faCalendarCheck} />}
                >
                  {doctor.availability ? 'Available' : 'Not Available'}
                </Tag>
                <div>
                  <Button type='primary' icon={<FontAwesomeIcon icon={faUser} />}>
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default FindDoctors
