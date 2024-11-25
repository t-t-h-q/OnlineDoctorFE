import { Rule } from 'antd/es/form'
import { Dayjs } from 'dayjs'
import { FormInstance } from 'antd'

export const validateEndTime = (getFieldValue: FormInstance['getFieldValue']): Rule => ({
  validator: (_, value: Dayjs) => {
    const startTime = getFieldValue(['time_slot', 'start_time'])
    if (!value || !startTime || value.isAfter(startTime)) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('End time must be after start time'))
  },
})
