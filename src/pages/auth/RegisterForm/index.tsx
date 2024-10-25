import React from 'react'
import type { FormProps } from 'antd'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

import AuthLayout from '@/layouts/AuthLayout'
import { EMAIL_REGEX } from '@/constants/regex'
import { IRegisterRequest } from '@/interfaces/auth'
import useRegister from './hooks/useRegister'
import { ERoles } from '@/enums/role'

interface IRegisterForm extends IRegisterRequest {
  confirmPassword: string
}

type RegisterFormProps = {
  isDoctor?: boolean
}

const RegisterForm: React.FC<RegisterFormProps> = ({ isDoctor = false }) => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { isRegisterLoading, isRegisterSuccess, onRegister } = useRegister(form)

  const onFinish: FormProps<IRegisterForm>['onFinish'] = async (values) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registerParams } = values
    // TODO: check role
    if (isDoctor) {
      registerParams.role = ERoles.DOCTOR
    } else {
      registerParams.role = ERoles.PATIENT
    }
    await onRegister(registerParams)
  }

  return (
    <AuthLayout>
      <h1 className='text-3xl font-bold mb-5 text-center'>{isDoctor ? 'Doctor Register' : 'Patient Register'}</h1>

      {isRegisterSuccess ? (
        <div className='flex flex-col items-center justify-center h-full'>
          <p className='font-bold mb-10 text-center'>Register success!</p>
          <Button type='primary' onClick={() => navigate('/login')}>
            Back to Login
          </Button>
        </div>
      ) : (
        <Form form={form} name='basic' onFinish={onFinish} autoComplete='off' layout='vertical'>
          <Form.Item<IRegisterForm>
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

          <Form.Item<IRegisterForm>
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

          <Form.Item
            name='confirmPassword'
            label='Confirm Password'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'))
                },
              }),
            ]}
          >
            <Input.Password size='large' placeholder='Enter your password' />
          </Form.Item>

          <div className='flex gap-4'>
            <Form.Item<IRegisterForm>
              label='First Name'
              name='firstName'
              rules={[
                {
                  required: true,
                  message: 'Please input your first name!',
                },
              ]}
            >
              <Input size='large' placeholder='Enter your first name' className='w-full' />
            </Form.Item>

            <Form.Item<IRegisterForm>
              label='Last Name'
              name='lastName'
              rules={[
                {
                  required: true,
                  message: 'Please input your last name!',
                },
              ]}
              className='flex-1'
            >
              <Input size='large' placeholder='Enter your last name' className='w-full' />
            </Form.Item>
          </div>

          <Form.Item name='phone' label='Phone Number'>
            <Input size='large' placeholder='Enter your phone number' />
          </Form.Item>

          {isDoctor && (
            <>
              <Form.Item
                name='specialization'
                label='Specialization'
                rules={[{ required: true, message: 'Please input your specialization!' }]}
              >
                <Input size='large' placeholder='Enter your specialization' />
              </Form.Item>

              <Form.Item
                name='license'
                label='License Number'
                rules={[{ required: true, message: 'Please input your license number!' }]}
              >
                <Input size='large' placeholder='Enter your license number' />
              </Form.Item>
            </>
          )}

          <Form.Item className='mt-5'>
            <Button
              type='primary'
              htmlType='submit'
              block
              className='py-5 rounded-3xl'
              loading={isRegisterLoading}
              size='large'
              disabled={isRegisterLoading}
            >
              Submit
            </Button>
          </Form.Item>

          <div className='mt-10 text-center'>
            <Button type='link' onClick={() => navigate('/login')} disabled={isRegisterLoading}>
              Already have an account? Login
            </Button>
          </div>
        </Form>
      )}
    </AuthLayout>
  )
}

export default RegisterForm
