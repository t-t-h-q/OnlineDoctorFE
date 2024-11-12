const doctorNames = [
  'Dr. John Smith',
  'Dr. Sarah Johnson',
  'Dr. Mike Wilson',
  'Dr. Emily Brown',
  'Dr. David Lee',
  'Dr. Lisa Anderson',
  'Dr. Robert Taylor',
  'Dr. Jessica White',
  'Dr. Michael Chen',
  'Dr. Amanda Garcia',
]

const statuses = ['Confirmed', 'Completed', 'Cancelled', 'Pending', 'Rescheduled']

const generateRandomTime = () => {
  const hours = Math.floor(Math.random() * (17 - 9 + 1)) + 9 // 9 AM to 5 PM
  const minutes = Math.floor(Math.random() * 4) * 15 // 0, 15, 30, 45
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

const generateRandomDate = () => {
  const start = new Date('2024-11-10')
  const end = new Date('2025-02-10')
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return randomDate.toISOString().split('T')[0]
}

export const appointments = Array.from({ length: 100 }, (_, index) => ({
  id: (index + 1).toString(),
  date: generateRandomDate(),
  time: generateRandomTime(),
  doctorName: doctorNames[Math.floor(Math.random() * doctorNames.length)],
  status: statuses[Math.floor(Math.random() * statuses.length)],
}))
