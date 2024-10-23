import { useAppDispatch, useAppSelector } from 'store/hooks'
import { resetState } from 'store/postsSlice'

export const usePost = () => {
  const dispatch = useAppDispatch()
  const postsList = useAppSelector((state) => state.posts.postsList)

  const handleReset = () => {
    dispatch(resetState())
  }

  return { postsList, handleReset }
}
