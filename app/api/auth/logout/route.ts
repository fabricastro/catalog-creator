import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    try {
        (await cookies()).delete("token");
        return NextResponse.json({ message: "Sesión cerrada correctamente." }, { status: 200 });
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        return NextResponse.json({ error: "Error en el servidor." }, { status: 500 });
    }
}