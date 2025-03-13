import { type NextRequest, NextResponse } from "next/server";
import { ensureImageDirectory, generateImageFilename } from "@/app/lib/server/fileUtils";
import fs from "fs";
import path from "path";
import prisma from "@/app/lib/prisma";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET || "supersecreto";

export async function POST(request: NextRequest) {
  try {
    // 🔐 Verificar autenticación
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("token");

    if (!tokenCookie) {
      return NextResponse.json({ error: "No autorizado." }, { status: 401 });
    }

    verify(tokenCookie.value, SECRET_KEY);

    // 📂 Procesar el formData
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const businessId = formData.get("businessId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No se ha proporcionado ningún archivo." }, { status: 400 });
    }

    if (!businessId) {
      return NextResponse.json({ error: "No se ha proporcionado el ID del negocio." }, { status: 400 });
    }

    console.log(`📂 Recibido archivo: ${file.name}, para el negocio ID: ${businessId}`);

    // 📂 Crear carpeta si no existe
    const uploadDir = ensureImageDirectory();
    console.log("📂 Carpeta de subida:", uploadDir);

    // 🏷 Generar nombre único para el archivo
    const filename = generateImageFilename(businessId, "business", file.name);
    const filePath = path.join(uploadDir, filename);
    console.log("📁 Guardando en:", filePath);

    // 📤 Guardar el archivo
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filePath, buffer);
    console.log("✅ Archivo guardado correctamente");

    // 🌎 Generar URL de acceso (cambiar para que funcione con `/tmp/uploads`)
    const imageUrl = `/uploads/${filename}`;
    console.log("🌍 URL de imagen:", imageUrl);

    // 🏢 Actualizar `logoUrl` en la base de datos
    await prisma.business.update({
      where: { id: businessId },
      data: { logoUrl: imageUrl },
    });

    return NextResponse.json({ success: true, imageUrl, message: "Logo actualizado correctamente." }, { status: 200 });
  } catch (error) {
    console.error("❌ Error al subir logo:", error);
    return NextResponse.json({ error: "Error en el servidor." }, { status: 500 });
  }
}
