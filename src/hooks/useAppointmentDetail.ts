import { useLazyGetAppointmentsDetailQuery } from '@/services/appointments'

//TODO: delete when have api
const mockAppointmentDetail = {
  id: 'AP001',
  doctorName: 'BS. Nguyễn Văn An',
  speciality: 'Nội Khoa',
  date: '15/03/2024',
  time: {
    start_time: '10:30',
    end_time: '12:00',
  },
  notes: 'Khám tổng quát định kỳ, kiểm tra huyết áp',
  prescription: {
    id: '123abc',
    hasFile: true,
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
