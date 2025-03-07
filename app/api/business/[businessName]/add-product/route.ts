// app/api/business/[businessName]/add-product/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(req: Request, { params }: { params: { businessName: string } }) {
    try {
        const { name, description, price, imageUrl } = await req.json();

        if (!name || !price) {
            return NextResponse.json({ error: "Nombre y precio son obligatorios." }, { status: 400 });
        }

        const business = await prisma.business.findUnique({
            where: { name: params.businessName },
        });

        if (!business) {
            return NextResponse.json({ error: "Negocio no encontrado." }, { status: 404 });
        }

        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                imageUrl,
                businessId: business.id,
            },
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error("Error al agregar producto:", error);
        return NextResponse.json({ error: "Error en el servidor." }, { status: 500 });
    }
}