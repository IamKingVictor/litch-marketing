"use client"

import { toast as toastManager } from "@/components/ui/toast"

type ToastVariant = "default" | "success" | "error"

// Thin wrapper around your generated shadcn/Base UI toast manager, so the
// rest of the app can keep calling `toast(message, variant)` the same way —
// the actual rendering/animation is handled by <Toaster> (mounted once in
// your root layout, see below).
export function useToast() {
  const toast = (message: string, variant: ToastVariant = "default") => {
    toastManager.add({
      title: message,
      type:
        variant === "error"
          ? "error"
          : variant === "success"
            ? "success"
            : undefined,
    })
  }
  return { toast }
}
