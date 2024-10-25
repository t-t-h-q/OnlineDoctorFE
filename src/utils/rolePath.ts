import { ERoles } from "@/enums/role"
import { ADMIN_ROUTES, DOCTOR_PATHS, PATIENT_PATHS } from '@/constants/routeNames'

export const getRolePath = (roleName: string) => {
  let path = null

  switch (roleName) {
    case ERoles.ADMIN:
      path = ADMIN_ROUTES.BASE_PATH
      break
    case ERoles.DOCTOR:
      path = DOCTOR_PATHS.BASE
      break
    case ERoles.PATIENT:
      path = PATIENT_PATHS.BASE
      break
    default:
      path = '/'
      break
  }

  return path
}
