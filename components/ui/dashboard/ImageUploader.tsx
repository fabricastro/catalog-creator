"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ImageUploaderProps {
    productId?: string
    currentImageUrl?: string
    onImageUploaded: (imageUrl: string) => void
}

export default function ImageUploader({ productId, currentImageUrl, onImageUploaded }: ImageUploaderProps) {
    const [isUploading, setIsUploading] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validar tipo de archivo
        const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
        if (!validTypes.includes(file.type)) {
            setError("Por favor selecciona una imagen (JPEG, PNG, WEBP o GIF).")
            return
        }

        // Validar tamaño (5MB máximo)
        const maxSize = 5 * 1024 * 1024
        if (file.size > maxSize) {
            setError("La imagen no debe superar los 5MB.")
            return
        }

        // Crear URL de vista previa
        const objectUrl = URL.createObjectURL(file)
        setPreviewUrl(objectUrl)
        setError(null)

        // Si no hay ID de producto, solo mostramos la vista previa
        if (!productId) {
            onImageUploaded(objectUrl)
            return
        }

        // Subir la imagen al servidor
        await uploadImage(file, productId)
    }

    const uploadImage = async (file: File, productId: string) => {
        setIsUploading(true)
        setError(null)

        try {
            const formData = new FormData()
            formData.append("file", file)
            formData.append("productId", productId)

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Error al subir la imagen")
            }

            // Llamar al callback con la URL de la imagen
            onImageUploaded(data.imageUrl)
        } catch (error) {
            console.error("Error al subir imagen:", error)
            setError(error instanceof Error ? error.message : "Error al subir la imagen")
            // Si hay error, mantenemos la imagen anterior si existe
            setPreviewUrl(currentImageUrl || null)
        } finally {
            setIsUploading(false)
        }
    }

    const handleRemoveImage = () => {
        setPreviewUrl(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
        onImageUploaded("")
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="space-y-2">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
            />

            {previewUrl ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border">
                    <Image src={previewUrl || "/placeholder.svg"} alt="Vista previa" fill className="object-cover" unoptimized />
                    <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-90"
                        onClick={handleRemoveImage}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <div
                    onClick={triggerFileInput}
                    className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-border bg-muted/50 hover:bg-muted"
                >
                    <ImageIcon className="mb-2 h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Haz clic para subir una imagen</p>
                    <p className="text-xs text-muted-foreground mt-1">JPEG, PNG, WEBP o GIF (máx. 5MB)</p>
                </div>
            )}

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 w-full"
                onClick={triggerFileInput}
                disabled={isUploading}
            >
                {isUploading ? (
                    <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Subiendo...
                    </>
                ) : (
                    <>
                        <Upload className="mr-2 h-4 w-4" />
                        {previewUrl ? "Cambiar imagen" : "Subir imagen"}
                    </>
                )}
            </Button>
        </div>
    )
}

