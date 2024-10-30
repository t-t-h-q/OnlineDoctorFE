import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Tabs } from 'antd'

import RegisterForm from './RegisterForm'
import AuthLayout from '@/layouts/AuthLayout'

enum ERegistrationTabs {
  PATIENT = '1',
  DOCTOR = '2',
}

const Registration = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const itemsTab = [
    {
      key: ERegistrationTabs.PATIENT,
      label: 'Patient',
      children: <RegisterForm />,
      icon: '🤒', // TODO: change later
    },
    {
      key: ERegistrationTabs.DOCTOR,
      label: 'Doctor',
      children: <RegisterForm isDoctor />,
      icon: '👨‍⚕️', // TODO: change later
    },
  ]
  const [activeTab, setActiveTab] = useState<ERegistrationTabs>(() => {
    const role = searchParams.get('role')
    switch (role) {
      case ERegistrationTabs.PATIENT:
        return ERegistrationTabs.PATIENT
      case ERegistrationTabs.DOCTOR:
        return ERegistrationTabs.DOCTOR
      default:
        return ERegistrationTabs.PATIENT
    }
  })

  const onTabChange = (key: string) => {
    setActiveTab(key as ERegistrationTabs)
  }

  useEffect(() => {
    if (activeTab === ERegistrationTabs.PATIENT) {
      setSearchParams({ role: ERegistrationTabs.PATIENT })
    } else if (activeTab === ERegistrationTabs.DOCTOR) {
      setSearchParams({ role: ERegistrationTabs.DOCTOR })
    }
  }, [activeTab, setSearchParams])

  return (
    <AuthLayout>
      <h1 className='text-3xl font-bold mb-5 text-center'>{activeTab ? 'Doctor Register' : 'Patient Register'}</h1>

      <Tabs
        centered
        size='large'
        defaultActiveKey={activeTab}
        onChange={onTabChange}
        items={itemsTab.map((item) => {
          return {
            key: item.key,
            label: item.label,
            children: item.children,
            icon: item.icon,
          }
        })}
      />
    </AuthLayout>
  )
}

export default Registration
