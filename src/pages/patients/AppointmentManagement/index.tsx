import React, { useEffect, useState } from 'react'
import { Table, Button, Space, message } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faEye } from '@fortawesome/free-solid-svg-icons'
import useAppointmentsList from '@/hooks/useAppointmentsList'
import EditAppointmentModal, { EditAppointmentFormValues } from '@/components/Modal/EditAppointmentModal'
import WarningModal from '@/components/Modal/WarningModal'
import { STATUS_STYLES } from '@/constants/style'
import { Appointment } from '@/interfaces/appointment'
import { useNavigate } from 'react-router-dom'
import { PATIENT_PATHS } from '@/constants/routeNames'

const AppointmentPage: React.FC = () => {
  const navigate = useNavigate()
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  const [appointments, setAppointments] = useState<Appointment[]>([])

  const { fetchAppointmentsList, data, isLoadingData, isFetching } = useAppointmentsList()

  useEffect(() => {
    fetchAppointmentsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (data) {
      setAppointments(data)
    }
  }, [data])

  const handleView = (record: Appointment) => {
    // Navigate to appointment detail page
    navigate(`${PATIENT_PATHS.MANAGE_APPOINTMENTS}/${record.id}`)
  }

  const handleEdit = (record: Appointment) => {
    setSelectedAppointment(record)
    setIsEditModalVisible(true)
  }

  // Handle open confirm delete modal
  const handleDelete = (record: Appointment) => {
    setSelectedAppointment(record)
    setIsDeleteModalVisible(true)
  }

  // TODO: call api edit and show success alert
  const handleEditSubmit = async (values: EditAppointmentFormValues) => {
    // eslint-disable-next-line no-console
    console.log(values)
  }

  // TODO: call api delete
  const handleconfirmDelete = async () => {
    if (selectedAppointment) {
      message.success('Appointment deleted successfully')
      setIsDeleteModalVisible(false)
    }
  }

  const columns: ColumnsType<Appointment> = [
    {
      title: 'Doctor Name',
      dataIndex: 'doctorName',
      key: 'doctorName',
      sorter: true,
    },
    {
      title: 'Date',
      dataIndex: 'appointment_date',
      key: 'date',
      sorter: true,
    },
    {
      title: 'Time',
      dataIndex: 'time_slot',
      key: 'time',
      sorter: true,
      render: (_, record) => (
        <Space>
          <span>{record.time_slot.start_time}</span>
          <span>-</span>
          <span>{record.time_slot.end_time}</span>
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const style = STATUS_STYLES[status] || { bg: 'bg-gray-100', text: 'text-gray-800' }
        return <span className={`px-2 py-1 rounded-full text-sm ${style.bg} ${style.text}`}>{status}</span>
      },
      sorter: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size='middle'>
          <Button type='primary' className='bg-blue-500 flex items-center' onClick={() => handleEdit(record)}>
            <FontAwesomeIcon icon={faPencil} className='mr-2' />
            Edit
          </Button>
          <Button type='primary' danger className='flex items-center' onClick={() => handleDelete(record)}>
            <FontAwesomeIcon icon={faTrash} className='mr-2' />
            Delete
          </Button>
          <Button className='flex items-center' onClick={() => handleView(record)}>
            <FontAwesomeIcon icon={faEye} className='mr-2' />
            View
          </Button>
        </Space>
      ),
      width: '300px',
    },
  ]

  // TODO: handle pagination, filters, sorter, extra in table
  // Table change handler
  const handleTableChange: TableProps<Appointment>['onChange'] = (pagination, filters, sorter, extra) => {
    // eslint-disable-next-line no-console
    console.log('Table params:', { pagination, filters, sorter, extra })
  }
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>Appointments Management</h1>

      <Table
        tableLayout='auto'
        columns={columns}
        dataSource={appointments}
        rowKey='id'
        className='shadow-lg rounded-lg'
        onChange={handleTableChange}
        loading={isLoadingData || isFetching}
        pagination={{
          position: ['bottomCenter'],
          total: appointments.length,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} doctors`,
        }}
      />

      {/* Edit Modal */}
      <EditAppointmentModal
        isOpen={isEditModalVisible}
        appointment={selectedAppointment}
        onClose={() => setIsEditModalVisible(false)}
        onSubmit={handleEditSubmit}
      />

      {/* Delete Confirmation Modal */}
      <WarningModal
        isOpen={isDeleteModalVisible}
        title='Delete Appointment'
        content={<p>Are you sure you want to delete this appointment?</p>}
        onOk={handleconfirmDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
      />
    </div>
  )
}

export default AppointmentPage
