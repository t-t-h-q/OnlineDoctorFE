import { toast, ToastOptions } from 'react-toastify'

export function useToast(defaultOptions: ToastOptions<unknown> = { theme: 'dark' }) {
  const successNoti = (data: string) => toast(data, { ...defaultOptions, type: 'success' })

  const errorNoti = (data: string, options?: ToastOptions<unknown>) =>
    toast(data, { ...defaultOptions, ...options, type: 'error' })

  const infoNoti = (data: string, options?: ToastOptions<unknown>) =>
    toast(data, { ...defaultOptions, ...options, type: 'info' })

  return { successNoti, errorNoti, infoNoti }
}
