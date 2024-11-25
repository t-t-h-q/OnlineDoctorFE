import { useLazyGetPrescriptionsDetailQuery } from '@/services/prescription'

//TODO: delete when have api
const prescriptionFakeData = [
  {
    name: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'Twice daily after meals',
  },
  {
    name: 'Ibuprofen',
    dosage: '400mg',
    frequency: 'Every 6 hours as needed',
  },
  {
    name: 'Metformin',
    dosage: '850mg',
    frequency: 'Once daily with breakfast',
  },
]
const usePrescriptionDetail = () => {
  const [getPrescriptionsDetail, { data = prescriptionFakeData, isLoading: isLoadingData, isFetching }] =
    useLazyGetPrescriptionsDetailQuery()

  const fetchPrescriptionDetail = async (id: string) => {
    try {
      await getPrescriptionsDetail(id).unwrap()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Fetch profile error:', error)
    }
  }

  return { fetchPrescriptionDetail, data, isLoadingData, isFetching }
}

export default usePrescriptionDetail
