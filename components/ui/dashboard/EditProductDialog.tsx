"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";

interface EditProductDialogProps {
    product: any;
    businessName: string;
    setBusiness: (business: any) => void;
}

export default function EditProductDialog({ product, businessName, setBusiness }: EditProductDialogProps) {
    const [editingProduct, setEditingProduct] = useState(product);
    const [isOpen, setIsOpen] = useState(false);

    const handleEditProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`/api/business/${businessName}/update-product/${editingProduct.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editingProduct),
        });
        const data = await res.json();
        if (res.ok) {
            setBusiness((prev: any) =>
                prev ? { ...prev, products: prev.products.map((prod) => (prod.id === data.id ? data : prod)) } : prev
            );
            setIsOpen(false);
        } else {
            alert("Error al actualizar el producto: " + data.error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
                    <Edit className="h-4 w-4 mr-1" /> Editar
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Editar producto</DialogTitle>
                    <DialogDescription>Actualiza los detalles del producto.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleEditProduct}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name">Nombre</Label>
                            <Input id="edit-name" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-description">Descripción</Label>
                            <Textarea id="edit-description" value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} rows={3} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-price">Precio</Label>
                            <Input id="edit-price" type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-imageUrl">URL de la imagen</Label>
                            <Input id="edit-imageUrl" value={editingProduct.imageUrl} onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })} placeholder="https://ejemplo.com/imagen.jpg" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit">Actualizar producto</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}