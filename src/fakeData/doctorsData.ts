// Helper function to generate fake users
export const generateFakeUsers = (count: number) => {
  const specialties = ['Cardiology', 'Pediatrics', 'Neurology', 'Dermatology', 'Orthopedics']

  const locations = [
    {
      address: '123 Medical St, Ha Noi',
      coordinates: [105.8412, 21.0278],
    },
    {
      address: '456 Health Rd, Ho Chi Minh City',
      coordinates: [106.6297, 10.8231],
    },
    {
      address: '789 Wellness Ave, Da Nang',
      coordinates: [108.2772, 16.0544],
    },
    {
      address: '321 Care Blvd, Can Tho',
      coordinates: [105.79, 10.0452],
    },
    {
      address: '654 Health Lane, Hai Phong',
      coordinates: [106.688, 20.8449],
    },
  ]

  const firstNames = ['Alex', 'John', 'Mary', 'Sarah', 'Michael', 'David', 'Linda', 'James']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller']

  const reviewComments = [
    'Excellent doctor, very knowledgeable and friendly.',
    'Great experience with this doctor. Highly recommended!',
    'Very professional and caring doctor.',
    'The doctor took time to explain everything clearly.',
    'Wonderful experience, doctor was very thorough.',
    'Really satisfied with the consultation.',
  ]

  const generateRandomReviews = (doctorId: string) => {
    const reviewCount = Math.floor(Math.random() * 8) + 3 // 3-10 reviews
    return Array.from({ length: reviewCount }, (_, index) => {
      // Random date within last year
      const date = new Date()
      date.setDate(date.getDate() - Math.floor(Math.random() * 365))

      return {
        patient_id: `patient_${doctorId}_${index}`,
        rating: Math.floor(Math.random() * 3) + 3, // Rating between 3-5
        review: reviewComments[Math.floor(Math.random() * reviewComments.length)],
        created_at: date.toISOString(),
      }
    })
  }

  return Array.from({ length: count }, (_, index) => {
    const doctorId = String(index + 1)
    const reviews = generateRandomReviews(doctorId)

    return {
      id: doctorId,
      avatar: `https://via.placeholder.com/32`,
      name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
        lastNames[Math.floor(Math.random() * lastNames.length)]
      }`,
      specialties: [specialties[Math.floor(Math.random() * specialties.length)]],
      ratings: {
        average_rating: Number((reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)),
        review_count: reviews.length,
        reviews: reviews,
      },
      location: locations[Math.floor(Math.random() * locations.length)],
    }
  })
}
