import React, { useEffect } from 'react'
import { Modal, Form, DatePicker, TimePicker, Button, Space } from 'antd'
import dayjs from 'dayjs'
import { DATE_TIME_FORMAT } from '@/constants/time'
import { validateEndTime } from '@/utils/helpers'
import { Appointment, TimeSlot } from '@/interfaces/appointment'

interface EditAppointmentModalProps {
  isOpen: boolean
  appointment: Appointment | null
  onClose: () => void
  onSubmit: (values: { appointment_date: string; time_slot: TimeSlot }) => Promise<void>
}

// Interface cho form values
export interface EditAppointmentFormValues {
  appointment_date: string
  time_slot: TimeSlot
}

const EditAppointmentModal: React.FC<EditAppointmentModalProps> = ({ isOpen, appointment, onClose, onSubmit }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = React.useState(false)

  // Set form values when appointment changes
  useEffect(() => {
    if (appointment && isOpen) {
      form.setFieldsValue({
        date: dayjs(appointment.appointment_date),
        time_slot: {
          start_time: dayjs(appointment.time_slot.start_time, DATE_TIME_FORMAT.HOUR_MINUTE),
          end_time: dayjs(appointment.time_slot.end_time, DATE_TIME_FORMAT.HOUR_MINUTE),
        },
      })
    }
  }, [appointment, isOpen, form])

  const handleClose = () => {
    form.resetFields()
    onClose()
  }

  const handleSubmit = async (values: EditAppointmentFormValues) => {
    setLoading(true)
    const formattedValues = {
      appointment_date: dayjs(values.appointment_date).format(DATE_TIME_FORMAT.YEAR_MONTH_DAY),
      time_slot: {
        start_time: dayjs(values.time_slot.start_time).format(DATE_TIME_FORMAT.HOUR_MINUTE),
        end_time: dayjs(values.time_slot.end_time).format(DATE_TIME_FORMAT.HOUR_MINUTE),
      },
    }
    await onSubmit(formattedValues)
    setLoading(false)
    handleClose()
  }

  return (
    <Modal title='Edit Appointment' open={isOpen} onCancel={handleClose} footer={null}>
      <Form form={form} layout='vertical' onFinish={handleSubmit} className='mt-4'>
        <Form.Item name='date' label='Appointment Date' rules={[{ required: true, message: 'Please select date' }]}>
          <DatePicker className='w-full' format={DATE_TIME_FORMAT.YEAR_MONTH_DAY} />
        </Form.Item>

        <Form.Item label='Time Slot' required>
          <Space.Compact style={{ width: '100%' }}>
            <Form.Item
              name={['time_slot', 'start_time']}
              rules={[{ required: true, message: 'Please select start time' }]}
              noStyle
            >
              <TimePicker format={DATE_TIME_FORMAT.HOUR_MINUTE} placeholder='Start time' className='w-full' />
            </Form.Item>
            <Form.Item
              name={['time_slot', 'end_time']}
              rules={[{ required: true, message: 'Please select end time' }, validateEndTime(form.getFieldValue)]}
              noStyle
            >
              <TimePicker format={DATE_TIME_FORMAT.HOUR_MINUTE} placeholder='End time' className='w-full' />
            </Form.Item>
          </Space.Compact>
        </Form.Item>

        <Form.Item className='mb-0 flex justify-end'>
          <Space>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='primary' htmlType='submit' className='bg-blue-500' loading={loading}>
              Save Changes
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditAppointmentModal
