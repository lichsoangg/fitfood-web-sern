import { toast } from 'react-toastify'

export const SuccessNotify = (message, autoClose = 1000) => {
  return toast.success(message, { autoClose: autoClose, pauseOnHover: false })
}
