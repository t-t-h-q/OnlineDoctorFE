import { redirect } from 'react-router-dom'
import { get } from 'lodash'
import store from '@/store'
import { ERoles } from '@/enums/role'

const authenticatedPatientLoader = async () => {
  const storeApp = store.getState()
  const roleId = get(storeApp, 'auth.currentUser.role.id', null)
  const isPatientAuthenticated = ERoles.PATIENT === roleId

  if (!isPatientAuthenticated) {
    return redirect('/login')
  }

  return null
}

const patientRoutes = [
  {
    path: '/patients',
    loader: authenticatedPatientLoader,
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
