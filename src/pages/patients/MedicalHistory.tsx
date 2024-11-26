import { MedicalHistoryEntry } from '@/components/MedicalHistoryEntry'

// This would typically come from an API or database
const medicalHistoryData = [
  {
    id: 1,
    date: '2023-05-15',
    doctor: 'Smith',
    diagnosis: 'Common Cold',
    prescription: 'Rest, fluids, and over-the-counter cold medicine',
  },
  {
    id: 2,
    date: '2023-03-22',
    doctor: 'Johnson',
    diagnosis: 'Sprained Ankle',
    prescription: 'RICE (Rest, Ice, Compression, Elevation) and pain relievers',
  },
  {
    id: 3,
    date: '2022-11-10',
    doctor: 'Williams',
    diagnosis: 'Migraine',
    prescription: 'Sumatriptan 50mg as needed, avoid triggers',
  },
]

export const MedicalHistory = () => {
  return (
    <div className='min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8 text-center'>Medical History</h1>
        <div className='space-y-6'>
          {medicalHistoryData.map((entry) => (
            <MedicalHistoryEntry
              key={entry.id}
              date={entry.date}
              doctor={entry.doctor}
              diagnosis={entry.diagnosis}
              prescription={entry.prescription}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MedicalHistory
