import { redirect } from 'react-router-dom'
import { get } from 'lodash'
import { ERoles } from '@/enums/role'
import store from '@/store'

const authenticatedDoctorLoader = async () => {
  const storeApp = store.getState()
  const roleName = get(storeApp, 'auth.currentUser.role.name', null)
  const isDoctorAuthenticated = ERoles.DOCTOR === roleName

  if (isDoctorAuthenticated) {
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
        path: 'detail/:id',
        async lazy() {
          const DoctorRegistration = await import('../pages/doctors/Detail/index')
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
        path: 'settings',
        async lazy() {
          const DoctorSettings = await import('../pages/doctors/Settings')
          return { Component: DoctorSettings.default }
        },
      },
    ],
  },
]

export default doctorRoutes
