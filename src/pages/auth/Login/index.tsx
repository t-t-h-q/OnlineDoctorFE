import React from 'react'
import type { FormProps } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

import { EMAIL_REGEX } from '@/constants/regex'
import useLogin from './hooks/useLogin'
import { ILoginRequest } from '@/interfaces/auth'
import { COMMON_PATHS } from '@/constants/routeNames'

interface ILoginForm extends ILoginRequest {
  remember: boolean
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { isLoginLoading, onLogin } = useLogin()

  const onFinish: FormProps<ILoginForm>['onFinish'] = (values) => {
    const { email, password } = values
    onLogin({ email, password })
  }

  return (
    <div className='auth-wrapper'>
      <div className='bg-white px-10 py-16 rounded-md w-full max-w-[600px]'>
        <Form
          name='basic'
          initialValues={{ remember: true, email: 'vuquangit@gmail.com', password: 'Quang@123' }}
          onFinish={onFinish}
          autoComplete='off'
          layout='vertical'
        >
          <h1 className='text-3xl font-bold mb-5 text-center'>Login</h1>
          <Form.Item<ILoginForm>
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

          <Form.Item<ILoginForm>
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

          <div className='flex justify-between'>
            <Form.Item<ILoginForm> name='remember' valuePropName='checked'>
              <Checkbox className='whitespace-nowrap'>Remember me</Checkbox>
            </Form.Item>

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
              Submit
            </Button>
          </Form.Item>

          <div className='mt-10 text-center'>
            <Button type='link' onClick={() => navigate(COMMON_PATHS.REGISTER.PATIENT)} disabled={isLoginLoading}>
              Create your Account as Patient
            </Button>
            <Button type='link' onClick={() => navigate(COMMON_PATHS.REGISTER.DOCTOR)} disabled={isLoginLoading}>
              Create your Account as Doctor
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login
