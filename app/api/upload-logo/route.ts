import { type NextRequest, NextResponse } from "next/server"
import { ensureLogoDirectory, generateLogoFilename } from "@/app/lib/server/logoUtils"
import fs from "fs"
import path from "path"
import { verify } from "jsonwebtoken"
import { cookies } from "next/headers"

const SECRET_KEY = process.env.JWT_SECRET || "supersecreto"

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const cookieStore = await cookies()
    const tokenCookie = cookieStore.get("token")

    if (!tokenCookie) {
      return NextResponse.json({ error: "No autorizado." }, { status: 401 })
    }

    // Verificar que el token sea válido
    try {
      verify(tokenCookie.value, SECRET_KEY)
    } catch (error) {
      return NextResponse.json({ error: "Token inválido o expirado." }, { status: 401 })
    }

    // Procesar la imagen
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const businessId = formData.get("businessId") as string | null

    if (!file) {
      return NextResponse.json({ error: "No se ha proporcionado ningún archivo." }, { status: 400 })
    }

    if (!businessId) {
      return NextResponse.json({ error: "No se ha proporcionado el ID del negocio." }, { status: 400 })
    }

    // Verificar que el archivo sea una imagen
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: "El archivo debe ser una imagen (JPEG, PNG, WEBP o GIF)." }, { status: 400 })
    }

    // Verificar tamaño máximo (2MB para logos)
    const maxSize = 2 * 1024 * 1024 // 2MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "El logo no debe superar los 2MB." }, { status: 400 })
    }

    // Crear directorio si no existe
    const uploadDir = ensureLogoDirectory()

    // Generar nombre de archivo único
    const filename = generateLogoFilename(businessId, file.name)

    // Ruta completa del archivo
    const filePath = path.join(uploadDir, filename)

    // Convertir el archivo a un ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Guardar el archivo
    fs.writeFileSync(filePath, buffer)

    // Generar URL relativa para acceder a la imagen
    const logoUrl = `/uploads/logos/${filename}`

    return NextResponse.json(
      {
        success: true,
        logoUrl,
        message: "Logo subido correctamente.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error al subir logo:", error)
    return NextResponse.json({ error: "Error en el servidor." }, { status: 500 })
  }
}

