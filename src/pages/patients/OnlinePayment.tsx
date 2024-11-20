import { useEffect, useState } from 'react'
import type { FormProps } from 'antd'
import { Button, DatePicker, Form, Input } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCcMastercard, faCcPaypal, faCcVisa } from '@fortawesome/free-brands-svg-icons'

import { formatCurrency } from '@/utils/format'

export interface IPaymentRequest {
  cardName: string
  cardNumber: string
  cardExpiration: string
  cardCvv: string
}

const OnlinePayment = () => {
  const [price, setPrice] = useState<number>(0)
  const [saving, setSaving] = useState<number>(0)
  const [pickup, setPickup] = useState<number>(0)
  const [tax, setTax] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)

  const onFinish: FormProps<IPaymentRequest>['onFinish'] = (values) => {
    // eslint-disable-next-line no-console
    console.log('pay ment onFinish', values)
  }

  // initial value to test
  useEffect(() => {
    setPrice(1000)
    setSaving(100)
    setPickup(100)
    setTax(100)
  }, [])

  useEffect(() => {
    setTotal(price - saving + pickup + tax)
  }, [price, saving, pickup, tax])

  return (
    <section className='bg-white py-8 antialiased dark:bg-gray-900 md:py-16'>
      <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
        <div className='mx-auto max-w-5xl'>
          <h2 className='text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl'>Payment</h2>

          <div className='mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12'>
            <Form
              name='login'
              onFinish={onFinish}
              autoComplete='off'
              layout='vertical'
              className='w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8'
            >
              <div className='mb-6 grid grid-cols-2 gap-4'>
                <Form.Item<IPaymentRequest>
                  label='Full name (as displayed on card)'
                  name='cardName'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your name card!',
                    },
                  ]}
                >
                  <Input size='large' placeholder='Enter your name card' className='w-full' />
                </Form.Item>

                <Form.Item<IPaymentRequest>
                  label='Card number'
                  name='cardNumber'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your card number!',
                    },
                    {
                      pattern: /^4[0-9]{12}(?:[0-9]{3})?$/,
                      message: 'Please input your card number correct!',
                    },
                  ]}
                >
                  <Input size='large' placeholder='xxxx-xxxx-xxxx-xxxx' className='w-full' />
                </Form.Item>

                <Form.Item<IPaymentRequest>
                  label='Card Expiration'
                  name='cardExpiration'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your card expiration!',
                    },
                  ]}
                >
                  <DatePicker
                    format={{
                      format: 'YYYY/MM',
                      type: 'mask',
                    }}
                    picker='month'
                    className='w-full'
                  />
                </Form.Item>

                <Form.Item<IPaymentRequest>
                  label='CVV'
                  name='cardCvv'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your card number!',
                    },
                  ]}
                >
                  <Input.Password size='large' placeholder='Enter your CVV' />
                </Form.Item>
              </div>

              <div className='flex gap-10 md:flex-row flex-col'>
                <Button type='primary' htmlType='submit' block className='py-5 rounded-3xl'>
                  Pay now
                </Button>
                <Button variant='solid' color='danger' block className='py-5 rounded-3xl'>
                  Cancel
                </Button>
              </div>
            </Form>

            <div className='mt-6 grow sm:mt-8 lg:mt-0'>
              <div className='space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800'>
                <div className='space-y-2'>
                  <dl className='flex items-center justify-between gap-4'>
                    <dt className='text-base font-normal text-gray-500 dark:text-gray-400'>Original price</dt>
                    <dd className='text-base font-medium text-gray-900 dark:text-white'>{formatCurrency(price)}</dd>
                  </dl>

                  <dl className='flex items-center justify-between gap-4'>
                    <dt className='text-base font-normal text-gray-500 dark:text-gray-400'>Savings</dt>
                    <dd className='text-base font-medium text-green-500'>-{formatCurrency(saving)}</dd>
                  </dl>

                  <dl className='flex items-center justify-between gap-4'>
                    <dt className='text-base font-normal text-gray-500 dark:text-gray-400'>Store Pickup</dt>
                    <dd className='text-base font-medium text-gray-900 dark:text-white'>{formatCurrency(pickup)}</dd>
                  </dl>

                  <dl className='flex items-center justify-between gap-4'>
                    <dt className='text-base font-normal text-gray-500 dark:text-gray-400'>Tax</dt>
                    <dd className='text-base font-medium text-gray-900 dark:text-white'>{formatCurrency(tax)}</dd>
                  </dl>
                </div>

                <dl className='flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700'>
                  <dt className='text-base font-bold text-gray-900 dark:text-white'>Total</dt>
                  <dd className='text-base font-bold text-gray-900 dark:text-white'>{formatCurrency(total)}</dd>
                </dl>
              </div>

              <div className='mt-6 flex items-center justify-center gap-8'>
                <FontAwesomeIcon icon={faCcPaypal} className='h-8' />
                <FontAwesomeIcon icon={faCcVisa} className='h-8' />
                <FontAwesomeIcon icon={faCcMastercard} className='h-8' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OnlinePayment
