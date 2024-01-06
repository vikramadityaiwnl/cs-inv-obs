enum ToastType {
  NORMARL = '',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning'
}
const duration = 6000

const createToast = (message: string, type: ToastType) => {
  const container = document.getElementById('toast-container')
  if(!container) throw new Error('toast-container not found')

  const toast = document.createElement('div');
  toast.innerHTML = message
  toast.className = `toast toast-${type}`
  container.appendChild(toast)

  setTimeout(() => {
    container.removeChild(toast)
  }, duration)
}

export const toast = (message: string) => createToast(message, ToastType.NORMARL)
toast.success = (message: string) => createToast(message, ToastType.SUCCESS)
toast.error = (message: string) => createToast(message, ToastType.ERROR)
toast.warning = (message: string) => createToast(message, ToastType.WARNING)