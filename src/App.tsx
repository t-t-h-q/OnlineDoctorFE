import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import router from '@/routers'
import Loading from '@/components/commons/Loading'
import useProfile from '@/hooks/useProfile'
import { useAppSelector } from '@/store/hooks'

function App() {
  const { fetchProfile } = useProfile()
  const isHasProfile: boolean = useAppSelector((state) => !!state.auth.currentUser)

  useEffect(() => {
    if (isHasProfile) return
    fetchProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <RouterProvider router={router} fallbackElement={<Loading />} />
      <ToastContainer />
    </>
  )
}

export default App
