import { Input, Button, Typography } from 'antd'
import { usePatientAppointment } from '../../../../hooks/usePatientAppointment'

export interface Step3PatientInfoProps {
  onNext: () => void
  onPrevious: () => void
}

const Step3PatientInfo = ({ onNext, onPrevious }: Step3PatientInfoProps) => {
  const { patientInfo, handlePatientInfoChange } = usePatientAppointment()

  return (
    <div>
      <Typography.Title level={2}>Enter Patient Information</Typography.Title>
      <Input.TextArea
        rows={4}
        placeholder='Health Condition'
        value={patientInfo.name}
        onChange={handlePatientInfoChange}
        className='mb-4'
      />
      <div className='mt-4'>
        <Button onClick={onPrevious} className='mr-2'>
          Back
        </Button>
        <Button type='primary' onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default Step3PatientInfo
