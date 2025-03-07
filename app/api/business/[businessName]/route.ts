// app/api/business/[businessName]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(req: Request, { params }: { params: { businessName: string } }) {
    try {
        const business = await prisma.business.findUnique({
            where: { name: params.businessName },
            include: {
                products: true, // Incluir productos relacionados
            },
        });

        if (!business) {
            return NextResponse.json({ error: "Negocio no encontrado" }, { status: 404 });
        }

        return NextResponse.json({
            name: business.name,
            description: business.description,
            logoUrl: business.logoUrl,
            products: business.products,
        }, { status: 200 });
    } catch (error) {
        console.error("Error obteniendo negocio:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}