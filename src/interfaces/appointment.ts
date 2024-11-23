export interface TimeSlot {
  start_time: string
  end_time: string
}
export interface Appointment {
  id: string
  appointment_date: string
  time_slot: TimeSlot
  doctorName: string
  status: string
}
