import { toast } from "react-toastify";

let activeToastId = null;

// Prevent spam / duplicate toasts
const showToast = (type, message, options = {}) => {
  if (activeToastId) {
    toast.dismiss(activeToastId);
  }

  activeToastId = toast[type](message, {
    ...options,
  });
};

export const toastService = {
  success: (msg, opts) => showToast("success", msg, opts),

  error: (msg, opts) => showToast("error", msg, opts),

  info: (msg, opts) => showToast("info", msg, opts),

  warning: (msg, opts) => showToast("warning", msg, opts),

  promise: (promise, messages) => {
    return toast.promise(promise, {
      pending: messages.loading || "Processing...",
      success: messages.success || "Success!",
      error: messages.error || "Something went wrong",
    });
  },
};
