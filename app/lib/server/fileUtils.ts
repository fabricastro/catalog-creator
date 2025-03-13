import fs from "fs"
import path from "path"

// Función para asegurar que exista el directorio de imágenes
export function ensureImageDirectory() {
  const uploadDir = path.join(process.cwd(), "public", "uploads")

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  return uploadDir
}

// Función para generar un nombre de archivo único basado en el ID del producto
export function generateImageFilename(productId: string, originalFilename: string) {
  const extension = path.extname(originalFilename)
  const timestamp = Date.now()
  return `product_${productId}_${timestamp}${extension}`
}

