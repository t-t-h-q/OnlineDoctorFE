import React from 'react'
import { Typography } from 'antd'
import FeatureCard from 'components/FeatureCard'
import { Feature } from 'interfaces/home'
import { faClock, faShieldAlt, faDollarSign } from '@fortawesome/free-solid-svg-icons'

const { Title } = Typography

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

const FeaturesSection: React.FC = () => {
  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <Title level={2} className='text-center mb-12'>
          Tại sao chọn chúng tôi?
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
