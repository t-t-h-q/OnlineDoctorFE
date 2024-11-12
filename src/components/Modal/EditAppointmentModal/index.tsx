import React, { useEffect } from 'react'
import { Modal, Form, DatePicker, TimePicker, Button, Space } from 'antd'
import dayjs from 'dayjs'

interface EditAppointmentModalProps {
  isOpen: boolean
  appointment: {
    id: string
    date: string
    time: string
    doctorName: string
    status: string
  } | null
  onClose: () => void
  onSubmit: (values: { date: string; time: string }) => void
}

// Interface cho form values
export interface EditAppointmentFormValues {
  date: string
  time: string
}

const EditAppointmentModal: React.FC<EditAppointmentModalProps> = ({ isOpen, appointment, onClose, onSubmit }) => {
  const [form] = Form.useForm()

  // Set form values when appointment changes
  useEffect(() => {
    if (appointment && isOpen) {
      form.setFieldsValue({
        date: dayjs(appointment.date),
        time: dayjs(appointment.time, 'HH:mm'),
      })
    }
  }, [appointment, isOpen, form])

  const handleClose = () => {
    form.resetFields()
    onClose()
  }

  const handleSubmit = async (values: EditAppointmentFormValues) => {
    await onSubmit(values)
    handleClose()
  }

  return (
    <Modal title='Edit Appointment' open={isOpen} onCancel={handleClose} footer={null}>
      <Form form={form} layout='vertical' onFinish={handleSubmit} className='mt-4'>
        <Form.Item name='date' label='Appointment Date' rules={[{ required: true, message: 'Please select date' }]}>
          <DatePicker className='w-full' format='YYYY-MM-DD' />
        </Form.Item>

        <Form.Item name='time' label='Appointment Time' rules={[{ required: true, message: 'Please select time' }]}>
          <TimePicker format='HH:mm' className='w-full' />
        </Form.Item>

        <Form.Item className='mb-0 flex justify-end'>
          <Space>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='primary' htmlType='submit' className='bg-blue-500'>
              Save Changes
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditAppointmentModal
