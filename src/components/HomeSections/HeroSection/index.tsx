import React from 'react'
import { Button, Typography } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'
import heroImage from 'assets/images/hero-image.svg'

const { Title, Paragraph } = Typography

const HeroSection: React.FC = () => {
  return (
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
}

export default HeroSection
