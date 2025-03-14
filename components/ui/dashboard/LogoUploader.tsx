"use client";

import { useState, useRef } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CloudinaryImage from "@/components/ui/CloudinaryImage";

interface LogoUploaderProps {
  businessId: string;
  currentLogoUrl?: string;
  onLogoUploaded: (logoUrl: string) => void;
}

export default function LogoUploader({ businessId, currentLogoUrl, onLogoUploaded }: LogoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentLogoUrl || null);
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
    await uploadLogo(file);
  };

  const uploadLogo = async (file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", businessId);
      formData.append("type", "business"); // ✅ Especificar que es un logo de negocio

      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Error al subir el logo");

      onLogoUploaded(data.imageUrl);
      setPreviewUrl(data.imageUrl); // ✅ Guardamos la URL de Cloudinary
    } catch (error) {
      console.error("Error al subir logo:", error);
      setError("Error al subir el logo");
      setPreviewUrl(currentLogoUrl || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveLogo = () => {
    setPreviewUrl(null);
    fileInputRef.current && (fileInputRef.current.value = "");
    onLogoUploaded("");
  };

  return (
    <div className="space-y-4">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

      <div className="flex items-center justify-center gap-4">
        {previewUrl ? (
          <div className="relative">
            <CloudinaryImage src={previewUrl} alt="Logo" width={200} height={200} className="h-24 w-24 border p-4" />
            <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6" onClick={handleRemoveLogo}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer flex h-24 w-24 items-center justify-center rounded-full border border-dashed bg-muted/50 hover:bg-muted">
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
      </div>

      <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
        {isUploading ? "Subiendo..." : "Subir logo"}
      </Button>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
