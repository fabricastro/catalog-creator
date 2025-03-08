// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/app/lib/prisma";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Todos los campos son obligatorios." }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "El email ya está registrado." }, { status: 400 });
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ message: "Usuario registrado con éxito." }, { status: 201 });
    } catch (error) {
        console.error("Error en el registro:", error);
        return NextResponse.json({ error: "Error en el servidor." }, { status: 500 });
    }
}
