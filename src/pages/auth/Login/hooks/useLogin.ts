import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useLoginMutation } from '@/services/auth'
import { ILoginRequest } from '@/interfaces/auth'
import { STORAGE_KEYS } from '@/constants/storageKeys'
import StorageService from '@/services/localStorage'
import { getRolePath } from '@/utils/rolePath'
import { useAppSelector } from '@/store/hooks'
import { selectCurrentUser } from '@/store/auth'

const useLogin = () => {
  const navigate = useNavigate()
  const currentUser = useAppSelector(selectCurrentUser)
  const [login, { isLoading: isLoginLoading }] = useLoginMutation()

  const onLogin = async (params: ILoginRequest) => {
    try {
      const data = await login(params).unwrap()
      if (!data || !data.token) return

      const tokens = { accessToken: data.token, refreshToken: data.refreshToken, tokenExpires: data.tokenExpires }
      StorageService.set(STORAGE_KEYS.AUTH_PROFILE, tokens)

      const { role } = data.user
      if (!role) return

      const pathToRedirect = getRolePath(role.name)
      navigate(pathToRedirect)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Login error:', error)
    }
  }

  // Redirect if user is already logged in
  useEffect(() => {
    if (currentUser?.role) {
      const pathToRedirect = getRolePath(currentUser.role.name)
      navigate(pathToRedirect)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  return {
    isLoginLoading,
    onLogin,
  }
}

export default useLogin
