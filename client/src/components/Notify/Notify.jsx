import { toast } from 'react-toastify';

export const SuccessNotify = (message) => {
  return toast.success(message, { autoClose: 1000, pauseOnHover: false });
};
