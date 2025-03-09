"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { BookOpen, Home, Package, FileText, BarChart3, Settings, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const params = useParams();
    const businessSlug = params.businessSlug as string;
    const router = useRouter();
    const [user, setUser] = useState<{ id: string; email: string } | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const res = await fetch("/api/auth/check");
            if (!res.ok) {
                router.push("/login");
                return;
            }
            const userData = await res.json();
            setUser(userData);
        };
        checkAuth();
    }, [router]);
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full px-8 md:px-12">
                {/* Sidebar */}
                <Sidebar>
                    <SidebarHeader>
                        <div className="flex items-center gap-2 px-2">
                            <BookOpen className="h-6 w-6" />
                            <span className="font-bold">PediloApp</span>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive>
                                    <Link href={`/${businessSlug}/dashboard`}>
                                        <Home />
                                        <span>Inicio</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href={`/${businessSlug}/dashboard/products`}>
                                        <Package />
                                        <span>Productos</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href={`/${businessSlug}/dashboard/catalogs`}>
                                        <FileText />
                                        <span>Catálogos</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href={`/${businessSlug}/dashboard/analytics`}>
                                        <BarChart3 />
                                        <span>Estadísticas</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href={`/${businessSlug}/dashboard/settings`}>
                                        <Settings />
                                        <span>Configuración</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                    <SidebarFooter>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton>
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src="/placeholder.svg" alt="User" />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                            <span>Usuario</span>
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
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
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>
                {/* Main content */}
                <div className="flex-1">
                    <header className="border-b">
                        <div className="flex h-16 items-center px-4 md:px-0">
                            <SidebarTrigger />
                            <div className="ml-auto flex items-center gap-4">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/${businessSlug}`}>
                                        Ver catálogo
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </header>
                    <main className="container py-6 md:py-8">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    );
}