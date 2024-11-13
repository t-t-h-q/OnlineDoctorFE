import React from 'react'
import { Typography } from 'antd'
import DoctorCard from 'components/DoctorCard'
import { IDoctor } from '../../../interfaces/doctor'

const { Title } = Typography
const doctors: IDoctor[] = [
  {
    id: '1',
    name: 'Dr. Karen Dawson',
    email: 'karen.dawson@mail.com',
    phone: '123-456-7890',
    specialties: ['Paediatric Surgery'],
    avatar: 'https://via.placeholder.com/150',
    general_information: {
      phone: '123-456-7890',
      email: 'karen.dawson@mail.com',
      address: '123 Medical St, Health City',
      types_of: 'Full-Time Physician',
      experience: '10 Years',
      languages: ['English', 'Spanish'],
    },
    location: {
      address: '123 Medical St, Health City',
      coordinates: [-74.006, 40.7128],
    },
    ratings: {
      average_rating: 4.5,
      review_count: 20,
      reviews: [
        {
          patient_id: '1',
          rating: 5,
          review: 'Excellent doctor!',
          created_at: '2023-01-01T00:00:00Z',
        },
      ],
    },
  },
  {
    id: '2',
    name: 'Dr. John Smith',
    email: 'john.smith@mail.com',
    phone: '234-567-8901',
    specialties: ['Cardiology'],
    avatar: 'https://via.placeholder.com/150',
    general_information: {
      phone: '234-567-8901',
      email: 'john.smith@mail.com',
      address: '456 Health Ave, Wellness City',
      types_of: 'Part-Time Physician',
      experience: '15 Years',
      languages: ['English', 'French'],
    },
    location: {
      address: '456 Health Ave, Wellness City',
      coordinates: [-73.935242, 40.73061],
    },
    ratings: {
      average_rating: 4.7,
      review_count: 30,
      reviews: [
        {
          patient_id: '2',
          rating: 4,
          review: 'Very knowledgeable.',
          created_at: '2023-02-01T00:00:00Z',
        },
      ],
    },
  },
  {
    id: '3',
    name: 'Dr. Emily Johnson',
    email: 'emily.johnson@mail.com',
    phone: '345-678-9012',
    specialties: ['Dermatology'],
    avatar: 'https://via.placeholder.com/150',
    general_information: {
      phone: '345-678-9012',
      email: 'emily.johnson@mail.com',
      address: '789 Skin Blvd, Beauty City',
      types_of: 'Consultant',
      experience: '8 Years',
      languages: ['English'],
    },
    location: {
      address: '789 Skin Blvd, Beauty City',
      coordinates: [-118.243683, 34.052235],
    },
    ratings: {
      average_rating: 4.3,
      review_count: 25,
      reviews: [
        {
          patient_id: '3',
          rating: 5,
          review: 'Great experience!',
          created_at: '2023-03-01T00:00:00Z',
        },
      ],
    },
  },
  {
    id: '4',
    name: 'Dr. Michael Brown',
    email: 'michael.brown@mail.com',
    phone: '456-789-0123',
    specialties: ['Neurology'],
    avatar: 'https://via.placeholder.com/150',
    general_information: {
      phone: '456-789-0123',
      email: 'michael.brown@mail.com',
      address: '101 Brain St, Neuro City',
      types_of: 'Full-Time Physician',
      experience: '12 Years',
      languages: ['English', 'German'],
    },
    location: {
      address: '101 Brain St, Neuro City',
      coordinates: [-122.419418, 37.774929],
    },
    ratings: {
      average_rating: 4.6,
      review_count: 18,
      reviews: [
        {
          patient_id: '4',
          rating: 4,
          review: 'Very professional.',
          created_at: '2023-04-01T00:00:00Z',
        },
      ],
    },
  },
  {
    id: '5',
    name: 'Dr. Sarah Davis',
    email: 'sarah.davis@mail.com',
    phone: '567-890-1234',
    specialties: ['Orthopedics'],
    avatar: 'https://via.placeholder.com/150',
    general_information: {
      phone: '567-890-1234',
      email: 'sarah.davis@mail.com',
      address: '202 Bone Rd, Joint City',
      types_of: 'Part-Time Physician',
      experience: '20 Years',
      languages: ['English', 'Italian'],
    },
    location: {
      address: '202 Bone Rd, Joint City',
      coordinates: [-87.629799, 41.878113],
    },
    ratings: {
      average_rating: 4.8,
      review_count: 22,
      reviews: [
        {
          patient_id: '5',
          rating: 5,
          review: 'Highly recommend!',
          created_at: '2023-05-01T00:00:00Z',
        },
      ],
    },
  },
]
const DoctorSection: React.FC = () => {
  return (
    <section className='py-16 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <Title level={2} className='text-center mb-12'>
          Đội ngũ bác sĩ
        </Title>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {doctors.map((doctor, index) => (
            <DoctorCard doctor={doctor} key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default DoctorSection
