import { useLazyGetAppointmentsDetailQuery } from '@/services/appointments'

//TODO: delete when have api
const mockAppointmentDetail = {
  id: 'AP001',
  doctorName: 'BS. Nguyễn Văn An',
  speciality: 'Nội Khoa',
  date: '15/03/2024',
  time: '10:30 Sáng',
  notes: 'Khám tổng quát định kỳ, kiểm tra huyết áp',
  prescription: {
    fileName: 'DonThuoc.pdf',
    fileUrl: '/path/to/prescription/DonThuoc.pdf',
  },
  status: 'Đã Hoàn Thành',
}
const useAppointmentDetail = () => {
  const [getAppointmentsDetail, { data = mockAppointmentDetail, isLoading: isLoadingData, isFetching }] =
    useLazyGetAppointmentsDetailQuery()

  const fetchAppointmentDetail = async (id: string) => {
    try {
      await getAppointmentsDetail(id).unwrap()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Fetch profile error:', error)
    }
  }

  return { fetchAppointmentDetail, data, isLoadingData, isFetching }
}

export default useAppointmentDetail
