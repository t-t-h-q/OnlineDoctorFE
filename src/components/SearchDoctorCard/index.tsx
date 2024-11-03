import { Button, Card, Rate, Tag } from 'antd'
import { IDoctor } from 'interfaces/doctor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faLocationDot, faStethoscope, faUser } from '@fortawesome/free-solid-svg-icons'

interface DoctorCardProps {
  doctor: IDoctor
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <Card className='shadow-sm hover:shadow-md transition-shadow'>
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
  )
}

export default DoctorCard
