import React from 'react'
import { Button, Descriptions, Typography } from 'antd'
import { usePatientAppointment } from '@/hooks/usePatientAppointment'
import dayjs from 'dayjs'

interface Step4ConfirmProps {
  onPrevious: () => void
}

const Step4Confirm: React.FC<Step4ConfirmProps> = ({ onPrevious }) => {
  const {
    selectedDoctor,
    appointmentDate,
    patientInfo,
    handleSubmitAppointment,
    isCreatingAppointment,
  } = usePatientAppointment()

  const handleConfirm = async () => {
    const isSuccess = await handleSubmitAppointment()
    if (isSuccess) {
      // redirect to appointment page
    }
  }

  return (
    <div>
      <Typography.Title level={2}>Confirmation</Typography.Title>
      <Descriptions bordered>
        <Descriptions.Item label='Doctor'>{selectedDoctor?.name}</Descriptions.Item>
        <Descriptions.Item label='Date'>
          {appointmentDate ? dayjs(appointmentDate).format('YYYY-MM-DD') : 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label='Health Condition'>{patientInfo.name}</Descriptions.Item>
      </Descriptions>
      <div className='mt-4'>
        <Button onClick={onPrevious} className='mr-2'>
          Back
        </Button>
        <Button type='primary' onClick={handleConfirm} loading={isCreatingAppointment}>
          Confirm Appointment
        </Button>
      </div>
    </div>
  )
}

export default Step4Confirm
