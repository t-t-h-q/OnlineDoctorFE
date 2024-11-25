import React from 'react'
import { List, Typography } from 'antd'
import TestimonialCard from 'components/TestimonialCard'

export interface Testimonial {
  name: string
  comment: string
  rating: number
}

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

const { Title } = Typography

const TestimonialsSection: React.FC = () => {
  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <Title level={2} className='text-center mb-12'>
          Customer Reviews
        </Title>
        <List
          grid={{
            gutter: 16,
            column: 3,
          }}
          className='w-full'
          dataSource={testimonials}
          renderItem={(item) => {
            return <TestimonialCard item={item} />
          }}
        />
      </div>
    </section>
  )
}

export default TestimonialsSection
