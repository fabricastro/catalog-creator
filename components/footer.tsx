import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface FooterProps {
    businessName?: string
    showSocial?: boolean
    showContact?: boolean
    showLinks?: boolean
    variant?: "default" | "simple" | "minimal"
    className?: string
}

export function Footer({
    businessName = "PediloApp",
    showSocial = true,
    showContact = true,
    showLinks = true,
    variant = "default",
    className = "",
}: FooterProps) {
    const year = new Date().getFullYear()

    // Enlaces de navegación
    const links = [
        { name: "Inicio", href: "/" },
        { name: "Acerca de", href: "/acerca-de" },
        { name: "Términos y Condiciones", href: "/terminos" },
        { name: "Política de Privacidad", href: "/privacidad" },
    ]

    // Información de contacto
    const contactInfo = [
        { icon: Mail, text: "fabricio.castro@technodevs.com.ar", href: "mailto:fabricio.castro@technodevs.com.ar" },
        { icon: Phone, text: "+54 9 264-4412511", href: "tel:+5492644412511" },
        { icon: MapPin, text: "San Juan, Argentina", href: "#" },
    ]

    // Redes sociales
    const socialLinks = [
        // { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
        { icon: Instagram, href: "https://www.instagram.com/fabri.code/", label: "Instagram" },
        // { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    ]

    // Renderizar el footer según la variante
    if (variant === "minimal") {
        return (
            <footer className={`w-full py-4 px-4 border-t ${className}`}>
                <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        © {year} {businessName}. Todos los derechos reservados.
                    </p>
                    {showLinks && (
                        <div className="flex items-center gap-4 mt-2 sm:mt-0">
                            {links.slice(0, 2).map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </footer>
        )
    }

    if (variant === "simple") {
        return (
            <footer className={`w-full py-6 px-4 border-t ${className}`}>
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex flex-col items-center md:items-start">
                            <h3 className="font-bold text-lg">{businessName}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                © {year} {businessName}. Todos los derechos reservados.
                            </p>
                        </div>

                        {showLinks && (
                            <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
                                {links.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {showSocial && (
                            <div className="flex items-center gap-2 mt-4 md:mt-0">
                                {socialLinks.map((social) => {
                                    const Icon = social.icon
                                    return (
                                        <Button key={social.label} variant="ghost" size="icon" asChild>
                                            <Link href={social.href} aria-label={social.label}>
                                                <Icon className="h-5 w-5" />
                                            </Link>
                                        </Button>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </footer>
        )
    }

    // Variante por defecto (completa)
    return (
        <footer className={`w-full py-8 px-4 border-t ${className}`}>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {/* Columna 1: Información de la empresa */}
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg mb-4">{businessName}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Plataforma digital para la gestión de catálogos y pedidos online para negocios de todos los tamaños.
                        </p>
                        {showSocial && (
                            <div className="flex items-center gap-2 mt-auto">
                                {socialLinks.map((social) => {
                                    const Icon = social.icon
                                    return (
                                        <Button key={social.label} variant="ghost" size="icon" asChild>
                                            <Link href={social.href} aria-label={social.label}>
                                                <Icon className="h-5 w-5" />
                                            </Link>
                                        </Button>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    {/* Columna 2: Enlaces útiles */}
                    {/* {showLinks && (
                        <div className="flex flex-col">
                            <h3 className="font-bold text-lg mb-4">Enlaces útiles</h3>
                            <div className="grid grid-cols-1 gap-2">
                                {links.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )} */}

                    {/* Columna 3: Contacto */}
                    {showContact && (
                        <div className="flex flex-col">
                            <h3 className="font-bold text-lg mb-4">Contacto</h3>
                            <div className="grid grid-cols-1 gap-3">
                                {contactInfo.map((item, index) => {
                                    const Icon = item.icon
                                    return (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <Icon className="h-4 w-4" />
                                            <span>{item.text}</span>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Columna 4: Newsletter
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg mb-4">Mantente informado</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Suscríbete a nuestro newsletter para recibir novedades y ofertas especiales.
                        </p>
                        <div className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Tu correo electrónico"
                                className="px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <Button>Suscribirse</Button>
                        </div>
                    </div> */}
                </div>

                <Separator className="my-6" />

                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        © {year} {businessName}. Todos los derechos reservados.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 sm:mt-0">Desarrollado con ❤️ por fabricastro</p>
                </div>
            </div>
        </footer>
    )
}

