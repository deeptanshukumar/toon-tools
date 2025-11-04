'use client'

import * as React from 'react'

type ToastProps = {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

export function Toaster() {
  return null // Placeholder - will be implemented with proper toast library
}

export function useToast() {
  return {
    toast: (props: ToastProps) => {
      console.log('Toast:', props)
    },
  }
}
