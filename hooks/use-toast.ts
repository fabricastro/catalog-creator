"use client"

import type React from "react"

// This is a simplified version of the toast hook from shadcn/ui
import { useState, useEffect, useCallback } from "react"

export type ToastProps = {
  id?: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
  duration?: number
}

type ToastActionType = "add" | "remove" | "dismiss" | "update"

type Action = {
  type: ToastActionType
  toast?: ToastProps
  id?: string
}

export type Toast = ToastProps & {
  id: string
  visible: boolean
}

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000

const toasts: Toast[] = []

// Simple unique ID generator
const generateId = () => {
  return Math.random().toString(36).substring(2, 9)
}

const listeners: Array<(toasts: Toast[]) => void> = []

const addToast = (toast: ToastProps) => {
  const id = toast.id || generateId()

  const newToast = {
    ...toast,
    id,
    visible: true,
  }

  const existingToastIndex = toasts.findIndex((t) => t.id === id)

  if (existingToastIndex >= 0) {
    toasts[existingToastIndex] = newToast
  } else {
    if (toasts.length >= TOAST_LIMIT) {
      dismissToast(toasts[0].id)
    }
    toasts.push(newToast)
  }

  listeners.forEach((listener) => {
    listener([...toasts])
  })

  return id
}

const dismissToast = (id: string) => {
  const index = toasts.findIndex((toast) => toast.id === id)
  if (index >= 0) {
    toasts[index].visible = false
    listeners.forEach((listener) => {
      listener([...toasts])
    })
  }

  setTimeout(() => {
    removeToast(id)
  }, TOAST_REMOVE_DELAY)
}

const removeToast = (id: string) => {
  const index = toasts.findIndex((toast) => toast.id === id)
  if (index >= 0) {
    toasts.splice(index, 1)
    listeners.forEach((listener) => {
      listener([...toasts])
    })
  }
}

const updateToast = (id: string, toast: ToastProps) => {
  const index = toasts.findIndex((t) => t.id === id)
  if (index >= 0) {
    toasts[index] = { ...toasts[index], ...toast }
    listeners.forEach((listener) => {
      listener([...toasts])
    })
  }
}

export function useToast() {
  const [state, setState] = useState<Toast[]>(toasts)

  useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  const toast = useCallback((props: ToastProps) => {
    const id = addToast(props)

    // Auto-dismiss after duration
    if (props.duration !== Number.POSITIVE_INFINITY) {
      setTimeout(() => {
        dismissToast(id)
      }, props.duration || 5000)
    }

    return {
      id,
      dismiss: () => dismissToast(id),
      update: (props: ToastProps) => updateToast(id, props),
    }
  }, [])

  return {
    toast,
    toasts: state,
    dismiss: dismissToast,
  }
}

