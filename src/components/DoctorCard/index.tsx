import React from 'react'
import { Card, Avatar, Rate, Typography } from 'antd'

interface DoctorCardProps {
  doctor: {
    avatar: string
    name: string
    experience: string
    specialties: string
    average_rating: number
  }
  index: number
}

const { Title, Text } = Typography

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, index }) => {
  return (
    <Card key={index} className='text-center hover:shadow-lg transition-shadow duration-300' hoverable>
      <Avatar size={100} src={doctor.avatar} alt={doctor.name} className='mb-4' />
      <Title level={4} className='mt-4 mb-2'>
        {doctor.name}
      </Title>
      <Text className='block text-gray-500 mb-1'>{doctor.specialties}</Text>
      <Text className='block text-gray-500 mb-2'>{doctor.experience}</Text>
      <Rate disabled defaultValue={doctor.average_rating} />
    </Card>
  )
}

export default DoctorCard
