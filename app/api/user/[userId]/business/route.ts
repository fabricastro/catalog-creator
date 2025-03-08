// app/api/user/[userId]/business/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: params.userId },
            include: { business: true }, // Incluye el negocio asociado
        });

        if (!user || !user.business) {
            return NextResponse.json({ error: "Negocio no encontrado." }, { status: 404 });
        }

        return NextResponse.json({ name: user.business.name }, { status: 200 });
    } catch (error) {
        console.error("Error obteniendo el negocio del usuario:", error);
        return NextResponse.json({ error: "Error en el servidor." }, { status: 500 });
    }
}
