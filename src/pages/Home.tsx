import { Button } from 'antd'
import { useGetPostsQuery } from 'services/api'
import { useCounter } from 'hooks/useCounter'
import { usePost } from 'hooks/usePosts'

export const Home = () => {
  const { error, isLoading } = useGetPostsQuery()

  const { count, handleIncrement, handleDecrement, handleIncrementByAmount } = useCounter()
  const { postsList, handleReset } = usePost()
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred</div>

  return (
    <>
      <h1>Home</h1>
      <div className='flex items-center justify-center h-full'>
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
      <ul>{postsList?.map((post) => <li key={post.id}>{post.title}</li>)}</ul>
    </>
  )
}

export default Home
