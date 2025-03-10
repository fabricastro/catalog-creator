import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function PUT(req: Request, { params }: { params: { businessSlug: string, productId: string } }) {
    try {
        const { name, description, price, imageUrl, categoryId } = await req.json();

        // Buscar el negocio por su slug
        const business = await prisma.business.findUnique({
            where: { slug: params.businessSlug },
        });

        if (!business) {
            return NextResponse.json({ error: "Negocio no encontrado" }, { status: 404 });
        }

        // Actualizar el producto
        const updatedProduct = await prisma.product.update({
            where: { id: params.productId },
            data: {
                name,
                description,
                price: parseFloat(price),
                imageUrl,
                categoryId: categoryId || null,
            },
        });

        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}
