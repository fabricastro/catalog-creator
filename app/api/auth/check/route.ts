import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "supersecreto";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get("token");

        if (!tokenCookie) {
            return NextResponse.json({ error: "No autorizado." }, { status: 401 });
        }

        const decoded = verify(tokenCookie.value, SECRET_KEY);
        return NextResponse.json(decoded, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Token inválido o expirado." }, { status: 401 });
    }
}
