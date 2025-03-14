"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useParams } from "next/navigation"
import ImageUploader from "./ImageUploader"
import { toast } from "sonner"

interface Category {
  id: string
  name: string
}

interface AddProductDialogProps {
  businessName: string
  setBusiness: (business: any) => void
}

export default function AddProductDialog({ businessName, setBusiness }: AddProductDialogProps) {
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", imageUrl: "" })
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const params = useParams()
  const businessSlug = params.businessSlug as string

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`/api/business/${encodeURIComponent(businessSlug)}/categories`)
        if (!res.ok) throw new Error("Error al obtener categorías")
        const data = await res.json()
        setCategories(data) // Guardar las categorías como { id, name }
      } catch (error) {
        console.error("❌ Error al obtener categorías:", error)
        toast.error("Error al cargar categorías", {
          description: "No se pudieron cargar las categorías. Intenta nuevamente.",
          position: "top-center",
          duration: 3000,
        })
      }
    }

    if (isOpen) {
      fetchCategories()
    }
  }, [businessSlug, isOpen])

  const handleImageUploaded = (imageUrl: string) => {
    setNewProduct((prev) => ({ ...prev, imageUrl }))
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const newProductData = {
        ...newProduct,
        price: Number.parseFloat(newProduct.price), // ✅ Convertir a número
        categoryId: selectedCategory || undefined, // ✅ Enviar el ID de la categoría
      }

      const res = await fetch(`/api/business/${businessName}/add-product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProductData),
      })

      const data = await res.json()
      if (res.ok) {
        setBusiness((prev: any) => (prev ? { ...prev, products: [...prev.products, data] } : prev))
        setNewProduct({ name: "", description: "", price: "", imageUrl: "" })
        setSelectedCategory("")
        setIsOpen(false)

        // Mostrar toast de éxito
        toast.success("Producto agregado", {
          description: `${newProduct.name} ha sido agregado al catálogo.`,
          position: "top-center",
          duration: 3000,
        })
      } else {
        toast.error("Error al agregar producto", {
          description: data.error || "Ocurrió un error al agregar el producto.",
          position: "top-center",
          duration: 4000,
        })
      }
    } catch (error) {
      console.error("Error al agregar producto:", error)
      toast.error("Error al agregar producto", {
        description: "Ocurrió un error inesperado. Por favor intenta de nuevo.",
        position: "top-center",
        duration: 4000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Agregar producto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Agregar nuevo producto</DialogTitle>
          <DialogDescription>Completa los detalles del producto para agregarlo a tu catálogo.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddProduct}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Categoría</Label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded p-2"
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Imagen del producto</Label>
              <ImageUploader onImageUploaded={handleImageUploaded} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Guardando...
                </>
              ) : (
                "Guardar producto"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

