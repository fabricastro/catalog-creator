import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/app/lib/prisma";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET || "supersecreto";

export async function POST(req: Request) {
    try {
        const { email, password, businessName } = await req.json();

        if (!email || !password || !businessName) {
            return NextResponse.json({ error: "Todos los campos son obligatorios." }, { status: 400 });
        }

        // Convertir espacios en guiones medios y eliminar caracteres especiales
        const formattedBusinessName = businessName
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");

        // Verificar si el email ya está registrado
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "El email ya está registrado." }, { status: 400 });
        }

        // Verificar si el nombre del negocio ya está en uso
        const existingBusiness = await prisma.business.findUnique({ where: { name: formattedBusinessName } });
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
                        name: formattedBusinessName,
                    },
                },
            },
        });

        // Generar token y mantener la sesión iniciada
        const token = sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "7d" });
        (await cookies()).set({
            name: "token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return NextResponse.json({ message: "Usuario registrado con éxito.", businessName: formattedBusinessName }, { status: 201 });
    } catch (error) {
        console.error("Error en el registro:", error);
        return NextResponse.json({ error: "Error en el servidor." }, { status: 500 });
    }
}
