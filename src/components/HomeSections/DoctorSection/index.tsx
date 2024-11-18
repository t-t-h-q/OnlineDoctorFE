import React from 'react'
import { Typography } from 'antd'
import DoctorCard from 'components/DoctorCard'

const { Title } = Typography

const doctors = [
  {
    id: '1',
    name: 'Dr. Nguyễn Văn A',
    specialties: 'Cardiology',
    average_rating: 4.5,
    avatar: '/doctor1.jpg',
    experience: '15 years of experience',
  },
  {
    id: '2',
    name: 'Dr. Trần Thị B',
    specialties: 'Dermatology',
    average_rating: 3.5,
    avatar: '/doctor2.jpg',
    experience: '10 years of experience',
  },
]

const DoctorSection: React.FC = () => {
  return (
    <section className='py-16 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <Title level={2} className='text-center mb-12'>
          Our Medical Team
        </Title>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {doctors.length > 0 ? (
            doctors.map((doctor, index) => <DoctorCard key={doctor.id} doctor={doctor} index={index} />)
          ) : (
            <div className='text-center col-span-full'>
              <Typography.Text>No doctors available at the moment.</Typography.Text>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default DoctorSection
