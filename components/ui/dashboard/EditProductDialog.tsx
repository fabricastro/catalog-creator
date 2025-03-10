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
import { Edit } from "lucide-react"

interface Category {
    id: string
    name: string
}

interface EditProductDialogProps {
    product: any
    businessName: string
    setBusiness: (business: any) => void
}

export default function EditProductDialog({ product, businessName, setBusiness }: EditProductDialogProps) {
    const [editingProduct, setEditingProduct] = useState({ ...product, categoryId: product.categoryId || "" })
    const [categories, setCategories] = useState<Category[]>([])
    const [isOpen, setIsOpen] = useState(false)

    // Cargar categorías cuando se abre el modal
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`/api/business/${businessName}/categories`)
                if (!res.ok) throw new Error("Error al obtener categorías")
                const data = await res.json()
                setCategories(data)
            } catch (error) {
                console.error("❌ Error al obtener categorías:", error)
            }
        }

        if (isOpen) {
            fetchCategories()
        }
    }, [isOpen, businessName])

    const handleEditProduct = async (e: React.FormEvent) => {
        e.preventDefault()
        const updatedProduct = {
            ...editingProduct,
            price: Number.parseFloat(editingProduct.price), // ✅ Convertir a número
        }

        const res = await fetch(`/api/business/${businessName}/update-product/${editingProduct.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProduct),
        })

        const data = await res.json()
        if (res.ok) {
            setBusiness((prev: any) =>
                prev ? { ...prev, products: prev.products.map((prod) => (prod.id === data.id ? data : prod)) } : prev,
            )
            setIsOpen(false)
        } else {
            alert("Error al actualizar el producto: " + data.error)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
                    <Edit className="h-4 w-4 mr-1" /> Editar
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Editar producto</DialogTitle>
                    <DialogDescription>Actualiza los detalles del producto.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleEditProduct}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name">Nombre</Label>
                            <Input
                                id="edit-name"
                                value={editingProduct.name}
                                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-description">Descripción</Label>
                            <Textarea
                                id="edit-description"
                                value={editingProduct.description}
                                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                rows={3}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-category">Categoría</Label>
                            <select
                                id="edit-category"
                                value={editingProduct.categoryId}
                                onChange={(e) => setEditingProduct({ ...editingProduct, categoryId: e.target.value })}
                                className="border rounded p-2"
                                required
                            >
                                <option value="" disabled>
                                    Selecciona una categoría
                                </option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-price">Precio</Label>
                            <Input
                                id="edit-price"
                                type="number"
                                value={editingProduct.price}
                                onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-imageUrl">URL de la imagen</Label>
                            <Input
                                id="edit-imageUrl"
                                value={editingProduct.imageUrl}
                                onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                                placeholder="https://ejemplo.com/imagen.jpg"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit">Actualizar producto</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

