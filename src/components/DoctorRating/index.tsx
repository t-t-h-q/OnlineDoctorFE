import { Rate, Typography } from 'antd'
const { Text } = Typography

export interface DoctorRatingProps {
  average_rating: number
  review_count: number
  showReviewCount?: boolean
  showDetailCount?: boolean
}

export const DoctorRating = ({ average_rating, review_count, showReviewCount, showDetailCount }: DoctorRatingProps) => {
  return (
    <div className='flex flex-col'>
      <Rate allowHalf value={average_rating} disabled />
      {showDetailCount && <Text className='text-lg'>{average_rating} / 5</Text>}
      {showReviewCount && <Text className='text-gray-600'>({review_count} reviews)</Text>}
    </div>
  )
}
