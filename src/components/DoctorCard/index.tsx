import React from 'react'
import { Card, Typography } from 'antd'
import { IDoctor } from '../../interfaces/doctor'
import { DoctorSpecialty } from '../DoctorSpecialty'
import { DoctorRating } from '../DoctorRating'
import classNames from 'classnames'

interface DoctorCardProps {
  doctor: IDoctor
  children?: React.ReactNode
  isSelected?: boolean
}

const { Title, Text } = Typography

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, children, isSelected }) => {
  const doctorCardClassname = classNames('text-center p-0 hover:shadow-lg transition-shadow duration-300', {
    'hover:shadow-lg': true,
    'transition-shadow': true,
    'duration-300': true,
    'border-2 border-blue-500': isSelected, // Add border if selected
  })

  return (
    <Card
      className={doctorCardClassname}
      hoverable
      bordered
      cover={<img alt='example' src={doctor.avatar} style={{ height: '250px', objectFit: 'cover' }} />}
    >
      <div className='flex flex-col item-center'>
        <Title level={4} className='mt-4 mb-2'>
          {doctor.name}
          <Text className='block text-gray-500'>{doctor.general_information.experience}</Text>
        </Title>
        <DoctorSpecialty specialties={doctor.specialties} />
        <div className='pt-4'>
          <DoctorRating average_rating={doctor.ratings.average_rating} review_count={doctor.ratings.review_count} />
        </div>
        {children}
      </div>
    </Card>
  )
}

export default DoctorCard
