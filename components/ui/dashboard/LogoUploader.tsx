"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface LogoUploaderProps {
  businessId: string
  businessName: string
  currentLogoUrl?: string
  onLogoUploaded: (logoUrl: string) => void
}

export default function LogoUploader({ businessId, businessName, currentLogoUrl, onLogoUploaded }: LogoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentLogoUrl || null)
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

    // Validar tamaño (2MB máximo para logos)
    const maxSize = 2 * 1024 * 1024
    if (file.size > maxSize) {
      setError("El logo no debe superar los 2MB.")
      return
    }

    // Crear URL de vista previa
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)
    setError(null)

    // Subir el logo al servidor
    await uploadLogo(file)
  }

  const uploadLogo = async (file: File) => {
    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("businessId", businessId)

      const response = await fetch("/api/upload-logo", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al subir el logo")
      }

      // Llamar al callback con la URL del logo
      onLogoUploaded(data.logoUrl)
    } catch (error) {
      console.error("Error al subir logo:", error)
      setError(error instanceof Error ? error.message : "Error al subir el logo")
      // Si hay error, mantenemos el logo anterior si existe
      setPreviewUrl(currentLogoUrl || null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveLogo = () => {
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    onLogoUploaded("")
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
      />

      <div className="flex items-center gap-4">
        {previewUrl ? (
          <div className="relative">
            <Avatar className="h-24 w-24 border">
              <AvatarImage src={previewUrl} alt={businessName} />
              <AvatarFallback className="text-2xl">{businessName.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-90"
              onClick={handleRemoveLogo}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div
            onClick={triggerFileInput}
            className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-full border border-dashed border-border bg-muted/50 hover:bg-muted"
          >
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-sm font-medium">Logo del negocio</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Sube una imagen para tu negocio. Se recomienda una imagen cuadrada de al menos 200x200 píxeles.
          </p>
          {error && <p className="text-xs text-destructive mt-1">{error}</p>}
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full"
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
            {previewUrl ? "Cambiar logo" : "Subir logo"}
          </>
        )}
      </Button>
    </div>
  )
}

