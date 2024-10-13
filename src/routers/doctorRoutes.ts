import { redirect } from 'react-router-dom'
import { AUTH_DOCTOR_COOKIE_NAME } from '../constants/auth'

const authenticatedDoctorLoader = async () => {
  // TODO: add authenticatedDoctorLoader to the router
  const isDoctorAuthenticated = document.cookie.includes(AUTH_DOCTOR_COOKIE_NAME)

  if (!isDoctorAuthenticated) {
    return redirect('/login')
  }

  return null
}

const doctorRoutes = [
  {
    path: '/doctors',
    loader: authenticatedDoctorLoader,
    async lazy() {
      const DoctorLayout = await import('../layouts/DoctorLayout')
      return { Component: DoctorLayout.default }
    },
    children: [
      {
        index: true,
        async lazy() {
          const ConsultationSchedule = await import('../pages/doctors/ConsultationSchedule')
          return { Component: ConsultationSchedule.default }
        },
      },
      {
        path: 'detail',
        async lazy() {
          const DoctorRegistration = await import('../pages/doctors/Detail')
          return { Component: DoctorRegistration.default }
        },
      },
      {
        path: 'manage-appointments',
        children: [
          {
            path: '',
            async lazy() {
              const DoctorAppointmentManagement = await import('../pages/doctors/AppointmentManagement')
              return { Component: DoctorAppointmentManagement.default }
            },
          },
          {
            path: ':id',
            async lazy() {
              const DoctorAppointmentDetail = await import('../pages/doctors/AppointmentDetail')
              return { Component: DoctorAppointmentDetail.default }
            },
          },
        ],
      },
      {
        path: 'prescription',
        async lazy() {
          const PrescriptionWriting = await import('../pages/doctors/PrescriptionWriting')
          return { Component: PrescriptionWriting.default }
        },
      },
      {
        path: 'setings',
        async lazy() {
          const DoctorSettings = await import('../pages/doctors/Settings')
          return { Component: DoctorSettings.default }
        },
      },
    ],
  },
]

export default doctorRoutes
