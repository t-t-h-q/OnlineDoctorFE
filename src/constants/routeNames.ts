export const COMMON_PATHS = {
  HOME: '/',
  LOGIN: {
    user: '/login',
    admin: '/login-admin',
  },
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  NOT_FOUND: '/not-found',
  REGISTER: '/register',
}

export const ADMIN_ROUTES = {
  BASE_PATH: '/admin',
  USER_MANAGEMENT_PATH: '/admin/user-management',
}

export const DOCTOR_PATHS = {
  BASE: '/doctors',
  DETAIL: '/doctors/detail',
  MANAGE_APPOINTMENTS: '/doctors/manage-appointments',
  PRESCRIPTION: '/doctors/prescription',
  SETTINGS: '/doctors/settings',
}

export const PATIENT_PATHS = {
  BASE: '/patients',
  APPOINTMENT_BOOKING: '/patients/appointment-booking',
  FIND_DOCTORS: '/patients/find-doctors',
  MANAGE_APPOINTMENTS: '/patients/manage-appointments',
  ONLINE_PAYMENT: '/patients/online-payment',
  CONSULTATION: '/patients/consultation',
  SETTINGS: '/patients/settings',
}
