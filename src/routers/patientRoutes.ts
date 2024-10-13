import { redirect } from 'react-router-dom'
import { AUTH_PATIENT_COOKIE_NAME } from '../constants/auth'

const authenticatedPatientLoader = async () => {
  // TODO: add isPatientAuthenticated to the router
  const isPatientAuthenticated = !document.cookie.includes(AUTH_PATIENT_COOKIE_NAME)
  if (!isPatientAuthenticated) {
    return redirect('/login')
  }

  return null
}

const patientRoutes = [
  {
    path: '/patients',
    loadder: authenticatedPatientLoader,
    async lazy() {
      const PatientLayout = await import('../layouts/PatientLayout')
      return { Component: PatientLayout.default }
    },
    children: [
      {
        index: true,
        async lazy() {
          const AppointmentBooking = await import('../pages/patients/AppointmentBooking')
          return { Component: AppointmentBooking.default }
        },
      },
      {
        path: 'manage-appointments',
        children: [
          {
            path: '',
            async lazy() {
              const AppointmentManagement = await import('../pages/patients/AppointmentManagement')
              return { Component: AppointmentManagement.default }
            },
          },
          {
            path: ':id',
            async lazy() {
              const AppointmentManagement = await import('../pages/patients/AppointmentDetail')
              return { Component: AppointmentManagement.default }
            },
          },
        ],
      },
      {
        path: 'online-payment',
        async lazy() {
          const OnlinePayment = await import('../pages/patients/OnlinePayment')
          return { Component: OnlinePayment.default }
        },
      },
      {
        path: 'settings',
        async lazy() {
          const Settings = await import('../pages/patients/Settings')
          return { Component: Settings.default }
        },
      },
    ],
  },
]

export default patientRoutes