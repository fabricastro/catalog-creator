"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";

interface AddCategoryDialogProps {
    setCategories: (categories: string[]) => void;
}

export default function AddCategoryDialog({ setCategories }: AddCategoryDialogProps) {
    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const params = useParams();
    const businessSlug = params.businessSlug as string;
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!categoryName.trim()) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/business/${encodeURIComponent(businessSlug)}/categories`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: categoryName.trim() }),
            });

            if (!res.ok) throw new Error("Error al agregar la categoría");
            const newCategory = await res.json();

            setCategories((prev) => [...prev, newCategory.name]);
            setCategoryName("");
            setOpen(false);
        } catch (error) {
            console.error("❌ Error al agregar categoría:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Categoría
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar nueva categoría</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <Input
                        placeholder="Nombre de la categoría"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                    />
                    <DialogFooter className="mt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Guardando..." : "Guardar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
