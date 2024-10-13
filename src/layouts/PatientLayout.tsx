import { Outlet } from 'react-router-dom'

export const PatientLayout = () => {
  return (
    <div className='layout'>
      <Outlet />
    </div>
  )
}

export default PatientLayout
