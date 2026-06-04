export type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

export interface ToastStore {
  toasts: Toast[];

  addToast: (
    type: ToastType,
    message: string
  ) => void;

  removeToast: (
    id: string
  ) => void;
}

