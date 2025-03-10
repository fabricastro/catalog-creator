import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

export async function POST(request: NextRequest, { params }: { params: { businessSlug: string } }) {
    try {
        // ✅ Extraer correctamente los params
        const { businessSlug } = params
        const { name, description, price, imageUrl, categoryId } = await request.json()

        // ✅ Convertir `price` a número si llega como string
        const parsedPrice = Number.parseFloat(price)
        if (isNaN(parsedPrice)) {
            return NextResponse.json({ error: "El precio debe ser un número válido" }, { status: 400 })
        }

        // Buscar el negocio por `slug`
        const business = await prisma.business.findUnique({
            where: { slug: businessSlug },
        })

        if (!business) {
            return NextResponse.json({ error: "Negocio no encontrado" }, { status: 404 })
        }

        // Verificar si la categoría existe
        if (categoryId) {
            const categoryExists = await prisma.category.findUnique({
                where: { id: categoryId },
            })

            if (!categoryExists) {
                return NextResponse.json({ error: "Categoría no encontrada" }, { status: 400 })
            }
        }

        // Crear el nuevo producto con la categoría asignada
        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price: parsedPrice, // ✅ Ahora es Float
                imageUrl,
                businessId: business.id,
                categoryId: categoryId || null, // Puede ser null si no se elige una categoría
            },
        })

        return NextResponse.json(newProduct, { status: 201 })
    } catch (error) {
        console.error("Error al agregar producto:", error)
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 })
    }
}

