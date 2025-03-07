import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { businessName: string, productId: string } }) {
    try {
        const { name, description, price, imageUrl } = await req.json();

        const updatedProduct = await prisma.product.update({
            where: { id: params.productId },
            data: { name, description, price: parseFloat(price), imageUrl },
        });

        return Response.json(updatedProduct, { status: 200 });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return Response.json({ error: "Error en el servidor." }, { status: 500 });
    }
}