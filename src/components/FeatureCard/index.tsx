import { Card, Typography } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const { Title, Text } = Typography

export interface FeatureCardProps {
  icon: IconProp
  title: string
  description: string
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className='text-center hover:shadow-lg transition-shadow duration-300'>
      <FontAwesomeIcon icon={icon} className='text-4xl text-blue-500 mb-4' />
      <Title level={4}>{title}</Title>
      <Text>{description}</Text>
    </Card>
  )
}

export default FeatureCard
