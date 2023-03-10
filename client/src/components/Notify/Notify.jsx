import { toast } from 'react-toastify'

export const SuccessNotify = (message, autoClose = 1000) => {
  return toast.success(message, { autoClose: autoClose, pauseOnHover: false })
}

export const ErrorNotify = (message, autoClose = 1000) => {
  return toast.error(message, { autoClose: autoClose, pauseOnHover: false })
}

export const WarningNotify = (message, autoClose = 1000) => {
  return toast.warning(message, { autoClose: autoClose, pauseOnHover: false })
}
