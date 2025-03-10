import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

export async function DELETE(
    request: NextRequest,
    { params }: { params: { businessSlug: string; productId: string } },
) {
    try {
        // Buscar el negocio por su slug
        const business = await prisma.business.findUnique({
            where: { slug: params.businessSlug },
        })

        if (!business) {
            return NextResponse.json({ error: "Negocio no encontrado" }, { status: 404 })
        }

        // Eliminar el producto
        await prisma.product.delete({
            where: { id: params.productId, businessId: business.id },
        })

        return NextResponse.json({ message: "Producto eliminado correctamente" }, { status: 200 })
    } catch (error) {
        console.error("Error al eliminar producto:", error)
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 })
    }
}

