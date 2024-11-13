import React, { useState } from 'react'
import { Steps } from 'antd'
import Step1SelectDoctor from './Step1SelectDoctor'
import Step2SelectTime from './Step2SelectTime'
import Step3PatientInfo from './Step3PatientInfo'
import Step4Confirm from './Step4Confirm'

const AppointmentScheduler: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0)

  const next = () => setCurrentStep(currentStep + 1)
  const prev = () => setCurrentStep(currentStep - 1)

  const steps = [
    {
      title: 'Select Doctor',
      content: <Step1SelectDoctor onNext={next} />,
    },
    {
      title: 'Time',
      content: <Step2SelectTime onNext={next} onPrevious={prev} />,
    },
    {
      title: 'Information',
      content: <Step3PatientInfo onNext={next} onPrevious={prev} />,
    },
    {
      title: 'Confirm',
      content: <Step4Confirm onPrevious={prev} />,
    },
  ]

  return (
    <div className='p-4'>
      <Steps current={currentStep} items={steps} />
      <div className='mt-4 p-4'>{steps[currentStep].content}</div>
    </div>
  )
}

export default AppointmentScheduler
