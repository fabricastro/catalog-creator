import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(req: Request, context: { params: { businessSlug: string } }) {
    try {
        const { params } = context;
        
        if (!params?.businessSlug) {
            return NextResponse.json({ error: "Parámetro businessSlug faltante" }, { status: 400 });
        }

        console.log("🔍 Buscando negocio con slug:", params.businessSlug);

        const business = await prisma.business.findUnique({
            where: { slug: params.businessSlug },
            include: {
                products: {
                    include: { category: true },
                },
            },
        });

        if (!business) {
            return NextResponse.json({ error: "Negocio no encontrado" }, { status: 404 });
        }

        return NextResponse.json({
            name: business.name,
            slug: business.slug,
            description: business.description,
            logoUrl: business.logoUrl,
            products: business.products,
            hours: business.hours,
            contact: business.contact,
        }, { status: 200 });

    } catch (error) {
        console.error("❌ Error obteniendo negocio:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}
