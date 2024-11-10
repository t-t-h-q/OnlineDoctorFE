// hooks/usePagination.ts
import { useState, useMemo } from 'react'
import { PAGINATION } from 'constants/pagination'

interface UsePaginationProps<T> {
  data: T[]
  pageSize?: number
  defaultCurrentPage?: number
}

interface UsePaginationReturn<T> {
  currentPage: number
  setCurrentPage: (page: number) => void
  currentData: T[]
  totalItems: number
  handlePageChange: (page: number) => void
}

const usePagination = <T>({
  data,
  pageSize = PAGINATION.DEFAULT_PAGE_SIZE,
  defaultCurrentPage = PAGINATION.DEFAULT_CURRENT_PAGE,
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage)

  const totalItems = data.length

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return data.slice(startIndex, endIndex)
  }, [data, currentPage, pageSize])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return {
    currentPage,
    setCurrentPage,
    currentData,
    totalItems,
    handlePageChange,
  }
}

export default usePagination
