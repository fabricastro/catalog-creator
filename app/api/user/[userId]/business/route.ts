import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request: NextRequest, context: { params: { userId: string } }) {
    try {
        const { userId } = await context.params;

        if (!userId) {
            return NextResponse.json({ error: "Parámetro userId faltante" }, { status: 400 });
        }
        
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { business: true },
        });

        if (!user || !user.business) {
            return NextResponse.json({ error: "Negocio no encontrado para este usuario" }, { status: 404 });
        }

        return NextResponse.json(user.business, { status: 200 });
    } catch (error) {
        console.error("Error obteniendo negocio del usuario:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}
