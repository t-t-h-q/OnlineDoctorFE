import { FormInstance } from 'antd'

import { useRegisterMutation } from '@/services/auth'
import { IRegisterRequest } from '@/interfaces/auth'
import { useToast } from '@/hooks/useToast'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useRegister = (form: FormInstance<any>) => {
  const [register, { isLoading: isRegisterLoading, isSuccess: isRegisterSuccess }] = useRegisterMutation()
  const { successNoti } = useToast()

  const onRegister = async (params: IRegisterRequest, isDoctor: boolean) => {
    try {
      const response = await register(params).unwrap()
      form.resetFields()
      successNoti('Register success!')

      // TODO: continue with register doctor or patient
      if (isDoctor) {
         
        console.log('Register doctor', response)
      } else {
         
        console.log('Register patient', response)
      }
    } catch (error) {
       
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
