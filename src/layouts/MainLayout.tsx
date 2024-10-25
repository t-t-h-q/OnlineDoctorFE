import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div className='h-full'>
      <Outlet />
    </div>
  )
}

export default MainLayout
