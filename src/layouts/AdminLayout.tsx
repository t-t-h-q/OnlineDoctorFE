import { Outlet } from 'react-router-dom'

export const AdminLayout = () => {
  return (
    <div className='layout'>
      <Outlet />
    </div>
  )
}

export default AdminLayout
