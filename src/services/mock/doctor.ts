export const mock = {
  id: '12',
  name: 'John Doe',
  avatar:
    'https://cdn.eva.vn/upload/3-2022/images/2022-09-03/xuat-hien-hotgirl-que-thanh-hoa-danh-bat-ngoc-trinh-voi-cung-mot-thiet-ke-body-tu-nhien-cuc-cuon-297852841_1732952273750529_7658906805910932811_n-1662195485-939-width780height1170.jpg',
  general_information: {
    phone: '123-456-7890',
    email: 'test@gmail.com',
    address: '123 Medical St, Health City',
    languages: ['English', 'Spanish'],
    experience: '22 Years+',
    types_of: 'Full-Time Physician',
    describe:
      'Dr. Karen Dawson is a board-certified pediatrician at The Center for Children and Women - Greenpoint. She completed her medical training at the Louisiana State University School of Medicine in New Orleans.',
  },
  professional_documents: ['https://example.com/doc1.pdf', 'https://example.com/doc2.pdf'],
  specialties: ['Cardiology', 'Internal Medicine'],
  phone: '123-456-7890',
  location: {
    address: '123 Medical St, Health City',
    coordinates: [-74.006, 40.7128],
  },
  availability: [
    {
      day_of_week: 'Monday',
      time_slots: [{ start_time: '09:00', end_time: '17:00' }],
    },
    {
      day_of_week: 'Wednesday',
      time_slots: [{ start_time: '10:00', end_time: '15:00' }],
    },
  ],
  ratings: {
    average_rating: 4.5,
    review_count: 10,
    reviews: [
      {
        patient_id: '6123abcd2345ef6789',
        rating: 5,
        review: 'Excellent doctor, very knowledgeable and friendly.',
        created_at: '2023-08-15T10:45:00Z',
      },
    ],
  },
}
