import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET() {
    try {
        const categories = await prisma.category.findMany();
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error("Error obteniendo categorías:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name } = await req.json();
        if (!name) return NextResponse.json({ error: "Nombre requerido" }, { status: 400 });

        const newCategory = await prisma.category.create({
            data: { name },
        });

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        console.error("Error al crear categoría:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}

// ✅ Método PUT para actualizar una categoría
export async function PUT(req: Request) {
    try {
        const { id, name } = await req.json();

        if (!id || !name) {
            return NextResponse.json({ error: "ID y nombre son requeridos" }, { status: 400 });
        }

        const updatedCategory = await prisma.category.update({
            where: { id },
            data: { name },
        });

        return NextResponse.json(updatedCategory, { status: 200 });
    } catch (error) {
        console.error("Error al actualizar categoría:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}
