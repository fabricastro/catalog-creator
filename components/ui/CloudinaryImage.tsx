"use client"

import { CldImage } from "next-cloudinary"

interface CloudinaryImageProps {
    src: string
    alt: string
    width: number
    height: number
    sizes?: string
    className?: string
    crop?: "fill" | "scale" | "thumb" | "fit" | "limit" | "pad" | "crop" | "minimumPad"
    aspectRatio?: string
    gravity?:
    | "auto"
    | "face"
    | "center"
    | "faces"
    | "north"
    | "northeast"
    | "east"
    | "southeast"
    | "south"
    | "southwest"
    | "west"
    | "northwest"
    placeholder?: "blur" | "empty"
    priority?: boolean
}

export default function CloudinaryImage({
    src,
    alt,
    width,
    height,
    sizes,
    className,
    crop = "fill",
    aspectRatio,
    gravity = "auto",
    placeholder,
    priority = false,
}: CloudinaryImageProps) {
    // Si la imagen no es de Cloudinary, usamos una imagen de respaldo
    if (!src || !src.includes("cloudinary.com")) {
        return (
            <div className={`bg-muted flex items-center justify-center ${className}`} style={{ width, height }}>
                <span className="text-muted-foreground text-sm">{alt || "Imagen no disponible"}</span>
            </div>
        )
    }

    // Extraer el public_id de la URL de Cloudinary
    const getPublicIdFromUrl = (url: string): string => {
        try {
            // Ejemplo de URL: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/public_id.jpg
            const regex = /\/v\d+\/(.+?)(?:\.[^.]+)?$/
            const match = url.match(regex)
            return match ? match[1] : url
        } catch (error) {
            console.error("Error al extraer public_id de URL:", error)
            return url
        }
    }

    const publicId = getPublicIdFromUrl(src)

    return (
        <CldImage
            src={publicId}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            className="h-full w-full object-contain"
            crop={crop}
            gravity={gravity}
            placeholder={placeholder}
            priority={priority}
            {...(aspectRatio ? { aspectRatio } : {})}
        />
    )
}

