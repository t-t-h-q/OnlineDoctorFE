import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div className='layout'>
      <Outlet />
    </div>
  )
}

export default MainLayout
