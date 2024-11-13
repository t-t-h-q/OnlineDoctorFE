import { IDoctor } from '../../interfaces/doctor'

const images = [
  'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/921646/pexels-photo-921646.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://cdn.pixabay.com/photo/2023/06/19/16/01/vietnamese-girl-8074992_1280.jpg',
  'https://cdn.pixabay.com/photo/2017/07/10/20/36/hot-girl-2491465_1280.jpg',
  'https://cdn.pixabay.com/photo/2022/12/30/06/14/beautiful-girl-7686298_1280.jpg',
  'https://cdn.pixabay.com/photo/2022/10/21/09/01/fashion-7536573_1280.jpg',
  'https://th.bing.com/th/id/OIP.6NaTC3QdapE5BQesXVyM6wHaMN?pid=ImgDet&w=195&h=321&c=7&dpr=2',
]

const getRandomImage = () => images[Math.floor(Math.random() * images.length)]

const mockDoctors: IDoctor[] = Array.from(
  { length: 6 },
  (_, index) =>
    ({
      id: `${index + 1}`,
      name: `Dr. Doctor ${index + 1}`,
      email: `doctor${index + 1}@mail.com`,
      phone: `123-456-78${index.toString().padStart(2, '0')}`,
      specialties: [`Specialty ${(index % 5) + 1}`],
      avatar: getRandomImage(),
      general_information: {
        phone: `123-456-78${index.toString().padStart(2, '0')}`,
        email: `doctor${index + 1}@mail.com`,
        address: `123 Medical St, Health City ${index + 1}`,
        types_of: 'Full-Time Physician',
        experience: `${index + 1} Years`,
        languages: ['English', 'Spanish'],
      },
      location: {
        address: `123 Medical St, Health City ${index + 1}`,
        coordinates: [-74.006, 40.7128],
      },
      ratings: {
        average_rating: (Math.random() * 5).toFixed(1),
        review_count: Math.floor(Math.random() * 100),
        reviews: [
          {
            patient_id: `${index + 1}`,
            rating: Math.floor(Math.random() * 5) + 1,
            review: 'Excellent doctor!',
            created_at: new Date().toISOString(),
          },
        ],
      },
    }) as unknown as IDoctor,
)

export default mockDoctors
