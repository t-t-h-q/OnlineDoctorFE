import { Tag } from 'antd'

export interface DoctorSpecialtyProps {
  specialties: string[]
}

export const DoctorSpecialty = ({ specialties }: DoctorSpecialtyProps) => {
  return (
    <div className='flex flex-wrap gap-2 mt-2'>
      {specialties.map((specialty) => (
        <Tag color='blue' key={specialty}>
          {specialty}
        </Tag>
      ))}
    </div>
  )
}
