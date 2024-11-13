import { useState, useEffect } from 'react'
import { Calendar as AntdCalendar } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

interface ICalendarProps {
  value?: string
  onSelect: (value: string) => void
  onPanelChange: (value: string) => void
}

const Calendar = ({ onSelect, value }: ICalendarProps) => {
  const [calendarValue, setValue] = useState(() => dayjs(value ?? ''))
  const [selectedValue, setSelectedValue] = useState(() => dayjs(value))

  const handleSelect = (newValue: Dayjs) => {
    setValue(newValue)
    setSelectedValue(newValue)
  }

  const handlePanelChange = (newValue: Dayjs) => {
    setValue(newValue)
  }

  useEffect(() => {
    console.log(dayjs(calendarValue).toISOString())
    onSelect(calendarValue.toISOString())
  }, [onSelect, selectedValue, calendarValue])

  return <AntdCalendar value={calendarValue} onSelect={handleSelect} onPanelChange={handlePanelChange} />
}

export default Calendar
