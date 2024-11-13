import { List } from 'antd'
import { IDoctor } from '../../interfaces/doctor'
import DoctorCard from '../DoctorCard'

interface IDoctorListProps {
  doctors: IDoctor[]
  onDoctorSelect?: (doctor: IDoctor) => void
  selectedDoctor?: IDoctor | null
  isLoading?: boolean
}

export const DoctorList = ({ doctors, onDoctorSelect, selectedDoctor, isLoading }: IDoctorListProps) => {
  const handleDoctorSelect = (doctor: IDoctor) => {
    onDoctorSelect?.(doctor)
  }

  return (
    <List
      grid={{ gutter: 8, column: 3 }}
      dataSource={doctors}
      loading={isLoading}
      renderItem={(doctor) => (
        <List.Item onClick={() => handleDoctorSelect(doctor)} className='cursor-pointer'>
          <DoctorCard doctor={doctor} isSelected={selectedDoctor?.id === doctor.id} />
        </List.Item>
      )}
    />
  )
}

export default DoctorList
