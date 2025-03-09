"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Clock, Phone, MapPin, Plus, Minus, X, Send, Search, MenuIcon, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Product {
    id: string
    name: string
    description: string
    price: number
    imageUrl?: string
    category?: string
}

interface Business {
    name: string
    description?: string
    logoUrl?: string
    products: Product[]
    contact?: string
    hours?: string
    address?: string
}

interface CartItem extends Product {
    quantity: number
}

const CATEGORIES = ["Todos", "Entradas", "Platos principales", "Postres", "Bebidas"]

export default function BusinessPage() {
    const params = useParams()
    const businessSlug = params.businessSlug as string
    const [business, setBusiness] = useState<Business | null>(null)
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState<CartItem[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [activeCategory, setActiveCategory] = useState("Todos")
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const res = await fetch(`/api/business/${businessSlug}`)
                if (!res.ok) throw new Error("Error al obtener el negocio")
                const data = await res.json()

                const productsWithCategories = data.products.map((product: Product) => ({
                    ...product,
                    category: CATEGORIES[Math.floor(Math.random() * (CATEGORIES.length - 1)) + 1],
                }))

                setBusiness({
                    ...data,
                    products: productsWithCategories,
                })
            } catch (error) {
                console.error("Error fetching business data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchBusiness()
    }, [businessSlug])

    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id)

            if (existingItem) {
                return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
            } else {
                return [...prevCart, { ...product, quantity: 1 }]
            }
        })
    }

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === productId)

            if (existingItem && existingItem.quantity > 1) {
                return prevCart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
            } else {
                return prevCart.filter((item) => item.id !== productId)
            }
        })
    }

    const removeItemCompletely = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
    }

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0)
    }

    const getCartItemCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0)
    }

    const sendOrder = () => {
        if (!business?.contact) {
            alert("Este negocio no tiene un contacto disponible.")
            return
        }

        const message =
            `Hola, quiero hacer un pedido en ${business.name}:

` +
            cart.map((item) => `- ${item.name} x${item.quantity}: $${item.price * item.quantity}`).join("\n") +
            `\n\nTotal: $${getCartTotal()}`

        const whatsappUrl = `https://wa.me/${business.contact}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, "_blank")
    }

    const filteredProducts =
        business?.products.filter(
            (product) =>
                (activeCategory === "Todos" || product.category === activeCategory) &&
                (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))),
        ) || []

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                    <p className="text-muted-foreground">Cargando...</p>
                </div>
            </div>
        )
    }

    if (!business) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <h1 className="text-2xl font-bold mb-4">Negocio no encontrado</h1>
                <p className="text-muted-foreground mb-6">No pudimos encontrar el negocio que estás buscando.</p>
                <Button asChild>
                    <Link href="/">
                        <Home className="mr-2 h-4 w-4" />
                        Volver al inicio
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="relative bg-primary text-primary-foreground">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary overflow-hidden">
                    {business.logoUrl && (
                        <div
                            className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `url(${business.logoUrl})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                filter: "blur(20px)",
                            }}
                        ></div>
                    )}
                </div>

                <div className="container relative z-10 px-4 py-8 mx-auto flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-shrink-0">
                        <Avatar className="h-24 w-24 border-4 border-primary-foreground/20">
                            <AvatarImage src={business.logoUrl || ""} alt={business.name} />
                            <AvatarFallback className="text-3xl">{business.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-bold">{business.name}</h1>
                        {business.description && <p className="mt-1 text-primary-foreground/80 max-w-md">{business.description}</p>}

                        <div className="flex flex-wrap gap-4 mt-3 justify-center md:justify-start">
                            {business.hours && (
                                <div className="flex items-center gap-1 text-sm">
                                    <Clock className="h-4 w-4" />
                                    <span>{business.hours}</span>
                                </div>
                            )}

                            {business.contact && (
                                <div className="flex items-center gap-1 text-sm">
                                    <Phone className="h-4 w-4" />
                                    <span>{business.contact}</span>
                                </div>
                            )}

                            {business.address && (
                                <div className="flex items-center gap-1 text-sm">
                                    <MapPin className="h-4 w-4" />
                                    <span>{business.address}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:ml-auto">
                        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                            <SheetTrigger asChild>
                                <Button variant="secondary" size="lg" className="relative">
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    <span>Ver carrito</span>
                                    {getCartItemCount() > 0 && (
                                        <Badge variant="destructive" className="absolute -top-2 -right-2">
                                            {getCartItemCount()}
                                        </Badge>
                                    )}
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="w-full sm:max-w-md flex flex-col">
                                <SheetHeader>
                                    <SheetTitle>Tu pedido</SheetTitle>
                                </SheetHeader>

                                <ScrollArea className="flex-1 mt-6">
                                    {cart.length > 0 ? (
                                        <div className="space-y-4">
                                            {cart.map((item) => (
                                                <div key={item.id} className="flex items-center gap-4">
                                                    <div className="w-16 h-16 relative rounded-md overflow-hidden bg-muted flex-shrink-0">
                                                        {item.imageUrl ? (
                                                            <Image
                                                                src={item.imageUrl || "/placeholder.svg"}
                                                                alt={item.name}
                                                                fill
                                                                className="object-cover"
                                                                unoptimized
                                                            />
                                                        ) : (
                                                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                                                <MenuIcon className="h-6 w-6" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-medium truncate">{item.name}</h4>
                                                        <p className="text-sm text-muted-foreground">${item.price}</p>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            onClick={() => removeFromCart(item.id)}
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </Button>

                                                        <span className="w-6 text-center">{item.quantity}</span>

                                                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => addToCart(item)}>
                                                            <Plus className="h-4 w-4" />
                                                        </Button>

                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-destructive"
                                                            onClick={() => removeItemCompletely(item.id)}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground" />
                                            <h3 className="mt-4 text-lg font-medium">Tu carrito está vacío</h3>
                                            <p className="mt-2 text-muted-foreground">Agrega algunos productos para comenzar tu pedido.</p>
                                            <Button className="mt-4" onClick={() => setIsCartOpen(false)}>
                                                Ver menú
                                            </Button>
                                        </div>
                                    )}
                                </ScrollArea>

                                {cart.length > 0 && (
                                    <div className="mt-auto pt-6 border-t">
                                        <div className="flex justify-between mb-4">
                                            <span className="font-medium">Total</span>
                                            <span className="font-bold">${getCartTotal()}</span>
                                        </div>

                                        <Button className="w-full" size="lg" onClick={sendOrder}>
                                            <Send className="mr-2 h-4 w-4" />
                                            Enviar pedido por WhatsApp
                                        </Button>
                                    </div>
                                )}
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 container px-4 py-8">
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar productos..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mb-8">
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Menú</h2>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="md:hidden">
                                    <MenuIcon className="mr-2 h-4 w-4" />
                                    Categorías
                                </Button>
                            </SheetTrigger>
                        </div>

                        <div className="hidden md:block mt-4 overflow-x-auto pb-2">
                            <Tabs defaultValue="Todos" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
                                <TabsList className="w-full justify-start">
                                    {CATEGORIES.map((category) => (
                                        <TabsTrigger key={category} value={category}>
                                            {category}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </Tabs>
                        </div>

                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle>Categorías</SheetTitle>
                            </SheetHeader>
                            <div className="mt-6 space-y-2">
                                {CATEGORIES.map((category) => (
                                    <Button
                                        key={category}
                                        variant={activeCategory === category ? "default" : "ghost"}
                                        className="w-full justify-start"
                                        onClick={() => {
                                            setActiveCategory(category)
                                            setIsMenuOpen(false)
                                        }}
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <Card key={product.id} className="overflow-hidden">
                                <div className="aspect-video relative bg-muted">
                                    {product.imageUrl ? (
                                        <Image
                                            src={product.imageUrl || "/placeholder.svg"}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-muted-foreground">
                                            <MenuIcon className="h-10 w-10" />
                                        </div>
                                    )}
                                    {product.category && <Badge className="absolute top-2 right-2">{product.category}</Badge>}
                                </div>
                                <CardHeader className="p-4">
                                    <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <p className="text-muted-foreground text-sm line-clamp-2">
                                        {product.description || "Sin descripción"}
                                    </p>
                                    <p className="text-lg font-bold mt-2">${product.price}</p>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Button
                                        className="w-full"
                                        onClick={() => {
                                            addToCart(product)
                                            // Optional: Show a toast or feedback
                                        }}
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Agregar al carrito
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <MenuIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No hay productos disponibles</h3>
                        <p className="mt-2 text-muted-foreground">
                            {searchQuery
                                ? "No se encontraron productos con tu búsqueda."
                                : "No hay productos disponibles en esta categoría."}
                        </p>
                        {searchQuery && (
                            <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                                <X className="h-4 w-4 mr-2" /> Limpiar búsqueda
                            </Button>
                        )}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t py-6 bg-muted/40">
                <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">PediloApp</span>
                        <span className="text-muted-foreground">© {new Date().getFullYear()}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                            Términos
                        </Link>
                        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                            Privacidad
                        </Link>
                        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                            Contacto
                        </Link>
                    </div>
                </div>
            </footer>

            {/* Floating cart button (mobile) */}
            {cart.length > 0 && (
                <div className="fixed bottom-4 right-4 md:hidden z-50">
                    <Button size="lg" className="rounded-full h-14 w-14 shadow-lg" onClick={() => setIsCartOpen(true)}>
                        <div className="relative">
                            <ShoppingCart className="h-6 w-6" />
                            <Badge variant="destructive" className="absolute -top-2 -right-2">
                                {getCartItemCount()}
                            </Badge>
                        </div>
                    </Button>
                </div>
            )}
        </div>
    )
}

