import { redirect } from 'react-router-dom'
import { get } from 'lodash'
import { COMMON_PATHS } from '@/constants/routeNames'
import store from '@/store'
import { ERoles } from '@/enums/role'

const authenticatedAdminLoader = async () => {
  const storeApp = store.getState()
  const roleId = get(storeApp, 'auth.currentUser.role.id', null)
  const isAdminAuthenticated = ERoles.ADMIN === roleId

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
