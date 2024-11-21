
export interface MedicalHistoryEntryProps {
  date: string
  doctor: string
  diagnosis: string
  prescription: string
}

export const MedicalHistoryEntry: React.FC<MedicalHistoryEntryProps> = ({
  date,
  doctor,
  diagnosis,
  prescription,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{date}</h3>
        <p className="text-md text-gray-600">Dr. {doctor}</p>
      </div>
      <div className="mb-4">
        <h4 className="text-md font-medium text-gray-700 mb-2">Diagnosis:</h4>
        <p className="text-gray-600">{diagnosis}</p>
      </div>
      <div>
        <h4 className="text-md font-medium text-gray-700 mb-2">Prescription:</h4>
        <p className="text-gray-600">{prescription}</p>
      </div>
    </div>
  )
}

