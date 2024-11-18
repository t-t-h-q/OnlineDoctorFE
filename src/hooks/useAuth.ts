import { selectCurrentUser } from '../store/auth'
import { useAppSelector } from '../store/hooks'

export const useAuth = () => {
  const currentUser = useAppSelector(selectCurrentUser)

  return {
    currentUser,
  }
}
