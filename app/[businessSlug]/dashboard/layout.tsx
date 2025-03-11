"use client"

import type React from "react"

import { SidebarProvider } from "@/components/ui/sidebar"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarTrigger,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { BookOpen, Home, Package, FileText, BarChart3, Settings, User, LogOut, ExternalLink, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useParams, useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const params = useParams()
    const pathname = usePathname()
    const businessSlug = params.businessSlug as string
    const router = useRouter()
    const [user, setUser] = useState<{ id: string; email: string } | null>(null)

    useEffect(() => {
        const checkAuth = async () => {
            const res = await fetch("/api/auth/check")
            if (!res.ok) {
                router.push("/login")
                return
            }
            const userData = await res.json()
            setUser(userData)
        }
        checkAuth()
    }, [router])

    const isActive = (path: string) => {
        if (path === `/${businessSlug}/dashboard` && pathname === `/${businessSlug}/dashboard`) {
            return true
        }
        if (path !== `/${businessSlug}/dashboard` && pathname.startsWith(path)) {
            return true
        }
        return false
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <Sidebar variant="inset" collapsible="icon">
                    <SidebarHeader>
                        <div className="flex items-center gap-2 px-4 py-[6px]">
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
                                    isActive={isActive(`/${businessSlug}/dashboard`)}
                                    tooltip="Inicio"
                                    className="h-10"
                                >
                                    <Link href={`/${businessSlug}/dashboard`}>
                                        <Home className="h-5 w-5 flex-none" />
                                        <span>Inicio</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {/* <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive(`/${businessSlug}/dashboard/products`)}
                                    tooltip="Productos"
                                    className="h-10"
                                >
                                    <Link href={`/${businessSlug}/dashboard/products`}>
                                        <Package className="h-5 w-5 flex-none" />
                                        <span>Productos</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive(`/${businessSlug}/dashboard/catalogs`)}
                                    tooltip="Catálogos"
                                    className="h-10"
                                >
                                    <Link href={`/${businessSlug}/dashboard/catalogs`}>
                                        <FileText className="h-5 w-5 flex-none" />
                                        <span>Catálogos</span>
                                        <Badge variant="outline" className="ml-auto flex-none">
                                            Nuevo
                                        </Badge>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive(`/${businessSlug}/dashboard/analytics`)}
                                    tooltip="Estadísticas"
                                    className="h-10"
                                >
                                    <Link href={`/${businessSlug}/dashboard/analytics`}>
                                        <BarChart3 className="h-5 w-5 flex-none" />
                                        <span>Estadísticas</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem> */}
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive(`/${businessSlug}/dashboard/settings`)}
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
                                            <AvatarImage src="/placeholder.svg" alt="User" />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col items-start text-left">
                                            <span className="text-sm font-medium">Usuario</span>
                                            <span className="text-xs text-muted-foreground truncate w-[140px]">
                                                {user?.email || "usuario@ejemplo.com"}
                                            </span>
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/profile">
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Perfil</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/settings">
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Configuración</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Cerrar sesión</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </SidebarFooter>
                </Sidebar>
                <div className="flex-1">
                    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30">
                        <div className="flex h-16 items-center gap-4 px-4 md:px-6">
                            <SidebarTrigger />
                            <div className="ml-auto flex items-center gap-4">
                                {/* <Button variant="outline" size="icon" className="relative hidden md:flex">
                                    <Bell className="h-5 w-5" />
                                    <span className="sr-only">Notificaciones</span>
                                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                                        2
                                    </span>
                                </Button> */}
                                <Button variant="outline" size="sm" className="gap-1" asChild>
                                    <Link href={`/${businessSlug}`} target="_blank">
                                        <ExternalLink className="h-4 w-4" />
                                        Ver catálogo
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </header>
                    {user && <main className="container px-4 py-6 md:py-8">{children}</main>}
                </div>
            </div>
        </SidebarProvider>
    )
}

