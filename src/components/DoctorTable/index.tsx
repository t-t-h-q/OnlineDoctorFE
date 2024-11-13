import { Table, TablePaginationConfig, TableProps } from 'antd'
import { IDoctor } from '../../interfaces/doctor'
import { FilterValue, SorterResult } from 'antd/es/table/interface'
import { useState } from 'react'
export interface IDoctorTableProps {
  doctors: IDoctor[]
  isLoading: boolean
  onDoctorSelect?: (doctor: IDoctor) => void
  onTableChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IDoctor> | SorterResult<IDoctor>[],
  ) => void
}

export const DoctorTable = ({ isLoading, doctors, onTableChange, onDoctorSelect }: IDoctorTableProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Specialty',
      dataIndex: 'specialty',
      key: 'specialty',
      sorter: true,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      sorter: true,
    },
  ]

  const handleTableChange: IDoctorTableProps['onTableChange'] = (pagination, filters, sorter) => {
    onTableChange?.(pagination, filters, sorter)
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
    if (onDoctorSelect && newSelectedRowKeys.length > 0) {
      const selectedDoctor = doctors.find((doctor) => doctor.id === newSelectedRowKeys[0])
      if (selectedDoctor) {
        onDoctorSelect(selectedDoctor)
      }
    }
  }

  const rowSelection: TableProps<IDoctor>['rowSelection'] = {
    type: 'radio',
    selectedRowKeys,
    onChange: onSelectChange,
  }

  return (
    <Table
      columns={columns}
      dataSource={doctors}
      rowKey='id'
      loading={isLoading}
      pagination={{ pageSize: 10 }}
      onChange={handleTableChange}
      rowSelection={rowSelection}
    />
  )
}

export default DoctorTable
