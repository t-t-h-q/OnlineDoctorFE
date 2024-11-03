import React from 'react'
import { Layout } from 'antd'
import HeroSection from 'components/HomeSections/HeroSection'
import FeaturesSection from 'components/HomeSections/FeaturesSection'
import TestimonialsSection from 'components/HomeSections/TestimonialsSection'
import DoctorSection from 'components/HomeSections/DoctorSection'

const { Content } = Layout

const HomeContent: React.FC = () => {
  return (
    <Content className='pt-16'>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Doctors Section */}
      <DoctorSection />

      {/* Testimonials Section */}
      <TestimonialsSection />
    </Content>
  )
}

export default HomeContent
