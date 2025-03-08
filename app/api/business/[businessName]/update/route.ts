// app/api/business/[businessName]/update/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "supersecreto";

export async function PUT(req: Request, { params }: { params: { businessName: string } }) {
    try {
        const token = cookies().get("token");
        if (!token) {
            return NextResponse.json({ error: "No autorizado." }, { status: 401 });
        }

        let decoded;
        try {
            decoded = verify(token.value, SECRET_KEY);
        } catch (error) {
            return NextResponse.json({ error: "Token inválido." }, { status: 401 });
        }

        const { name, description, logoUrl, contact, hours } = await req.json();

        const business = await prisma.business.findUnique({ where: { name: params.businessName } });
        if (!business) {
            return NextResponse.json({ error: "Negocio no encontrado." }, { status: 404 });
        }

        if (business.userId !== decoded.id) {
            return NextResponse.json({ error: "No tienes permisos para modificar este negocio." }, { status: 403 });
        }

        const updatedBusiness = await prisma.business.update({
            where: { name: params.businessName },
            data: {
                name,
                description,
                logoUrl,
                contact,
                hours,
            },
        });

        return NextResponse.json({ message: "Negocio actualizado correctamente", business: updatedBusiness }, { status: 200 });
    } catch (error) {
        console.error("Error actualizando negocio:", error);
        return NextResponse.json({ error: "Error en el servidor." }, { status: 500 });
    }
}
