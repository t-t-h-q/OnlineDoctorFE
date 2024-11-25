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
            <Title level={1}>Online health care</Title>
            <Paragraph className='text-lg mb-8'>
              Remote medical consultation service with a team of professional doctors, ready to assist you 24/7.
            </Paragraph>
            <Button type='primary' size='large' className='flex items-center'>
              <FontAwesomeIcon icon={faCalendarPlus} className='mr-2' />
              Book an appointment now.
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
