import { Card, Divider, Typography } from 'antd'
import { MailOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { useDoctorDetail } from '../../../hooks/useDoctorDetail'
import { DoctorRating } from '../../../components/DoctorRating'
import { DoctorReviews } from '../../../components/DoctorReviews'
import { DoctorSpecialty } from '../../../components/DoctorSpecialty'

const { Title, Text, Paragraph } = Typography

const DoctorDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { doctor, general_information, ratings, reviews } = useDoctorDetail(id!)

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50 p-4'>
      <Card className='w-full max-w-5xl p-8 bg-white rounded-lg shadow-lg'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='flex flex-col items-center md:items-start text-center md:text-left'>
            <img src={doctor.avatar} className='w-full h-auto border-4 border-blue-500 mb-4' />
          </div>
          <div>
            <div>
              <Title level={2} className='text-primary'>
                Dr. {general_information.name}
              </Title>
              <Text type='secondary'>Paediatric Surgeon</Text>
              <Paragraph className='text-sm mt-2'>{doctor.location.address}</Paragraph>
            </div>

            <div className='mb-4'>
              <Title level={5} className='text-primary'>
                Specialty
              </Title>
              <DoctorSpecialty specialties={doctor.specialties} />
            </div>

            <Divider />
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <Title level={5} className='text-primary'>
                  Experience
                </Title>
                <Text>{general_information.experience}</Text>
              </div>
            </div>

            {/* Ratings Section */}
            <section className='ratings mt-4'>
              <Title level={5} className='text-secondary'>
                Ratings
              </Title>
              <DoctorRating average_rating={ratings.average_rating} review_count={ratings.review_count} />
            </section>
          </div>
        </div>
        <Divider />

        {/* Biography Section */}
        <div className='mt-4'>
          <Title level={5} className='text-primary'>
            Biography
          </Title>
          <Paragraph></Paragraph>
        </div>
        <Divider />

        {/* Contact Information */}
        <div className='mt-4'>
          <Title level={5} className='text-primary'>
            Contact
          </Title>
          <div className='flex flex-col gap-2 mt-2'>
            <Text>
              <PhoneOutlined /> {general_information.phone}
            </Text>
            <Text>
              <MailOutlined /> {general_information.email}
            </Text>
            <Text>
              <HomeOutlined /> {general_information.address}
            </Text>
          </div>
        </div>
        {/* Reviews Section */}
        <section className='reviews mt-6'>
          <Title level={5} className='text-secondary'>
            Patient Reviews
          </Title>
          <DoctorReviews reviews={reviews} />
        </section>
      </Card>
    </div>
  )
}

export default DoctorDetail
