import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStethoscope } from '@fortawesome/free-solid-svg-icons'
import DoctorSearchForm from 'components/DoctorSearchForm'
import Loading from 'components/commons/Loading'
import { IDoctor, ISearchDoctorParams } from 'interfaces/doctor'
import { PAGINATION } from 'constants/pagination'
import SearchDoctorCard from 'components/SearchDoctorCard'
import useSearchDoctor from '@/hooks/useSearchDoctor'
import usePagination from '@/hooks/usePagination'

const FindDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<IDoctor[]>([])

  const { fetchDoctorSearchList, data, isLoadingData, isFetching } = useSearchDoctor()

  const {
    currentPage,
    setCurrentPage,
    currentData: currentDoctors,
    totalItems,
    handlePageChange,
  } = usePagination({
    data: doctors,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
  })

  // Update doctors when data changes
  useEffect(() => {
    if (data?.data) {
      setDoctors(data.data)
    }
  }, [data])

  const handleOnFinish = async (params: ISearchDoctorParams) => {
    await fetchDoctorSearchList(params)
    setCurrentPage(PAGINATION.DEFAULT_CURRENT_PAGE)
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
      <DoctorSearchForm onFinish={handleOnFinish} />

      {/* Doctor List */}
      <div className='space-y-4'>
        {currentDoctors?.map((doctor) => <SearchDoctorCard key={doctor.id} doctor={doctor} />)}
      </div>

      {/* Pagination */}
      {totalItems > 0 && (
        <div className='mt-8 flex justify-center'>
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={PAGINATION.DEFAULT_PAGE_SIZE}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  )
}

export default FindDoctors
