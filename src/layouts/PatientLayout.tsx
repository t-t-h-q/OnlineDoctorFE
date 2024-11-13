import { Row, Col } from 'antd'
import { Outlet } from 'react-router-dom'

export const PatientLayout = () => {
  return (
    <Row justify='center' align='middle' className='bg-white'>
      <Col xs={24} lg={20} xl={16} className='p-8'>
        <Outlet />
      </Col>
    </Row>
  )
}

export default PatientLayout
