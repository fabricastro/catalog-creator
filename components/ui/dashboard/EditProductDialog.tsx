"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { Edit } from "lucide-react"
import { useParams } from "next/navigation"
import ImageUploader from "./ImageUploader"
import { toast } from "sonner"

interface Category {
  id: string
  name: string
}

interface Product {
  id: string
  name: string
  description: string
  price: number | string
  imageUrl?: string
  categoryId?: string
}

interface EditProductDialogProps {
  product: Product
  businessName: string
  setBusiness: (business: any) => void
}

export default function EditProductDialog({ product, businessName, setBusiness }: EditProductDialogProps) {
  const [editedProduct, setEditedProduct] = useState<Product>({ ...product })
  const [categories, setCategories] = useState<Category[]>([])
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
        setCategories(data)
      } catch (error) {
        console.error("Error al obtener categorías:", error)
        toast.error("Error al cargar categorías", {
          description: "No se pudieron cargar las categorías. Intenta nuevamente.",
          position: "top-center",
          duration: 3000,
        })
      }
    }

    if (isOpen) {
      fetchCategories()
      // Asegurarse de que el producto tenga los datos actualizados
      setEditedProduct({ ...product })
    }
  }, [businessSlug, isOpen, product])

  const handleImageUploaded = (imageUrl: string) => {
    setEditedProduct((prev) => ({ ...prev, imageUrl }))
  }

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch(`/api/business/${businessSlug}/update-product/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedProduct),
      })

      const data = await res.json()

      if (res.ok) {
        // Actualizar el estado del negocio con el producto actualizado
        setBusiness((prev: any) => {
          if (!prev) return prev

          return {
            ...prev,
            products: prev.products.map((p: any) => (p.id === product.id ? data : p)),
          }
        })

        setIsOpen(false)

        // Mostrar toast de éxito
        toast.success("Producto actualizado", {
          description: `${editedProduct.name} ha sido actualizado correctamente.`,
          position: "top-center",
          duration: 3000,
        })
      } else {
        toast.error("Error al actualizar producto", {
          description: data.error || "Ocurrió un error al actualizar el producto.",
          position: "top-center",
          duration: 4000,
        })
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error)
      toast.error("Error al actualizar producto", {
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
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-1" /> Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar producto</DialogTitle>
          <DialogDescription>Modifica los detalles del producto.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdateProduct}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={editedProduct.name}
                onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={editedProduct.description}
                onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Categoría</Label>
              <select
                id="category"
                value={editedProduct.categoryId || ""}
                onChange={(e) => setEditedProduct({ ...editedProduct, categoryId: e.target.value || undefined })}
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
                value={editedProduct.price}
                onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Imagen del producto</Label>
              <div className="flex items-center gap-4">
                {editedProduct.imageUrl && (
                  <div className="w-16 h-16 relative rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={editedProduct.imageUrl || "/placeholder.svg"}
                      alt={editedProduct.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <ImageUploader onImageUploaded={handleImageUploaded} />
              </div>
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
                  Actualizando...
                </>
              ) : (
                "Actualizar producto"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}