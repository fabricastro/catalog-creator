"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Search } from "lucide-react"
import AddProductDialog from "@/components/ui/dashboard/AddProductDialog"
import EditProductDialog from "@/components/ui/dashboard/EditProductDialog"
import AddCategoryDialog from "@/components/ui/dashboard/AddCategoryDialog"
import CloudinaryImage from "@/components/ui/CloudinaryImage"
import DeleteProductDialog from "@/components/ui/dashboard/DeleteProductDialog"

interface Product {
    id: string
    name: string
    description: string
    price: string
    imageUrl: string
}

interface Business {
    name: string
    description?: string
    logoUrl?: string
    products: Product[]
}

export default function Dashboard() {
    const params = useParams()
    const businessSlug = params.businessSlug as string
    const [business, setBusiness] = useState<Business | null>(null)
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [categories, setCategories] = useState<string[]>([])
    const router = useRouter()

    useEffect(() => {
        if (!businessSlug) {
            console.error("🚨 Error: businessSlug está vacío o indefinido")
            return
        }

        const fetchBusiness = async () => {
            try {
                console.log("🔍 Fetching business:", businessSlug)
                setLoading(true)
                setError(null)
                const res = await fetch(`/api/business/${encodeURIComponent(businessSlug)}`)

                console.log("📥 API Response:", res.status)

                if (!res.ok) throw new Error(`Error ${res.status}: No se pudo obtener el negocio`)

                const data = await res.json()
                console.log("✅ Business Data:", data)

                setBusiness(data)
            } catch (error: any) {
                console.error("❌ Error fetching business data:", error)
                setError(error.message)
                setBusiness(null)
            } finally {
                setLoading(false)
            }
        }

        const fetchCategories = async () => {
            try {
                const res = await fetch(`/api/business/${encodeURIComponent(businessSlug)}/categories`)
                if (!res.ok) throw new Error("Error al obtener categorías")
                const data = await res.json()
                setCategories(data.map((category: { name: string }) => category.name))
            } catch (error) {
                console.error("❌ Error al obtener categorías:", error)
            }
        }

        fetchBusiness()
        fetchCategories()
    }, [businessSlug])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-muted-foreground">Cargando...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    if (!business) return null

    const filteredProducts = business.products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <div className="container py-6 md:py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold">{business.name}</h1>
                    <p className="text-muted-foreground">Administra tus productos y catálogos</p>
                </div>
                <div className="flex gap-2">
                    <AddProductDialog businessName={businessSlug} setBusiness={setBusiness} />
                    <AddCategoryDialog setCategories={setCategories} />
                </div>
            </div>

            <Tabs defaultValue="products">
                <TabsList className="mb-6">
                    <TabsTrigger value="products">Productos</TabsTrigger>
                    {/* <TabsTrigger value="catalogs">Catálogos</TabsTrigger> */}
                </TabsList>
                <TabsContent value="products">
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar productos..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <Card key={product.id} className="overflow-hidden">
                                    <div className="aspect-video relative bg-muted mx-4 rounded-lg">
                                        {product.imageUrl ? (
                                            <CloudinaryImage
                                                src={product.imageUrl}
                                                alt={product.name}
                                                width={600}
                                                height={400}
                                                crop="fill"
                                                className="h-full w-full object-contain"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                                <Package className="h-10 w-10" />
                                            </div>
                                        )}
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
                                    <CardFooter className="p-4 pt-0 flex justify-between">
                                        <EditProductDialog product={product} businessName={businessSlug} setBusiness={setBusiness} />
                                        <DeleteProductDialog
                                            product={product}
                                            onProductDeleted={(productId) => {
                                                setBusiness((prev) =>
                                                    prev
                                                        ? {
                                                            ...prev,
                                                            products: prev.products.filter((prod) => prod.id !== productId),
                                                        }
                                                        : prev,
                                                )
                                            }}
                                        />
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-center py-12">No hay productos disponibles.</p>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}

