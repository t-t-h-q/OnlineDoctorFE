import React from 'react'
import { Typography } from 'antd'
import FeatureCard from 'components/FeatureCard'
import { faClock, faShieldAlt, faDollarSign, IconDefinition } from '@fortawesome/free-solid-svg-icons'

export interface Feature {
  icon: IconDefinition
  title: string
  description: string
}

const { Title } = Typography

const features: Feature[] = [
  {
    icon: faClock,
    title: 'Time-Saving',
    description: 'Consult anytime, anywhere without the need to travel',
  },
  {
    icon: faShieldAlt,
    title: 'Safe & Secure',
    description: 'Your personal information is completely protected',
  },
  {
    icon: faDollarSign,
    title: 'Affordable',
    description: 'Transparent and competitive pricing',
  },
]

const FeaturesSection: React.FC = () => {
  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <Title level={2} className='text-center mb-12'>
          Why Choose Us?
        </Title>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {features.map((feature) => (
            <FeatureCard feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
