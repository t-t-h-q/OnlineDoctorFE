import { useAppSelector, useAppDispatch } from 'store/hooks'
import { increment, decrement, incrementByAmount } from 'store/exampleSlice'
import { Button } from 'antd'

function App() {
  const count = useAppSelector((state) => state.example.value)
  const dispatch = useAppDispatch()
  return (
    <div className='flex items-center justify-center h-full'>
      <Button type='primary' className='mt-10 btn' onClick={() => dispatch(decrement())}>
        -
      </Button>
      <span>{count}</span>
      <Button type='primary' className='mt-10 btn' onClick={() => dispatch(increment())}>
        +
      </Button>
      <Button type='primary' className='mt-10 btn' onClick={() => dispatch(incrementByAmount(5))}>
        +5
      </Button>
    </div>
  )
}

export default App
