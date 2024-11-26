import { Navigate, redirect } from 'react-router-dom'
import { get } from 'lodash'
import store from '@/store'
import { ERoles } from '@/enums/role'
import { PATIENT_PATHS } from '@/constants/routeNames'

const authenticatedPatientLoader = async () => {
  const storeApp = store.getState()
  const roleId = get(storeApp, 'auth.currentUser.role.name', null)
  const isPatientAuthenticated = ERoles.PATIENT === roleId
  const isProfileLoading = get(storeApp, 'auth.isProfileLoading', null)

  if (!isProfileLoading && !isPatientAuthenticated) {
    return redirect('/login')
  }

  return null
}

const patientRoutes = [
  {
    path: PATIENT_PATHS.BASE,
    loader: authenticatedPatientLoader,
    async lazy() {
      const PatientLayout = await import('../layouts/PatientLayout')
      return { Component: PatientLayout.default }
    },
    children: [
      {
        index: true,
        element: <Navigate to={PATIENT_PATHS.APPOINTMENT_BOOKING} />,
      },
      {
        path: PATIENT_PATHS.APPOINTMENT_BOOKING,
        async lazy() {
          const AppointmentBooking = await import('../pages/patients/AppointmentBooking')
          return { Component: AppointmentBooking.default }
        },
      },
      {
        path: PATIENT_PATHS.FIND_DOCTORS,
        async lazy() {
          const FindDoctors = await import('../pages/patients/FindDoctors')
          return { Component: FindDoctors.default }
        },
      },

      {
        path: PATIENT_PATHS.MANAGE_APPOINTMENTS,
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
        path: PATIENT_PATHS.ONLINE_PAYMENT,
        async lazy() {
          const OnlinePayment = await import('../pages/patients/OnlinePayment')
          return { Component: OnlinePayment.default }
        },
      },
      {
        path: PATIENT_PATHS.SETTINGS,
        async lazy() {
          const Settings = await import('../pages/patients/Settings')
          return { Component: Settings.default }
        },
      },
    ],
  },
]

export default patientRoutes
