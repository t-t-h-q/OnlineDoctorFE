import React, { useCallback, useMemo } from 'react'
import { Form, Input, Select, Button, Rate } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faStethoscope, faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons'
import { ISearchDoctorParams } from '@/interfaces/doctor'
import { SPECIALTIES } from '@/constants/doctor'
import { debounce } from 'lodash'

interface DoctorSearchFormProps {
  onFinish: (values: ISearchDoctorParams) => void
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchDoctorParams>>
}

const DoctorSearchForm: React.FC<DoctorSearchFormProps> = ({ onFinish, setSearchParams }) => {
  const [form] = Form.useForm()

  // Track the form values
  const specialty = Form.useWatch('specialty', form)
  const location = Form.useWatch('location', form)
  const name = Form.useWatch('name', form)
  const rating = Form.useWatch('rating', form)

  // Check form value
  const isFormEmpty = useMemo(() => {
    return !specialty && !location && (!name || name.trim() === '') && !rating
  }, [specialty, location, name, rating])

  const handleReset = () => {
    form.resetFields()
    form.setFieldsValue({ rating: 0, showAvailableOnly: false })
  }

  const handleSubmit = (values: ISearchDoctorParams) => {
    onFinish(values)
    setSearchParams(values)
  }

  const handleRatingChange = (value: number) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      rating: value,
    }))
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleLocationChange = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchParams((prevParams) => ({
        ...prevParams,
        location: event.target.value,
      }))
    }, 300),
    [setSearchParams],
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleNameChange = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchParams((prevParams) => ({
        ...prevParams,
        name: event.target.value,
      }))
    }, 300),
    [setSearchParams],
  )

  return (
    <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
      <Form
        form={form}
        onFinish={handleSubmit}
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
              onChange={handleLocationChange}
            />
          </Form.Item>

          <Form.Item name='name' label='Doctor Name' rules={[{ required: false }]}>
            <Input
              placeholder='Search by Doctor Name'
              prefix={<FontAwesomeIcon icon={faSearch} className='text-gray-400' />}
              onChange={handleNameChange}
            />
          </Form.Item>

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
            <Rate allowHalf onChange={handleRatingChange} />
          </Form.Item>
        </div>

        <Form.Item className='mb-0 flex justify-end'>
          <Button type='default' className='mr-2' onClick={handleReset}>
            Reset
          </Button>
          <Button type='primary' htmlType='submit' icon={<FontAwesomeIcon icon={faSearch} />} disabled={isFormEmpty}>
            Search
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default DoctorSearchForm
