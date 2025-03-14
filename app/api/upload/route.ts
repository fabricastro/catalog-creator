import { type NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const id = formData.get("id") as string | null;
    const type = formData.get("type") as "product" | "business" | null;

    if (!file) {
      return NextResponse.json({ error: "No se ha proporcionado ningún archivo." }, { status: 400 });
    }

    if (!id) {
      return NextResponse.json({ error: "No se ha proporcionado el ID del producto o negocio." }, { status: 400 });
    }

    if (!type || (type !== "product" && type !== "business")) {
      return NextResponse.json({ error: "Tipo de imagen no válido." }, { status: 400 });
    }

    // Convertir el archivo a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Determinar la carpeta según el tipo
    const folder = type === "product" ? "products" : "businesses";

    // Subir imagen a Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: `${type}_${id}_${Date.now()}`,
          resource_type: "image",
          transformation: [{ width: 800, height: 600, crop: "fit" }],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({ success: true, imageUrl: (result as any).secure_url }, { status: 200 });
  } catch (error) {
    console.error("❌ Error al subir imagen:", error);
    return NextResponse.json({ error: "Error en el servidor." }, { status: 500 });
  }
}
