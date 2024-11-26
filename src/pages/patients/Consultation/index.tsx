import React from 'react'
import { Layout } from 'antd'
import VideoSection from '@/components/VideoSection'
import ChatSection from '@/components/ChatSection'

const { Content } = Layout

const Consultation: React.FC = () => {
  const consultationData = {
    patientId: 'default-patient',
    doctorName: 'Dr. Default',
    patientName: 'Patient Default',
  }

  return (
    <Layout className='min-h-screen bg-gray-100'>
      <Content className='p-6'>
        <div className='text-2xl font-bold mb-6'>Video Call/Chat</div>
        <div className='flex gap-6'>
          <VideoSection consultationData={consultationData} />
          <ChatSection consultationData={consultationData} />
        </div>
      </Content>
    </Layout>
  )
}

export default Consultation
