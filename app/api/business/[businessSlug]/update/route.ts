import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function PUT(req: Request, { params }: { params: { businessSlug: string } }) {
    try {
        const { name, description, logoUrl, contact, hours } = await req.json();

        // Generar nuevo slug si el nombre cambia
        const newSlug = name.toLowerCase().replace(/\s+/g, "-");

        // Actualizar los datos del negocio
        const updatedBusiness = await prisma.business.update({
            where: { slug: params.businessSlug },
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
        console.error("Error al actualizar negocio:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}
