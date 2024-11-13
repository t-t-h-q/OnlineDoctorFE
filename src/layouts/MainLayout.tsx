import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const { Content } = Layout

export const MainLayout = () => {
  return (
    <Layout className='min-h-screen flex flex-col'>
      <Header />
      <Content className='flex-grow  pt-16'>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  )
}

export default MainLayout
