import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: { params: { businessName: string, productId: string } }) {
    try {
        await prisma.product.delete({ where: { id: params.productId } });
        return Response.json({ message: "Producto eliminado exitosamente." }, { status: 200 });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        return Response.json({ error: "Error en el servidor." }, { status: 500 });
    }
}