import { createBrowserRouter } from 'react-router-dom'
import adminRoutes from './adminRoutes'
import doctorRoutes from './doctorRoutes'
import patientRoutes from './patientRoutes'

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    lazy: async () => {
      const MainLayout = await import('../layouts/MainLayout')
      return { Component: MainLayout.default }
    },
    children: [
      {
        index: true,
        async lazy() {
          const HomePage = await import('../pages/Home')
          return { Component: HomePage.default }
        },
      },
      ...adminRoutes,
      ...doctorRoutes,
      ...patientRoutes,
      {
        path: 'login',
        async lazy() {
          const PageLogin = await import('../pages/Login')
          return { Component: PageLogin.default }
        },
      },
      {
        path: '/login-admin',
        async lazy() {
          const AdminLogin = await import('../pages/admin/Login')
          return { Component: AdminLogin.default }
        },
      },
      {
        path: 'register-patient',
        async lazy() {
          const PatientRegistration = await import('../pages/patients/Registration')
          return { Component: PatientRegistration.default }
        },
      },
      {
        path: 'register-doctor',
        async lazy() {
          const DoctorRegistration = await import('../pages/doctors/Registration')
          return { Component: DoctorRegistration.default }
        },
      },
    ],
  },
  {
    path: '*',
    lazy: async () => {
      const PageNotFound = await import('../pages/Errors/PageNotFound')
      return { Component: PageNotFound.default }
    },
  },
])

export default router
