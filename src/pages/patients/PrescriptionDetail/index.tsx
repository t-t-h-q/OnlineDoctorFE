import React, { useEffect, useState } from 'react'
import { Card, Typography, Table, Button } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '@/components/commons/Loading'
import usePrescriptionDetail from '@/hooks/usePrescriptionDetail'

const { Title } = Typography

export interface IPrescription {
  name: string
  dosage: string
  frequency: string
}

const PrescriptionDetail: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [prescriptions, setPrescriptions] = useState<IPrescription[]>([])

  const { fetchPrescriptionDetail, data, isLoadingData, isFetching } = usePrescriptionDetail()

  useEffect(() => {
    if (id) {
      fetchPrescriptionDetail(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    if (data) {
      setPrescriptions(data)
    }
  }, [data])

  const columns: ColumnsType<IPrescription> = [
    {
      title: 'Medication Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Dosage',
      dataIndex: 'dosage',
      key: 'dosage',
    },
    {
      title: 'Frequency',
      dataIndex: 'frequency',
      key: 'frequency',
    },
  ]

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className='container mx-auto p-4'>
      <Card
        title={
          <div className='flex items-center justify-between'>
            <Title level={3} className='mb-0'>
              Prescription Details
            </Title>
            <Button icon={<FontAwesomeIcon icon={faArrowLeft} />} onClick={handleBack} className='flex items-center'>
              Back to Appointment
            </Button>
          </div>
        }
        className='shadow-lg'
      >
        {isFetching || isLoadingData ? (
          <Loading />
        ) : (
          <Table columns={columns} dataSource={prescriptions} rowKey='name' pagination={false} />
        )}
      </Card>
    </div>
  )
}

export default PrescriptionDetail
