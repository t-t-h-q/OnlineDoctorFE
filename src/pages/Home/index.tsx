import React from 'react'
import { Layout } from 'antd'
import Header from 'components/Header'
import HomeContent from 'components/HomeContent'
import Footer from 'components/Footer'

const HomePage: React.FC = () => {
  return (
    <Layout className='min-h-screen'>
      <Header />
      <HomeContent />
      <Footer />
    </Layout>
  )
}

export default HomePage
