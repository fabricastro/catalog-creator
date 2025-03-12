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
import { BookOpen, Copy, Share2, QrCode, Home, Settings, User, LogOut, ExternalLink, Download } from "lucide-react"
import CartaPDF from "@/components/CartaPDF"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PDFDownloadLink } from "@react-pdf/renderer"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useParams, useRouter, usePathname } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { jsPDF } from "jspdf";
import { toast } from "sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const params = useParams()
    const pathname = usePathname()
    const businessSlug = params.businessSlug as string
    const router = useRouter()
    const [user, setUser] = useState<{ id: string; email: string } | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const [business, setBusiness] = useState<{ name: string; logoUrl?: string } | null>(null);
    const [showQR, setShowQR] = useState(false)
    const [products, setProducts] = useState<any[]>([])
    const [cartaURL, setCartaURL] = useState("");
    const qrRef = useRef<HTMLCanvasElement>(null);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(cartaURL);
        toast.success("Enlace copiado al portapapeles ✅", { duration: 3000 }); // ✅ Usamos toast en vez de alert()
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCartaURL(`${window.location.origin}/${businessSlug}`);
        }
    }, [businessSlug]);

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

    const generatePDF = () => {
        const pdf = new jsPDF();
        pdf.text("Escanea el código QR para acceder a la carta:", 20, 20);

        const canvas = qrRef.current;
        if (canvas) {
            const qrDataUrl = canvas.toDataURL("image/png");
            pdf.addImage(qrDataUrl, "PNG", 60, 40, 90, 90);
            pdf.save("qr-carta.pdf");
        }
    };

    const isActive = (path: string) => {
        if (path === `/${businessSlug}/dashboard` && pathname === `/${businessSlug}/dashboard`) {
            return true
        }
        if (path !== `/${businessSlug}/dashboard` && pathname.startsWith(path)) {
            return true
        }
        return false
    }

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/auth/logout", { method: "POST" });
            if (res.ok) {
                router.push("/login");
            }
        } catch (error) {
            console.error("Error cerrando sesión:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const res = await fetch(`/api/business/${businessSlug}`)
                if (!res.ok) throw new Error("No se pudo obtener la información del negocio")
                const data = await res.json()
                setBusiness(data)
                setProducts(data.products)
            } catch (error) {
                console.error("Error obteniendo negocio:", error)
            }
        }

        fetchBusiness()
    }, [businessSlug])


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
                                            <AvatarImage key={business?.logoUrl} src={business?.logoUrl || "/placeholder.svg"} alt={business?.name || "Negocio"} />
                                            <AvatarFallback>{business?.name ? business.name.charAt(0) : "U"}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col items-start text-left">
                                            <span className="text-sm font-medium">{business?.name}</span>
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
                                        <Link href={`dashboard/profile`}>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Perfil</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="dashboard/settings">
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Configuración</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout} disabled={isLoading} className="cursor-pointer">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>{isLoading ? "Cerrando sesión..." : "Cerrar sesión"}</span>
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
                                <div className="ml-auto flex items-center gap-4">
                                    {/* Menú de compartir */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="sm" className="gap-1">
                                                <Share2 className="h-4 w-4" />
                                                Compartir
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={copyToClipboard}>
                                                <Copy className="h-4 w-4 mr-2" />
                                                Copiar enlace
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setShowQR(true)}>
                                                <QrCode className="h-4 w-4 mr-2" />
                                                Generar QR
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <Button variant="outline" size="sm" className="gap-1" asChild>
                                    <Link href={`/${businessSlug}`} target="_blank">
                                        <ExternalLink className="h-4 w-4" />
                                        Ver catálogo
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </header>
                    {showQR && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                                <h2 className="text-lg font-bold mb-4">Código QR</h2>
                                <QRCodeCanvas value={cartaURL} size={200} />

                                <button
                                    onClick={generatePDF}
                                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                >
                                    📥 Descargar QR
                                </button>

                                <Button onClick={() => setShowQR(false)} className="mt-4">
                                    Cerrar
                                </Button>
                            </div>
                        </div>
                    )}
                    {user && <main className="container px-4 py-6 md:py-8">{children}</main>}
                </div>
            </div>
        </SidebarProvider>
    )
}

