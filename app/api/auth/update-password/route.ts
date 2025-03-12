import { NextResponse } from "next/server"
import { hash, compare } from "bcryptjs"
import prisma from "@/app/lib/prisma"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"

const SECRET_KEY = process.env.JWT_SECRET || "supersecreto"

export async function PUT(req: Request) {
    try {
        const cookieStore = await cookies()
        const tokenCookie = cookieStore.get("token")

        if (!tokenCookie) {
            return NextResponse.json({ error: "No autorizado." }, { status: 401 })
        }

        const decoded: any = verify(tokenCookie.value, SECRET_KEY)
        const { currentPassword, newPassword } = await req.json()

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: "Todos los campos son obligatorios." }, { status: 400 })
        }

        const user = await prisma.user.findUnique({ where: { id: decoded.id } })
        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 })
        }

        const isValidPassword = await compare(currentPassword, user.password)
        if (!isValidPassword) {
            return NextResponse.json({ error: "Contraseña actual incorrecta." }, { status: 401 })
        }

        const hashedPassword = await hash(newPassword, 10)
        await prisma.user.update({
            where: { id: decoded.id },
            data: { password: hashedPassword },
        })

        return NextResponse.json({ message: "Contraseña actualizada exitosamente." }, { status: 200 })
    } catch (error) {
        console.error("❌ Error actualizando contraseña:", error)
        return NextResponse.json({ error: "Error en el servidor." }, { status: 500 })
    }
}
