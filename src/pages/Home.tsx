// import { Button } from 'antd'
// import { useGetPostsQuery } from 'services/api'
// import { useCounter } from 'hooks/useCounter'
// import { usePost } from 'hooks/usePosts'
import { Button } from 'antd'
import { useLazyGetProfileQuery } from '@/services/auth'
import { STORAGE_KEYS } from '@/constants/storageKeys'
import StorageService from '@/services/localStorage'
import { useAppDispatch } from '@/store/hooks'
import { resetCredentials } from '@/store/auth'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  // const { error, isLoading } = useGetPostsQuery()
  // const { count, handleIncrement, handleDecrement, handleIncrementByAmount } = useCounter()
  // const { postsList, handleReset } = usePost()
  // if (isLoading) return <div>Loading...</div>
  // if (error) return <div>An error occurred</div>

  const dispatch = useAppDispatch()
  const navigator = useNavigate()
  const [getProfile] = useLazyGetProfileQuery()

  const fetchProfile = async () => {
    await getProfile().unwrap()
  }

  const handleLogout = () => {
    dispatch(resetCredentials())
    StorageService.remove(STORAGE_KEYS.AUTH_PROFILE)
    navigator('/login')
  }

  return (
    <div className='flex flex-col items-center justify-center h-full gap-10'>
      <h1>Home</h1>

      <Button type='primary' onClick={fetchProfile}>
        Get profile
      </Button>

      <Button color='danger' variant='solid' onClick={handleLogout}>
        Logout
      </Button>

      {/* <div className='flex items-center justify-center h-full'>
        <Button type='primary' className='mt-10 btn' onClick={handleDecrement}>
          -
        </Button>
        <span>{count}</span>
        <Button type='primary' className='mt-10 btn' onClick={handleIncrement}>
          +
        </Button>
        <Button type='primary' className='mt-10 btn' onClick={() => handleIncrementByAmount(5)}>
          +5
        </Button>
        <Button type='primary' className='mt-10 btn' onClick={handleReset}>
          reset posts state
        </Button>
      </div>
      <ul>{postsList?.map((post) => <li key={post.id}>{post.title}</li>)}</ul> */}
    </div>
  )
}

export default Home
