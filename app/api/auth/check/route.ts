import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import prisma from "@/app/lib/prisma";

const SECRET_KEY = process.env.JWT_SECRET || "supersecreto";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get("token");

        if (!tokenCookie) {
            return NextResponse.json({ error: "No autorizado." }, { status: 401 });
        }

        const decoded: any = verify(tokenCookie.value, SECRET_KEY);

        // Obtener datos completos del usuario desde la DB
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            include: { business: true },
        });

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
        }

        return NextResponse.json({
            id: user.id,
            email: user.email,
            business: user.business ? {
                id: user.business.id,
                name: user.business.name,
                slug: user.business.slug,
                logoUrl: user.business.logoUrl,
            } : null,
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Token inválido o expirado." }, { status: 401 });
    }
}
