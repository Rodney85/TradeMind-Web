import * as React from "react"
import { useToast } from "@/components/ui/toast"

export interface ToastProps {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToastHook() {
  const { toast } = useToast()

  return {
    toast: (props: ToastProps) => {
      toast({
        ...props,
        duration: 3000,
      })
    },
  }
}
