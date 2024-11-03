import { IDoctor } from 'interfaces/doctor'

// Helper function to generate fake users
export const generateFakeUsers = (count: number): IDoctor[] => {
  const specialties = ['Cardiology', 'Pediatrics', 'Neurology', 'Dermatology', 'Orthopedics']

  const locations = [
    'Ha Noi, Vietnam',
    'Ho Chi Minh City, Vietnam',
    'Da Nang, Vietnam',
    'Tokyo, Japan',
    'Singapore',
    'San Francisco, USA',
  ]

  const firstNames = ['Alex', 'John', 'Mary', 'Sarah', 'Michael', 'David', 'Linda', 'James']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller']

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
      lastNames[Math.floor(Math.random() * lastNames.length)]
    }`,
    specialty: specialties[Math.floor(Math.random() * specialties.length)],
    rating: Number((Math.random() * 4 + 1).toFixed(1)), // Rating từ 1.0 đến 5.0
    availability: Math.random() > 0.3, // 70% chance available
    location: locations[Math.floor(Math.random() * locations.length)],
  }))
}
