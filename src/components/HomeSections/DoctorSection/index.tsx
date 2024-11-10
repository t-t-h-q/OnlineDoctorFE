import React from 'react'
import { Typography } from 'antd'
import DoctorCard from 'components/DoctorCard'
import { IDoctor } from 'interfaces/doctor'

const { Title } = Typography

const doctors: IDoctor[] = [
  {
    name: 'Dr. Nguyễn Văn A',
    specialty: 'Cardiology',
    rating: 5,
    image: '/doctor1.jpg',
    experience: '15 years of experience',
  },
  {
    name: 'Dr. Trần Thị B',
    specialty: 'Dermatology',
    rating: 4.5,
    image: '/doctor2.jpg',
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
          {doctors.map((doctor, index) => (
            <DoctorCard doctor={doctor} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default DoctorSection
