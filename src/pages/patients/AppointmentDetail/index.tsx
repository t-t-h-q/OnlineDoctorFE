import React, { useEffect, useState } from 'react'
import { Card, Typography, Descriptions, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import useAppointmentDetail from '@/hooks/useAppointmentDetail'
import Loading from '@/components/commons/Loading'
import { TimeSlot } from '@/interfaces/appointment'
import { formatTimeSlot } from '@/utils/helpers'
import { PATIENT_PATHS } from '@/constants/routeNames'

const { Title, Text } = Typography

export interface IAppointmentDetail {
  id: string
  doctorName: string
  date: string
  time: TimeSlot
  notes: string
  prescription?: {
    id: string
    hasFile: boolean
  }
  speciality: string
  status: string
}

const AppointmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [appointmentDetail, setAppointmentDetail] = useState<IAppointmentDetail>()

  const { fetchAppointmentDetail, data, isLoadingData, isFetching } = useAppointmentDetail()

  useEffect(() => {
    if (id) {
      fetchAppointmentDetail(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (data) {
      setAppointmentDetail(data)
    }
  }, [data])

  const handleViewPrescription = () => {
    navigate(`/patients/prescriptions/${id}`)
  }

  const appointmentDetails = [
    { label: 'Doctor Name', value: appointmentDetail?.doctorName || '', strong: true },
    { label: 'Date', value: appointmentDetail?.date || '' },
    {
      label: 'Time',
      value: formatTimeSlot(appointmentDetail?.time),
    },
    { label: 'Notes', value: appointmentDetail?.notes || '' },
    {
      label: 'Prescription',
      value: appointmentDetail?.prescription ? (
        <Button type='link' className='p-0' onClick={handleViewPrescription}>
          View Prescription
        </Button>
      ) : (
        'No Prescription'
      ),
    },
  ]

  const handleBack = () => {
    navigate(PATIENT_PATHS.MANAGE_APPOINTMENTS)
  }

  return (
    <div className='container mx-auto p-4'>
      <Card
        title={
          <div className='flex items-center justify-between'>
            <Title level={3} className='mb-0'>
              Appointment Detail
            </Title>
            <Button icon={<FontAwesomeIcon icon={faArrowLeft} />} onClick={handleBack} className='flex items-center'>
              Back to Appointments
            </Button>
          </div>
        }
        className='shadow-lg'
      >
        {isFetching || isLoadingData ? (
          <Loading />
        ) : (
          <Descriptions bordered column={1}>
            {appointmentDetails.map((detail, index) => (
              <Descriptions.Item key={index} label={detail.label}>
                {detail.strong ? <Text strong>{detail.value}</Text> : detail.value}
              </Descriptions.Item>
            ))}
          </Descriptions>
        )}
      </Card>
    </div>
  )
}

export default AppointmentDetail
