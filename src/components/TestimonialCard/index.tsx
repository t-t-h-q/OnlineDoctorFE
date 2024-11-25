import { Card, Rate, Typography, List } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { Testimonial } from 'components/HomeSections/TestimonialsSection'

const { Text, Paragraph } = Typography

const TestimonialCard: React.FC<{ item: Testimonial }> = ({ item }) => {
  return (
    <List.Item className='!w-full'>
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
    </List.Item>
  )
}

export default TestimonialCard
