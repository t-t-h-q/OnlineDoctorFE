import { redirect } from 'react-router-dom'
import { AUTH_ADMIN_COOKIE_NAME } from '../constants/auth'
import { COMMON_PATHS } from '../constants/routeNames'

const authenticatedAdminLoader = async () => {
  // TODO: add authenticatedDoctorLoader to the router
  const isAdminAuthenticated = document.cookie.includes(AUTH_ADMIN_COOKIE_NAME)
  if (!isAdminAuthenticated) {
    return redirect(COMMON_PATHS.LOGIN.admin)
  }

  return null
}

const adminRoutes = [
  {
    path: '/admin',
    async lazy() {
      const { AdminLayout } = await import('../layouts/AdminLayout')
      return { Component: AdminLayout }
    },
    loader: authenticatedAdminLoader,
    children: [
      {
        index: true,
        async lazy() {
          const AdminDashboard = await import('../pages/admin/Dashboard')
          return { Component: AdminDashboard.default }
        },
      },
      {
        path: 'user-management',
        async lazy() {
          const AdminUserManagement = await import('../pages/admin/UserManagement')
          return { Component: AdminUserManagement.default }
        },
      },
    ],
  },
]

export default adminRoutes
