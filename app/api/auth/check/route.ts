import { NextResponse } from "next/server";
import { cookies } from "next/headers";
const SECRET_KEY = process.env.JWT_SECRET || "supersecreto";
import { verify } from "jsonwebtoken";

export async function GET() {
    try {
        const token = (await cookies()).get("token");
        if (!token) {
            return NextResponse.json({ error: "No autorizado." }, { status: 401 });
        }

        const decoded = verify(token.value, SECRET_KEY);
        return NextResponse.json(decoded, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Token inválido o expirado." }, { status: 401 });
    }
}