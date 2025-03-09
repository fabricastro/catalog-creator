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
import { Plus } from "lucide-react";

interface AddProductDialogProps {
    businessName: string;
    setBusiness: (business: any) => void;
}

export default function AddProductDialog({ businessName, setBusiness }: AddProductDialogProps) {
    const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", imageUrl: "" });
    const [isOpen, setIsOpen] = useState(false);

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`/api/business/${businessName}/add-product`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct),
        });
        const data = await res.json();
        if (res.ok) {
            setBusiness((prev: any) => (prev ? { ...prev, products: [...prev.products, data] } : prev));
            setNewProduct({ name: "", description: "", price: "", imageUrl: "" });
            setIsOpen(false);
        } else {
            alert("Error al agregar el producto: " + data.error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Agregar producto
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Agregar nuevo producto</DialogTitle>
                    <DialogDescription>Completa los detalles del producto para agregarlo a tu catálogo.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddProduct}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input id="name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Descripción</Label>
                            <Textarea id="description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} rows={3} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="price">Precio</Label>
                            <Input id="price" type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="imageUrl">URL de la imagen</Label>
                            <Input id="imageUrl" value={newProduct.imageUrl} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} placeholder="https://ejemplo.com/imagen.jpg" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit">Guardar producto</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}