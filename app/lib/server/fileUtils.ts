import fs from "fs";
import path from "path";

// 📂 Usar `/tmp/uploads` en lugar de `public/uploads`
export function ensureImageDirectory() {
  const uploadDir = path.join("/tmp", "uploads");

  if (!fs.existsSync(uploadDir)) {
    console.log("📂 Creando carpeta de uploads en /tmp...");
    fs.mkdirSync(uploadDir, { recursive: true });
  } else {
    console.log("✅ Carpeta de uploads existente:", uploadDir);
  }

  return uploadDir;
}

// ✅ Genera un nombre de archivo único
export function generateImageFilename(id: string, type: "product" | "business", originalFilename: string) {
  const extension = path.extname(originalFilename);
  const timestamp = Date.now();
  return `${type}_${id}_${timestamp}${extension}`;
}
