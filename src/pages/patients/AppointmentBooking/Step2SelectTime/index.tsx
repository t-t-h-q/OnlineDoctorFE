import { Button, Typography, Calendar } from 'antd'
import { usePatientAppointment } from '../../../../hooks/usePatientAppointment'
import TimePicker from '../../../../components/commons/TimePicker'

export interface Step2SelectTimeProps {
  onNext: () => void
  onPrevious: () => void
}

const Step2SelectTime = ({ onNext, onPrevious }: Step2SelectTimeProps) => {
  const { appointmentDate, handleDateChange } = usePatientAppointment()

  return (
    <div>
      <Typography.Title level={2}>Select Appointment Time</Typography.Title>
      <TimePicker />
      <Calendar onSelect={handleDateChange} />
      <div className='mt-4'>
        <Button onClick={onPrevious} className='mr-2'>
          Back
        </Button>
        <Button type='primary' onClick={onNext} disabled={!appointmentDate}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default Step2SelectTime
