"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"
import { useParams } from "next/navigation"
import { toast } from "sonner"

interface Product {
  id: string
  name: string
}

interface DeleteProductDialogProps {
  product: Product
  onProductDeleted: (productId: string) => void
}

export default function DeleteProductDialog({ product, onProductDeleted }: DeleteProductDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const params = useParams()
  const businessSlug = params.businessSlug as string

  const handleDeleteProduct = async () => {
    setIsSubmitting(true)

    try {
      const res = await fetch(`/api/business/${businessSlug}/delete-product/${product.id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        onProductDeleted(product.id)

        // Mostrar toast de éxito
        toast.success("Producto eliminado", {
          description: `${product.name} ha sido eliminado del catálogo.`,
          position: "top-center",
          duration: 3000,
        })
      } else {
        const data = await res.json()
        toast.error("Error al eliminar producto", {
          description: data.error || "Ocurrió un error al eliminar el producto.",
          position: "top-center",
          duration: 4000,
        })
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error)
      toast.error("Error al eliminar producto", {
        description: "Ocurrió un error inesperado. Por favor intenta de nuevo.",
        position: "top-center",
        duration: 4000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon" className="text-destructive hover:bg-destructive/10">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará permanentemente el producto "{product.name}" de tu catálogo. Esta acción no se puede
            deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteProduct}
            disabled={isSubmitting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                Eliminando...
              </>
            ) : (
              "Eliminar producto"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

