import React, { useEffect, useState } from 'react'
import { Button, Rate, Table, Avatar } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStethoscope, faUser } from '@fortawesome/free-solid-svg-icons'
import DoctorSearchForm from 'components/DoctorSearchForm'
import { IDoctor, IRatings, ISearchDoctorParams, ISearchDoctorResponse } from 'interfaces/doctor'
import useSearchDoctor from '@/hooks/useSearchDoctor'
import type { ColumnsType, TableProps } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'
import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'

type IDoctorTableRecord = Pick<IDoctor, 'id' | 'name' | 'specialties' | 'avatar' | 'location' | 'ratings'>

const FindDoctors: React.FC = () => {
  const navigate = useNavigate()
  const [doctors, setDoctors] = useState<ISearchDoctorResponse>()

  const { fetchDoctorSearchList, data, isLoadingData, isFetching } = useSearchDoctor()

  const [searchParams, setSearchParams] = useState<ISearchDoctorParams>({
    page: 1,
    specialty: undefined,
    location: undefined,
    name: undefined,
    rating: undefined,
  })

  // Update doctors when data changes
  useEffect(() => {
    if (data) {
      setDoctors(data)
    }
  }, [data])

  // Column definitions
  const columns: ColumnsType<IDoctorTableRecord> = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string) => <Avatar src={avatar} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Specialties',
      dataIndex: 'specialties',
      key: 'specialties',
      sorter: true,
    },
    {
      title: 'Ratings',
      dataIndex: 'ratings',
      key: 'ratings',
      render: (rating: IRatings) => <Rate disabled defaultValue={rating.average_rating} />,
      sorter: true,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (location) => location.address,
      sorter: true,
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
  const handleOnclickViewProfile = (record: IDoctorTableRecord) => {
    const path = `/doctors/detail/${record.id}`
    navigate(path)
  }

  // TODO: handle pagination, filters, sorter, extra in table then call api and update data list
  // Table change handler
  const handleTableChange: TableProps<IDoctorTableRecord>['onChange'] = (pagination, filters, sorter, extra) => {
    // eslint-disable-next-line no-console
    console.log('Table params:', { pagination, filters, sorter, extra }, searchParams)
  }

  return (
    <div className='max-w-7xl mx-auto p-6'>
      {/* Page Title */}
      <div className='flex items-center gap-3 mb-8'>
        <FontAwesomeIcon icon={faStethoscope} className='text-3xl text-blue-600' />
        <h1 className='text-3xl font-bold text-gray-800'>Find Doctors</h1>
      </div>

      {/* Doctor Search */}
      <DoctorSearchForm onFinish={handleDoctorSearch} setSearchParams={setSearchParams} />

      {/* Table */}
      <Table
        columns={columns}
        dataSource={doctors?.data}
        rowKey='id'
        onChange={handleTableChange}
        loading={isLoadingData || isFetching}
        pagination={{
          position: ['bottomCenter'],
          current: 1,
          total: doctors?.totalItems,
          pageSize: DEFAULT_PAGE_SIZE,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} doctors`,
        }}
      />
    </div>
  )
}

export default FindDoctors
