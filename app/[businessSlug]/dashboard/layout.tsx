"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { BusinessProvider, useBusiness } from "@/app/context/BusinessContext"
import { useParams, useRouter, usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BookOpen, Home, Settings, User, LogOut, QrCode, ExternalLink, Copy, Download } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const router = useRouter()
  const businessSlug = params?.businessSlug as string | undefined

  if (!businessSlug) {
    return <div className="flex items-center justify-center min-h-screen">Cargando negocio...</div>
  }

  return (
    <BusinessProvider businessSlug={businessSlug}>
      <SidebarProvider>
        <DashboardContent businessSlug={businessSlug}>{children}</DashboardContent>
      </SidebarProvider>
    </BusinessProvider>
  )
}

function DashboardHeader({ businessSlug }: { businessSlug: string }) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const catalogUrl = typeof window !== "undefined" ? `${window.location.origin}/${businessSlug}` : `/${businessSlug}`

  useEffect(() => {
    // Generar QR code URL usando la API de QR Code Generator
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(catalogUrl)}`
    setQrCodeUrl(qrUrl)
  }, [catalogUrl])

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(catalogUrl)
    toast.success("Enlace copiado", {
      description: "El enlace ha sido copiado al portapapeles",
      position: "top-center",
      duration: 3000,
    })
  }

  const downloadQRCode = () => {
    // Crear un elemento <a> temporal para descargar la imagen
    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = `qr-code-${businessSlug}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast.success("Descarga iniciada", {
      description: "El código QR se está descargando",
      position: "top-center",
      duration: 3000,
    })
  }

  return (
    <div className="border-b mb-6">
      <div className="container px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Panel de Control</h1>
        </div>

        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <QrCode className="h-4 w-4 mr-2" />
                Código QR
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4">
              <div className="flex flex-col items-center gap-3">
                <div className="text-sm font-medium">Escanea para ver el catálogo</div>
                {qrCodeUrl && (
                  <div className="border p-2 rounded-md bg-white">
                    <img
                      src={qrCodeUrl || "/placeholder.svg"}
                      alt="QR Code"
                      width={200}
                      height={200}
                      className="rounded-sm"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2 w-full">
                  <Button variant="outline" size="sm" onClick={copyLinkToClipboard} className="flex-1">
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    Copiar enlace
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadQRCode} className="flex-1">
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Descargar QR
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button asChild>
            <Link href={`/${businessSlug}`} target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              Ver catálogo
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function DashboardContent({ children, businessSlug }: { children: React.ReactNode; businessSlug: string }) {
  const { business } = useBusiness()
  const pathname = usePathname()
  const router = useRouter()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  if (!businessSlug) {
    return <div className="flex items-center justify-center min-h-screen">Cargando negocio...</div>
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (res.ok) {
        toast.success("Sesión cerrada", {
          description: "Has cerrado sesión correctamente",
          position: "top-center",
          duration: 3000,
        })
        router.push("/login")
      } else {
        const data = await res.json()
        throw new Error(data.error || "Error al cerrar sesión")
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
      toast.error("Error al cerrar sesión", {
        description: "Ocurrió un error al intentar cerrar sesión",
        position: "top-center",
        duration: 3000,
      })
    } finally {
      setIsLoggingOut(false)
    }
  }

  const navigateToProfile = () => {
    router.push(`/${businessSlug}/dashboard/profile`)
  }

  const navigateToSettings = () => {
    router.push(`/${businessSlug}/dashboard/settings`)
  }

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-4 py-[8px]">
            <BookOpen className="h-6 w-6 flex-none text-primary" />
            <span className="font-bold text-xl truncate">PediloApp</span>
          </div>
          <SidebarSeparator />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === `/${businessSlug}/dashboard`}
                tooltip="Inicio"
                className="h-10"
              >
                <Link href={`/${businessSlug}/dashboard`}>
                  <Home className="h-5 w-5 flex-none" />
                  <span>Inicio</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(`/${businessSlug}/dashboard/settings`)}
                tooltip="Configuración"
                className="h-10"
              >
                <Link href={`/${businessSlug}/dashboard/settings`}>
                  <Settings className="h-5 w-5 flex-none" />
                  <span>Configuración</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
          <div className="px-4 py-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                  <Avatar className="h-6 w-6 flex-none">
                    <AvatarImage
                      key={business?.logoUrl}
                      src={business?.logoUrl || "/placeholder.svg"}
                      alt={business?.name || "Negocio"}
                    />
                    <AvatarFallback>{business?.name ? business.name.charAt(0) : "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium">{business?.name}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={navigateToProfile}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={navigateToSettings}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowLogoutDialog(true)}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
      <div className="flex-1">
        <DashboardHeader businessSlug={businessSlug} />
        <main className="container px-4 py-2 md:py-4">{children}</main>
      </div>

      {/* Diálogo de confirmación para cerrar sesión */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas cerrar sesión? Tendrás que iniciar sesión nuevamente para acceder a tu cuenta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoggingOut}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={isLoggingOut ? "opacity-70 cursor-not-allowed" : ""}
            >
              {isLoggingOut ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Cerrando sesión...
                </>
              ) : (
                "Cerrar sesión"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

