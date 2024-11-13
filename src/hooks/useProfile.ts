import { STORAGE_KEYS } from '@/constants/storageKeys'
import StorageService from '@/services/localStorage'
import { useLazyGetProfileQuery } from '@/services/auth'

const useProfile = () => {
  const [getProfile] = useLazyGetProfileQuery()

  const fetchProfile = async () => {
    const tokens = StorageService.get(STORAGE_KEYS.AUTH_PROFILE)?.accessToken
    if (!tokens) return

    try {
      await getProfile().unwrap()
    } catch (error) {
       
      console.log('Fetch profile error:', error)
    }
  }

  return { fetchProfile }
}

export default useProfile
