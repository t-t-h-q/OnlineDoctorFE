import React from 'react'
import { Button, Card, Layout, Avatar, Rate, List, Typography } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faShieldAlt, faDollarSign, faCalendarPlus, faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import heroImage from 'assets/images/hero-image.svg'

const { Content } = Layout
const { Title, Text, Paragraph } = Typography

interface Doctor {
  name: string
  specialty: string
  rating: number
  image: string
  experience: string
}

interface Testimonial {
  name: string
  comment: string
  rating: number
}

interface Feature {
  icon: IconDefinition
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: faClock,
    title: 'Tiết kiệm thời gian',
    description: 'Khám bệnh mọi lúc mọi nơi, không cần di chuyển',
  },
  {
    icon: faShieldAlt,
    title: 'An toàn & Bảo mật',
    description: 'Thông tin cá nhân được bảo vệ tuyệt đối',
  },
  {
    icon: faDollarSign,
    title: 'Chi phí hợp lý',
    description: 'Giá cả minh bạch và cạnh tranh',
  },
]

const doctors: Doctor[] = [
  {
    name: 'Dr. Nguyễn Văn A',
    specialty: 'Tim mạch',
    rating: 5,
    image: '/doctor1.jpg',
    experience: '15 năm kinh nghiệm',
  },
  {
    name: 'Dr. Trần Thị B',
    specialty: 'Da liễu',
    rating: 4.5,
    image: '/doctor2.jpg',
    experience: '10 năm kinh nghiệm',
  },
]

const testimonials: Testimonial[] = [
  {
    name: 'Nguyễn Văn X',
    comment:
      'Dịch vụ rất tốt, bác sĩ tư vấn tận tình. Tôi rất hài lòng với chất lượng dịch vụ và sẽ giới thiệu cho bạn bè.',
    rating: 5,
  },
  {
    name: 'Trần Thị Y',
    comment: 'Tiết kiệm thời gian, rất thuận tiện',
    rating: 4,
  },
]

const HomeContent: React.FC = () => {
  const renderHeroSection = () => (
    <section className='bg-blue-50 py-20'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center gap-8'>
          <div className='flex-1'>
            <Title level={1}>Chăm sóc sức khỏe trực tuyến</Title>
            <Paragraph className='text-lg mb-8'>
              Dịch vụ tư vấn y tế từ xa với đội ngũ bác sĩ chuyên nghiệp, sẵn sàng hỗ trợ bạn 24/7
            </Paragraph>
            <Button type='primary' size='large' className='flex items-center'>
              <FontAwesomeIcon icon={faCalendarPlus} className='mr-2' />
              Đặt lịch khám ngay
            </Button>
          </div>
          <div className='flex-1'>
            <img src={heroImage} alt='Telemedicine' className='w-full rounded-lg shadow-lg' loading='lazy' />
          </div>
        </div>
      </div>
    </section>
  )

  const renderFeatureCard = ({ icon, title, description }: Feature) => (
    <Card className='text-center hover:shadow-lg transition-shadow duration-300'>
      <FontAwesomeIcon icon={icon} className='text-4xl text-blue-500 mb-4' />
      <Title level={4}>{title}</Title>
      <Text>{description}</Text>
    </Card>
  )

  const renderDoctorCard = (doctor: Doctor, index: number) => (
    <Card key={index} className='text-center hover:shadow-lg transition-shadow duration-300' hoverable>
      <Avatar size={100} src={doctor.image} alt={doctor.name} className='mb-4' />
      <Title level={4} className='mt-4 mb-2'>
        {doctor.name}
      </Title>
      <Text className='block text-gray-500 mb-1'>{doctor.specialty}</Text>
      <Text className='block text-gray-500 mb-2'>{doctor.experience}</Text>
      <Rate disabled defaultValue={doctor.rating} />
    </Card>
  )

  const renderTestimonialCard = (item: Testimonial) => (
    <div className='h-full'>
      <Card hoverable className='h-full shadow-sm hover:shadow-lg transition-shadow duration-300'>
        <div className='flex flex-col h-full'>
          {/* Icon quote */}
          <div className='mb-4'>
            <FontAwesomeIcon icon={faQuoteLeft} className='text-2xl text-blue-400 opacity-50' />
          </div>

          {/* Rating */}
          <Rate disabled defaultValue={item.rating} className='mb-4' />

          {/* Comment */}
          <div className='flex-1 mb-4'>
            {/* <Paragraph className='text-gray-600 text-base'>{item.comment}</Paragraph> */}
            <Paragraph
              ellipsis={{
                rows: 1,
                expandable: false,
                tooltip: true,
              }}
              className='text-gray-600 text-base'
            >
              {item.comment}
            </Paragraph>
          </div>

          {/* Author */}
          <div className='mt-auto pt-4 border-t border-gray-100'>
            <Text strong className='text-blue-600 text-lg'>
              {item.name}
            </Text>
          </div>
        </div>
      </Card>
    </div>
  )

  return (
    <Content className='pt-16'>
      {renderHeroSection()}

      {/* Features Section */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <Title level={2} className='text-center mb-12'>
            Tại sao chọn chúng tôi?
          </Title>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {features.map((feature) => renderFeatureCard(feature))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <Title level={2} className='text-center mb-12'>
            Đội ngũ bác sĩ
          </Title>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {doctors.map((doctor, index) => renderDoctorCard(doctor, index))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <Title level={2} className='text-center mb-12'>
            Đánh giá từ khách hàng
          </Title>
          <List
            grid={{
              gutter: 16,
              column: 3,
            }}
            className='w-full'
            dataSource={testimonials}
            renderItem={(item) => <List.Item className='!w-full'>{renderTestimonialCard(item)}</List.Item>}
          />
        </div>
      </section>
    </Content>
  )
}

export default HomeContent
