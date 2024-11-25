import { Card, Typography } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Feature } from 'components/HomeSections/FeaturesSection'

const { Title, Text } = Typography

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
  const { icon, title, description } = feature
  return (
    <Card className='text-center hover:shadow-lg transition-shadow duration-300'>
      <FontAwesomeIcon icon={icon} className='text-4xl text-blue-500 mb-4' />
      <Title level={4}>{title}</Title>
      <Text>{description}</Text>
    </Card>
  )
}

export default FeatureCard
