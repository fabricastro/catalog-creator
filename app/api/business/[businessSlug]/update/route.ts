import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

export async function PUT(request: NextRequest, context: { params: { businessSlug: string } }) {
    try {
        const { businessSlug } = await context.params;
        const { name, description, logoUrl, contact, hours } = await request.json();

        // Generar nuevo slug asegurando que no se repita
        let newSlug = name.toLowerCase().replace(/\s+/g, "-");
        let existingBusiness = await prisma.business.findUnique({ where: { slug: newSlug } });

        let counter = 1;
        while (existingBusiness && existingBusiness.slug !== businessSlug) {
            newSlug = `${newSlug}-${counter}`;
            existingBusiness = await prisma.business.findUnique({ where: { slug: newSlug } });
            counter++;
        }

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
        });

        return NextResponse.json(updatedBusiness, { status: 200 });
    } catch (error) {
        console.error("❌ Error al actualizar negocio:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}

