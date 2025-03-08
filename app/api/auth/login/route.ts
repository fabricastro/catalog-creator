// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import prisma from "@/app/lib/prisma";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET || "supersecreto";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Todos los campos son obligatorios." }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado." }, { status: 400 });
        }

        const isValidPassword = await compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json({ error: "Contraseña incorrecta." }, { status: 401 });
        }

        const token = sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "7d" });
        cookies().set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 7 });

        return NextResponse.json({ message: "Inicio de sesión exitoso.", id: user.id }, { status: 200 });
    } catch (error) {
        console.error("Error en el login:", error);
        return NextResponse.json({ error: "Error en el servidor." }, { status: 500 });
    }
}
