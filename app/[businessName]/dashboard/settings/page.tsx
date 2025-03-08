// app/[businessName]/dashboard/settings.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BusinessSettings() {
    const params = useParams();
    const businessName = params.businessName as string;
    const [business, setBusiness] = useState<{ name: string, description?: string, logoUrl?: string, contact?: string, hours?: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: "", description: "", logoUrl: "", contact: "", hours: "" });

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const res = await fetch(`/api/business/${businessName}`);
                if (!res.ok) throw new Error("Error al obtener el negocio");
                const data = await res.json();
                setBusiness(data);
                setFormData({
                    name: data.name || "",
                    description: data.description || "",
                    logoUrl: data.logoUrl || "",
                    contact: data.contact || "",
                    hours: data.hours || "",
                });
            } catch (error) {
                console.error("Error fetching business data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBusiness();
    }, [businessName]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`/api/business/${businessName}/update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        if (res.ok) {
            alert("Información actualizada correctamente");
        } else {
            alert("Error al actualizar la información");
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (!business) return <p>Negocio no encontrado.</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Configuración del negocio</h1>
            <form onSubmit={handleSubmit} className="mt-4 space-y-2">
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Nombre del negocio" required />
                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Descripción del negocio"></textarea>
                <input type="text" name="logoUrl" value={formData.logoUrl} onChange={handleChange} className="w-full p-2 border rounded" placeholder="URL del logo" />
                <input type="text" name="contact" value={formData.contact} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Contacto (WhatsApp, Teléfono)" />
                <input type="text" name="hours" value={formData.hours} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Horario de atención" />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Guardar cambios</button>
            </form>
        </div>
    );
}
