import fs from "fs"
import path from "path"

// Función para asegurar que exista el directorio de logos
export function ensureLogoDirectory() {
    const uploadDir = path.join(process.cwd(), "public", "uploads", "logos")

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
    }

    return uploadDir
}

// Función para generar un nombre de archivo único para logos
export function generateLogoFilename(businessId: string, originalFilename: string) {
    const extension = path.extname(originalFilename)
    const timestamp = Date.now()
    return `logo_${businessId}_${timestamp}${extension}`
}

