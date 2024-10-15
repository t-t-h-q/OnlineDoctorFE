import './App.css'
import router from './routers'
import Loading from './components/commons/Loading'
import { RouterProvider } from 'react-router-dom'

function App() {
  return <RouterProvider router={router} fallbackElement={<Loading />} />
}

export default App
