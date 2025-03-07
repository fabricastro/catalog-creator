// app/api/register/route.ts (Usando App Router y Prisma)
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/app/lib/prisma";

export async function POST(req: Request) {
    try {
        const { email, password, businessName } = await req.json();

        if (!email || !password || !businessName) {
            return NextResponse.json({ error: "Todos los campos son obligatorios." }, { status: 400 });
        }

        // Verificar si el email ya está registrado
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "El email ya está registrado." }, { status: 400 });
        }

        // Verificar si el nombre del negocio ya está en uso
        const existingBusiness = await prisma.business.findUnique({ where: { name: businessName } });
        if (existingBusiness) {
            return NextResponse.json({ error: "El nombre del negocio ya está en uso." }, { status: 400 });
        }

        // Hashear la contraseña
        const hashedPassword = await hash(password, 10);

        // Crear usuario y negocio en la base de datos
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                business: {
                    create: {
                        name: businessName,
                    },
                },
            },
        });

        return NextResponse.json({ message: "Usuario registrado con éxito.", businessName }, { status: 201 });
    } catch (error) {
        console.error("Error en el registro:", error);
        return NextResponse.json({ error: "Error en el servidor." }, { status: 500 });
    }
}
