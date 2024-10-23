import { useNavigate } from 'react-router-dom'

import { useLoginMutation } from '@/services/auth'
import { ILoginRequest } from '@/interfaces/auth'
import { STORAGE_KEYS } from '@/constants/storageKeys'
import StorageService from '@/services/localStorage'
import { ERoles } from '@/enums/role'
import { ADMIN_ROUTES, DOCTOR_PATHS, PATIENT_PATHS } from '@/constants/routeNames'

const useLogin = () => {
  const navigate = useNavigate()
  const [login, { isLoading: isLoginLoading }] = useLoginMutation()

  const onLogin = async (params: ILoginRequest) => {
    try {
      const data = await login(params).unwrap()
      if (!data || !data.token) return

      const tokens = { accessToken: data.token, refreshToken: data.refreshToken, tokenExpires: data.tokenExpires }
      StorageService.set(STORAGE_KEYS.AUTH_PROFILE, tokens)

      const { role } = data.user
      if (!role) return

      switch (role.id) {
        case ERoles.ADMIN:
          navigate(ADMIN_ROUTES.BASE_PATH)
          break
        case ERoles.DOCTOR:
          navigate(DOCTOR_PATHS.BASE)
          break
        case ERoles.PATIENT:
          navigate(PATIENT_PATHS.BASE)
          break
        default:
          navigate('/')
          break
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Login error:', error)
    }
  }

  return {
    isLoginLoading,
    onLogin,
  }
}

export default useLogin
