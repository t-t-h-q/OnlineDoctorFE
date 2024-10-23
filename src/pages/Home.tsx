import { 
  // useAppSelector, 
  useAppDispatch } from 'store/hooks'
import { increment, decrement, incrementByAmount } from 'store/exampleSlice'
import { Button } from 'antd'
// import { useGetPostsQuery } from 'services/api'

export const Home = () => {
  // const { data: posts, error, isLoading } = useGetPostsQuery()
  // const count = useAppSelector((state) => state.example?.value ?? 0)
  const dispatch = useAppDispatch()
  // if (isLoading) return <div>Loading...</div>
  // if (error) return <div>An error occurred</div>
  return (
    <>
      <h1>Home</h1>
      <div className='flex items-center justify-center h-full'>
        <Button type='primary' className='mt-10 btn' onClick={() => dispatch(decrement())}>
          -
        </Button>
        {/* <span>{count}</span> */}
        <Button type='primary' className='mt-10 btn' onClick={() => dispatch(increment())}>
          +
        </Button>
        <Button type='primary' className='mt-10 btn' onClick={() => dispatch(incrementByAmount(5))}>
          +5
        </Button>
      </div>
      {/* <ul>{posts?.map((post) => <li key={post.id}>{post.title}</li>)}</ul> */}
    </>
  )
}

export default Home
