"use client";

import { useState, useRef } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CloudinaryImage from "@/components/ui/CloudinaryImage";

interface ImageUploaderProps {
    productId: string;
    currentImageUrl?: string;
    onImageUploaded: (imageUrl: string) => void;
}

export default function ImageUploader({ productId, currentImageUrl, onImageUploaded }: ImageUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validar tipo y tamaño del archivo
        const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!validTypes.includes(file.type)) {
            setError("Formato no válido (JPEG, PNG, WEBP o GIF).");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("La imagen no debe superar los 5MB.");
            return;
        }

        // Vista previa
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        setError(null);

        // Subir imagen
        await uploadImage(file);
    };

    const uploadImage = async (file: File) => {
        setIsUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("id", productId);
            formData.append("type", "product"); // ✅ Especificar que es un producto

            const response = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Error al subir la imagen");

            onImageUploaded(data.imageUrl);
            setPreviewUrl(data.imageUrl); // ✅ Guardamos la URL de Cloudinary
        } catch (error) {
            console.error("Error al subir imagen:", error);
            setError("Error al subir la imagen");
            setPreviewUrl(currentImageUrl || null);
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveImage = () => {
        setPreviewUrl(null);
        fileInputRef.current && (fileInputRef.current.value = "");
        onImageUploaded("");
    };

    return (
        <div className="w-full space-y-2">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

            <div className="relative w-full h-48 border rounded-md overflow-hidden flex items-center justify-center">
                {isUploading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                        <div className="h-10 w-10 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : previewUrl ? (
                    <CloudinaryImage
                        src={previewUrl}
                        alt="Vista previa"
                        width={800}
                        height={600}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
                        <ImageIcon className="h-10 w-10 text-gray-400" />
                    </div>
                )}
            </div>
            <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                {isUploading ? "Subiendo..." : "Subir imagen"}
            </Button>

            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}  
