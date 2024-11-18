import { Rate, Typography } from 'antd'
const { Text } = Typography

export interface DoctorRatingProps {
  average_rating: number
  review_count: number
}

export const DoctorRating = ({ average_rating, review_count }: DoctorRatingProps) => {
  return (
    <div className='flex items-center'>
      <Rate allowHalf value={average_rating} disabled />
      <Text className='ml-2 text-lg'>{average_rating} / 5</Text>
      <Text className='ml-2 text-gray-600'>({review_count} reviews)</Text>
    </div>
  )
}
