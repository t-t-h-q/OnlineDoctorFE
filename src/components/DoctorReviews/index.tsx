import { List, Typography, Button, Rate } from 'antd'
import { IReview } from '../../interfaces/doctor'
import { useState } from 'react'

const { Text, Paragraph } = Typography

export interface DoctorReviewsProps {
  reviews: IReview[]
}

export const DoctorReviews = ({ reviews }: DoctorReviewsProps) => {
  const MAX_REVIEW = 3
  const [visibleReviews, setVisibleReviews] = useState(MAX_REVIEW)

  const handleLoadMoreReviews = () => {
    setVisibleReviews((prevVisible: number) => prevVisible + 3)
  }

  return (
    <>
      {reviews.length > 0 ? (
        <div className='max-h-96 overflow-y-auto p-4'>
          <List
            itemLayout='vertical'
            dataSource={reviews.slice(0, visibleReviews)} // Show only the visible reviews
            renderItem={(review) => (
              <List.Item key={review.patient_id} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex items-center'>
                  <List.Item.Meta
                    avatar={<Rate value={review.rating} disabled />}
                    title={<Text strong>Rating: {review.rating} / 5</Text>}
                    description={<Text type='secondary'>{new Date(review.created_at).toLocaleDateString()}</Text>}
                  />
                </div>
                <div>
                  <Paragraph>{review.review}</Paragraph>
                </div>
              </List.Item>
            )}
          />
        </div>
      ) : (
        <Text type='secondary'>No reviews yet.</Text>
      )}
      {visibleReviews < reviews.length && (
        <div className='flex justify-center mt-4'>
          <Button type='primary' onClick={handleLoadMoreReviews}>
            Load More Reviews
          </Button>
        </div>
      )}
    </>
  )
}
