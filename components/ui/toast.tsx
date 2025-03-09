"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/app/lib/utils"
import { useToast, type Toast } from "@/hooks/use-toast"

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>
}

const ToastViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
                className,
            )}
            {...props}
        />
    ),
)
ToastViewport.displayName = "ToastViewport"

const toastVariants = cva(
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
    {
        variants: {
            variant: {
                default: "border bg-background text-foreground",
                destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
)

const ToastImpl = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof toastVariants> & {
        toast: Toast
        onDismiss: (id: string) => void
    }
>(({ className, variant, toast, onDismiss, ...props }, ref) => {
    return (
        <div ref={ref} className={cn(toastVariants({ variant }), className)} {...props}>
            <div className="grid gap-1">
                {toast.title && <div className="text-sm font-semibold">{toast.title}</div>}
                {toast.description && <div className="text-sm opacity-90">{toast.description}</div>}
            </div>
            {toast.action}
            <button
                className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
                onClick={() => onDismiss(toast.id)}
            >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </button>
        </div>
    )
})
ToastImpl.displayName = "Toast"

const Toaster = () => {
    const { toasts, dismiss } = useToast()

    return (
        <ToastProvider>
            <ToastViewport>
                {toasts.map((toast) => (
                    <ToastImpl
                        key={toast.id}
                        toast={toast}
                        onDismiss={dismiss}
                        variant={toast.variant as "default" | "destructive"}
                    />
                ))}
            </ToastViewport>
        </ToastProvider>
    )
}

export { Toaster, ToastProvider, ToastViewport, ToastImpl as Toast }

