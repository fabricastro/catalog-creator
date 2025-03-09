import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(req: Request, { params }: { params: { businessSlug: string } }) {
    try {
        const { name, description, price, imageUrl } = await req.json();

        // Buscar el negocio por su slug
        const business = await prisma.business.findUnique({
            where: { slug: params.businessSlug },
        });

        if (!business) {
            return NextResponse.json({ error: "Negocio no encontrado" }, { status: 404 });
        }

        // Crear el nuevo producto
        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price,
                imageUrl,
                businessId: business.id, // Relación con el negocio
            },
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error("Error al agregar producto:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}
