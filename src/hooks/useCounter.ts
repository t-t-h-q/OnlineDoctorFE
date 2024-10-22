import { useAppSelector, useAppDispatch } from 'store/hooks'
import { increment, decrement, incrementByAmount } from '@/store/counterSlice'

export const useCounter = () => {
  const count = useAppSelector((state) => state.counter?.value ?? 0)
  const dispatch = useAppDispatch()

  const handleIncrement = () => dispatch(increment())
  const handleDecrement = () => dispatch(decrement())
  const handleIncrementByAmount = (amount: number) => dispatch(incrementByAmount(amount))

  return { count, handleIncrement, handleDecrement, handleIncrementByAmount }
}
