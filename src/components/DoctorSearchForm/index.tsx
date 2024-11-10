import React from 'react'
import { Form, Input, Select, Button, Rate, Space, Switch } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faStethoscope, faLocationDot, faStar, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { ISearchDoctorParams } from '@/interfaces/doctor'
import { SPECIALTIES } from '@/constants/doctor'

interface DoctorSearchFormProps {
  onFinish: (values: ISearchDoctorParams) => void
}

const DoctorSearchForm: React.FC<DoctorSearchFormProps> = ({ onFinish }) => {
  const [form] = Form.useForm()

  const handleReset = () => {
    form.resetFields()
    form.setFieldsValue({ rating: 0, showAvailableOnly: false })
  }

  return (
    <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
      <Form
        form={form}
        onFinish={onFinish}
        layout='vertical'
        initialValues={{
          rating: 0,
          showAvailableOnly: false,
        }}
      >
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
          <Form.Item
            name='specialty'
            label='Specialty'
            rules={[{ required: false, message: 'Please select a specialty' }]}
          >
            <Select
              placeholder='Select Specialty'
              className='w-full'
              options={SPECIALTIES.map((specialty) => ({
                value: specialty,
                label: specialty,
              }))}
              allowClear
              suffixIcon={<FontAwesomeIcon icon={faStethoscope} className='text-gray-400' />}
            />
          </Form.Item>

          <Form.Item name='location' label='Location' rules={[{ required: false, message: 'Please enter a location' }]}>
            <Input
              placeholder='Enter Location'
              prefix={<FontAwesomeIcon icon={faLocationDot} className='text-gray-400' />}
            />
          </Form.Item>

          <Form.Item name='name' label='Doctor Name' rules={[{ required: false }]}>
            <Input
              placeholder='Search by Doctor Name'
              prefix={<FontAwesomeIcon icon={faSearch} className='text-gray-400' />}
            />
          </Form.Item>
        </div>

        <div className='flex flex-wrap gap-6 items-center mb-6'>
          <Form.Item
            name='rating'
            label={
              <span className='text-gray-700 flex items-center gap-2'>
                <FontAwesomeIcon icon={faStar} className='text-yellow-400' />
                Minimum Rating
              </span>
            }
            className='mb-0'
          >
            <Rate allowHalf />
          </Form.Item>

          <Form.Item name='showAvailableOnly' valuePropName='checked' className='mb-0'>
            <Switch
              checkedChildren={
                <Space>
                  <FontAwesomeIcon icon={faCalendarCheck} />
                  Available Only
                </Space>
              }
              unCheckedChildren={
                <Space>
                  <FontAwesomeIcon icon={faCalendarCheck} />
                  All
                </Space>
              }
            />
          </Form.Item>
        </div>

        <Form.Item className='mb-0 flex justify-end'>
          <Button type='default' className='mr-2' onClick={handleReset}>
            Reset
          </Button>
          <Button type='primary' htmlType='submit' icon={<FontAwesomeIcon icon={faSearch} />}>
            Search
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default DoctorSearchForm
