import { type NextRequest, NextResponse } from "next/server"
import  prisma  from "@/app/lib/prisma"

export async function PUT(request: NextRequest, { params }: { params: { businessSlug: string; productId: string } }) {
  try {
    // Verificar que los parámetros existan
    if (!params || !params.businessSlug || !params.productId) {
      return NextResponse.json({ error: "Parámetros de ruta inválidos" }, { status: 400 })
    }

    const { businessSlug, productId } = params

    // Obtener los datos del cuerpo de la solicitud
    const { name, description, price, imageUrl, categoryId } = await request.json()

    // Verificar que el negocio existe
    const business = await prisma.business.findUnique({
      where: { slug: businessSlug },
    })

    if (!business) {
      return NextResponse.json({ error: "Negocio no encontrado" }, { status: 404 })
    }

    // Verificar que el producto existe y pertenece al negocio
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productId,
        businessId: business.id,
      },
    })

    if (!existingProduct) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    // Actualizar el producto
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        price: typeof price === "string" ? Number.parseFloat(price) : price,
        imageUrl,
        categoryId: categoryId || null,
      },
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error("Error al actualizar el producto:", error)
    return NextResponse.json({ error: "Error al actualizar el producto" }, { status: 500 })
  }
}

