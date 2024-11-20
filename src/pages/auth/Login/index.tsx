import React, { useEffect } from 'react'
import type { FormProps } from 'antd'
import { Button, Form, Input } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

import AuthLayout from '@/layouts/AuthLayout'
import { EMAIL_REGEX } from '@/constants/regex'
import { ILoginRequest } from '@/interfaces/auth'
import { COMMON_PATHS } from '@/constants/routeNames'
import useLogin from '@/hooks/useLogin'
import { getRolePath } from '@/utils/rolePath'
import { useAuth } from '@/hooks/useAuth'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { isLoginLoading, onLogin } = useLogin()
  const { currentUser } = useAuth()
  const location = useLocation()

  const onFinish: FormProps<ILoginRequest>['onFinish'] = (values) => {
    const { email, password } = values
    onLogin({ email, password })
  }
  // Redirect if user is already logged in
  useEffect(() => {
    if (currentUser?.role && location.pathname === COMMON_PATHS.LOGIN.user) {
      const pathToRedirect = getRolePath(currentUser.role.name)
      navigate(pathToRedirect)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  return (
    <AuthLayout>
      <Form name='login' onFinish={onFinish} autoComplete='off' layout='vertical'>
        <h1 className='text-3xl font-bold mb-5 text-center'>Login</h1>
        <Form.Item<ILoginRequest>
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              pattern: EMAIL_REGEX,
              message: 'Email is not valid!',
            },
          ]}
        >
          <Input size='large' placeholder='Enter your email' className='w-full' />
        </Form.Item>

        <Form.Item<ILoginRequest>
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password size='large' placeholder='Enter your password' />
        </Form.Item>

        <div className='flex justify-end -mt-5 mb-5'>
          <div>
            <Button type='link' block onClick={() => navigate('/reset-password')}>
              Forgot Password
            </Button>
          </div>
        </div>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            block
            className='py-5 rounded-3xl'
            disabled={isLoginLoading}
            loading={isLoginLoading}
          >
            Login
          </Button>
        </Form.Item>

        <div className='flex flex-col mt-10 text-center'>
          <Button type='link' onClick={() => navigate(COMMON_PATHS.REGISTER)} disabled={isLoginLoading}>
            Create your account
          </Button>
        </div>
      </Form>
    </AuthLayout>
  )
}

export default Login
