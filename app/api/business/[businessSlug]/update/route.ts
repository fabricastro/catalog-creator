import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

export async function PUT(request: NextRequest, context: { params: { businessSlug: string } }) {
    try {
        const { businessSlug } = await context.params;
        const { name, description, logoUrl, contact, hours } = await request.json()

        // Generar nuevo slug si el nombre cambia
        const newSlug = name.toLowerCase().replace(/\s+/g, "-")

        // Actualizar los datos del negocio
        const updatedBusiness = await prisma.business.update({
            where: { slug: businessSlug },
            data: {
                name,
                slug: newSlug,
                description,
                logoUrl,
                contact,
                hours,
            },
        })

        return NextResponse.json(updatedBusiness, { status: 200 })
    } catch (error) {
        console.error("Error al actualizar negocio:", error)
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 })
    }
}

