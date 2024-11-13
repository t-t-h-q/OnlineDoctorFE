import { Input, Button, Form, Typography, Switch, Select } from 'antd'
import { useQueryDoctors } from '../../../../hooks/useQueryDoctors'
import { useMemo, useState } from 'react'
import DoctorList from '../../../../components/DoctorList'
import DoctorTable from '../../../../components/DoctorTable'
import { useConfig } from '../../../../hooks/useConfig'
import { debounce } from 'lodash'

const { Option } = Select

interface IStep1SelectDoctorProps {
  onNext: () => void
}

const Step1SelectDoctor = ({ onNext }: IStep1SelectDoctorProps) => {
  const [isGridView, setIsGridView] = useState(true)
  const [nameQuery, setNameQuery] = useState('')
  const { specialties } = useConfig()

  const {
    doctors,
    isLoading,
    handleDoctorSelect,
    selectedDoctor,
    setSortOption,
    setSearchQuery,
    selectedSpecialty,
    setSelectedSpecialty,
  } = useQueryDoctors()

  const handleTableChange = (pagination, _, sorter) => {
    setSortOption(sorter)
  }
  const debouncedSetSearchQuery = useMemo(() => debounce((value) => setSearchQuery(value), 500), [setSearchQuery])

  const handleSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNameQuery(value)
    debouncedSetSearchQuery(value)
  }

  return (
    <div>
      <Typography.Title level={2}>Select Doctor</Typography.Title>
      <Form>
        <Form.Item label='Search'>
          <Input placeholder='Name' value={nameQuery} onChange={handleSearchName} />
        </Form.Item>
        <Form.Item label='Specialty'>
          <Select
            placeholder='Select a specialty'
            value={selectedSpecialty}
            onChange={(value) => setSelectedSpecialty(value)}
            allowClear
          >
            {specialties.map((specialty) => (
              <Option key={specialty} value={specialty}>
                {specialty}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='Display Mode'>
          <Switch
            checkedChildren='Grid'
            unCheckedChildren='Table'
            checked={isGridView}
            onChange={() => setIsGridView(!isGridView)}
          />
        </Form.Item>
      </Form>
      {isGridView ? (
        <DoctorList
          isLoading={isLoading}
          doctors={doctors}
          onDoctorSelect={handleDoctorSelect}
          selectedDoctor={selectedDoctor}
        />
      ) : (
        <DoctorTable
          doctors={doctors}
          isLoading={isLoading}
          onDoctorSelect={handleDoctorSelect}
          onTableChange={handleTableChange}
        />
      )}
      <Button type='primary' onClick={onNext} className='mt-4' disabled={!selectedDoctor}>
        Next
      </Button>
    </div>
  )
}

export default Step1SelectDoctor
