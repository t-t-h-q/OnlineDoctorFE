import React, { useEffect, useState } from 'react'
import { Button, Rate, Table, Tag } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faStethoscope, faUser } from '@fortawesome/free-solid-svg-icons'
import DoctorSearchForm from 'components/DoctorSearchForm'
import Loading from 'components/commons/Loading'
import { IDoctor, ISearchDoctorParams } from 'interfaces/doctor'
import useSearchDoctor from '@/hooks/useSearchDoctor'
import type { ColumnsType, TableProps } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'
import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'

const FindDoctors: React.FC = () => {
  const navigate = useNavigate()
  const [doctors, setDoctors] = useState<IDoctor[]>([])

  const { fetchDoctorSearchList, data, isLoadingData, isFetching } = useSearchDoctor()

  // Update doctors when data changes
  useEffect(() => {
    if (data?.data) {
      setDoctors(data.data)
    }
  }, [data])

  // Column definitions
  const columns: ColumnsType<IDoctor> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Specialty',
      dataIndex: 'specialty',
      key: 'specialty',
      filters: Array.from(new Set(doctors.map((d) => d.specialty))).map((specialty) => ({
        text: specialty,
        value: specialty,
      })),
      onFilter: (value, record) => record.specialty === value,
      filterMultiple: true,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => <Rate disabled defaultValue={rating} />,
      filters: [
        { text: '5', value: 5 },
        { text: '4', value: 4 },
        { text: '3', value: 3 },
        { text: '2', value: 2 },
        { text: '1', value: 1 },
      ],
      onFilter: (value, record) => record.rating == Number(value),
      filterMultiple: false,
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      key: 'availability',
      render: (availability: boolean) => (
        <Tag
          color={availability ? 'green' : 'red'}
          className='mb-4 inline-flex items-center gap-1'
          icon={<FontAwesomeIcon icon={faCalendarCheck} />}
        >
          {availability ? 'Available' : 'Not Available'}
        </Tag>
      ),
      filters: [
        { text: 'Available', value: true },
        { text: 'Not Available', value: false },
      ],
      onFilter: (value, record) => record.availability === value,
      filterMultiple: false,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type='primary'
          icon={<FontAwesomeIcon icon={faUser} />}
          onClick={() => handleOnclickViewProfile(record)}
        >
          View Profile
        </Button>
      ),
    },
  ]

  // Search doctor with params
  const handleDoctorSearch = async (params: ISearchDoctorParams) => {
    await fetchDoctorSearchList(params)
  }

  // Click to view profile
  const handleOnclickViewProfile = (record: IDoctor) => {
    const path = `/doctors/detail/${record.id}`
    navigate(path)
  }

  // TODO: handle pagination, filters, sorter, extra in table
  // Table change handler
  const handleTableChange: TableProps<IDoctor>['onChange'] = (pagination, filters, sorter, extra) => {
    // eslint-disable-next-line no-console
    console.log('Table params:', { pagination, filters, sorter, extra })
  }

  if (isLoadingData || isFetching) {
    return <Loading />
  }

  return (
    <div className='max-w-7xl mx-auto p-6'>
      {/* Page Title */}
      <div className='flex items-center gap-3 mb-8'>
        <FontAwesomeIcon icon={faStethoscope} className='text-3xl text-blue-600' />
        <h1 className='text-3xl font-bold text-gray-800'>Find Doctors</h1>
      </div>

      {/* Doctor Search */}
      <DoctorSearchForm onFinish={handleDoctorSearch} />

      {/* Table */}
      <Table
        columns={columns}
        dataSource={doctors}
        rowKey='id'
        onChange={handleTableChange}
        pagination={{
          position: ['bottomCenter'],
          total: doctors.length,
          pageSize: DEFAULT_PAGE_SIZE,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} doctors`,
        }}
      />
    </div>
  )
}

export default FindDoctors
