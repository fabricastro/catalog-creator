import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request: NextRequest, context: { params: { businessSlug: string } }) {
    try {
        // Esperar `context.params` antes de acceder a `businessSlug`
        const { businessSlug } = await context.params;

        const business = await prisma.business.findUnique({
            where: { slug: businessSlug },
            include: { categories: true },
        });

        if (!business) {
            return NextResponse.json({ error: "Negocio no encontrado" }, { status: 404 });
        }

        return NextResponse.json(business.categories, { status: 200 });
    } catch (error) {
        console.error("Error obteniendo categorías:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}


export async function POST(request: NextRequest, context: { params: { businessSlug: string } }) {
    try {
        const { name } = await request.json();
        if (!name) return NextResponse.json({ error: "Nombre requerido" }, { status: 400 });

        // Esperar `context.params` para obtener el `businessSlug`
        const { businessSlug } = await context.params;

        // Obtener el negocio por el `businessSlug`
        const business = await prisma.business.findUnique({
            where: { slug: businessSlug },
        });

        if (!business) {
            return NextResponse.json({ error: "Negocio no encontrado" }, { status: 404 });
        }

        // Crear la categoría asociada al negocio
        const newCategory = await prisma.category.create({
            data: {
                name,
                business: { connect: { id: business.id } }  // Asociar la categoría con el negocio
            },
        });

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        console.error("Error al crear categoría:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}
