// Third-Party =====> react-toastify
import { toast, ToastOptions } from "react-toastify";

type ToastType = "info" | "success" | "warning" | "error" | "default";

const toastifyMsg = (
  message: string,
  type: ToastType,
  options: ToastOptions = {},
): void => {
  switch (type) {
    case "info":
      toast.info(message, options);
      break;
    case "success":
      toast.success(message, options);
      break;
    case "warning":
      toast.warn(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    default:
      toast(message, options);
  }
};

export default toastifyMsg;
