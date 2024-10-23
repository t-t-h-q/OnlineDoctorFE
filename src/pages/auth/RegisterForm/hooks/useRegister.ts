import { FormInstance } from 'antd'

import { useRegisterMutation } from '@/services/auth'
import { IRegisterRequest } from '@/interfaces/auth'
import { useToast } from '@/hooks/useToast'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useRegister = (form: FormInstance<any>) => {
  const [register, { isLoading: isRegisterLoading, isSuccess: isRegisterSuccess }] = useRegisterMutation()
  const { successNoti } = useToast()

  const onRegister = async (params: IRegisterRequest) => {
    try {
      await register(params).unwrap()
      form.resetFields()
      successNoti('Register success!')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Register error:', error)
    }
  }

  return {
    isRegisterLoading,
    isRegisterSuccess,
    onRegister,
  }
}

export default useRegister
