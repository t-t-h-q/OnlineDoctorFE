import { Outlet } from 'react-router-dom'

export const DoctorLayout = () => {
  return (
    <div className='layout'>
      <Outlet />
    </div>
  )
}

export default DoctorLayout
