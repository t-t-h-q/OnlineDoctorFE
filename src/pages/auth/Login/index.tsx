import React from 'react'
import type { FormProps } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

import { EMAIL_REGEX } from '@/constants/regex'

type FieldType = {
  email: string
  password: string
  remember?: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    // eslint-disable-next-line no-console
    console.log('Success:', values)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo)
  }

  return (
    <div className='flex items-center justify-center flex-1'>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item<FieldType>
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              pattern: EMAIL_REGEX,
              message: '',
            },
          ]}
        >
          <Input placeholder='email' />
        </Form.Item>

        <Form.Item<FieldType>
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            }
          ]}
        >
          <Input.Password placeholder='password' />
        </Form.Item>

        <Form.Item<FieldType> name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Button type='link' onClick={() => navigate('/reset-password')} data-cy='btn-reset-password'>
          Forgot Password
        </Button>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
