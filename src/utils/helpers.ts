import { Rule } from 'antd/es/form'
import { Dayjs } from 'dayjs'
import { FormInstance } from 'antd'
import { TimeSlot } from '@/interfaces/appointment'

export const validateEndTime = (getFieldValue: FormInstance['getFieldValue']): Rule => ({
  validator: (_, value: Dayjs) => {
    const startTime = getFieldValue(['time_slot', 'start_time'])
    if (!value || !startTime || value.isAfter(startTime)) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('End time must be after start time'))
  },
})

export const formatTimeSlot = (timeSlot?: TimeSlot) => {
  if (!timeSlot) return ''
  return `${timeSlot.start_time} - ${timeSlot.end_time}`
}
