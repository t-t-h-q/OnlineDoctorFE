import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import DashboardHeader from 'components/DashboardHeader'
import Sider from '@/components/Sider'

const PatientLayout: React.FC = () => {
  return (
    <Layout className='min-h-screen'>
      <Sider />
      <Layout className='bg-gray-50'>
        <DashboardHeader />
        <div className='p-6'>
          <Outlet />
        </div>
      </Layout>
    </Layout>
  )
}

export default PatientLayout
