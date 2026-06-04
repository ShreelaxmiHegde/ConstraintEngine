"use client";

import Toast from "./Toast";
import { useToastStore } from "@/store/toastStore";

export default function ToastContainer() {
  const toasts =
    useToastStore((state) => state.toasts
    );

  return (
    <div className="fixed bottom-4 left-4 z-[9999] flex flex-col gap-3">
      {
        toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
          />
        ))
      }
    </div>
  );
}