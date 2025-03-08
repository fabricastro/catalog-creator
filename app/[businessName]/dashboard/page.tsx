// app/dashboard/[businessName]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function Dashboard() {
    const params = useParams();
    const businessName = params.businessName as string;
    const [business, setBusiness] = useState<{ name: string, description?: string, logoUrl?: string, products: any[] } | null>(null);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState<any | null>(null);
    const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", imageUrl: "" });
    const [user, setUser] = useState<{ id: string; email: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const res = await fetch("/api/auth/check");
            if (!res.ok) {
                router.push("/login");
                return;
            }
            const userData = await res.json();
            setUser(userData);
        };
        checkAuth();
    }, [router]);

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const res = await fetch(`/api/business/${businessName}`);
                if (!res.ok) throw new Error("Error al obtener el negocio");
                const data = await res.json();
                setBusiness(data);
            } catch (error) {
                console.error("Error fetching business data:", error);
                router.push("/404");
            } finally {
                setLoading(false);
            }
        };
        if (businessName) {
            fetchBusiness();
        }
    }, [businessName, router]);

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`/api/business/${businessName}/add-product`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct),
        });
        const data = await res.json();
        if (res.ok) {
            setBusiness((prev) => prev ? { ...prev, products: [...prev.products, data] } : prev);
            setNewProduct({ name: "", description: "", price: "", imageUrl: "" });
        } else {
            alert("Error al agregar el producto: " + data.error);
        }
    };

    const handleDeleteProduct = async (productId: string) => {
        if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

        const res = await fetch(`/api/business/${businessName}/delete-product/${productId}`, {
            method: "DELETE",
        });
        if (res.ok) {
            setBusiness((prev) => prev ? {
                ...prev,
                products: prev.products.filter((prod) => prod.id !== productId)
            } : prev);
        } else {
            alert("Error al eliminar el producto.");
        }
    };

    const handleEditProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProduct) return;

        const res = await fetch(`/api/business/${businessName}/update-product/${editingProduct.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editingProduct),
        });
        const data = await res.json();
        if (res.ok) {
            setBusiness((prev) => prev ? {
                ...prev,
                products: prev.products.map((prod) => prod.id === data.id ? data : prod)
            } : prev);
            setEditingProduct(null);
        } else {
            alert("Error al actualizar el producto: " + data.error);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (!business) return null;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mt-4">Dashboard de {business.name}</h1>
            <p>Bienvenido, {user?.email}</p>
            <button
                onClick={() => router.push(`/${params.businessName}/dashboard/settings`)}
                className="mt-4 bg-blue-500 text-white p-2 rounded"
            >
                Configuración del negocio
            </button>
            <button onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" });
                router.push("/login");
            }} className="bg-red-500 text-white p-2 rounded mt-4">Cerrar sesión</button>
            <h2 className="text-xl font-bold mt-6">Gestión de Productos</h2>
            <h2 className="text-xl font-bold mt-6">Agregar Producto</h2>
            <form onSubmit={handleAddProduct} className="mt-4 space-y-2">
                <input type="text" placeholder="Nombre" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full p-2 border rounded" required />
                <input type="text" placeholder="Descripción" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="w-full p-2 border rounded" />
                <input type="number" placeholder="Precio" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="w-full p-2 border rounded" required />
                <input type="text" placeholder="URL de la imagen" value={newProduct.imageUrl} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} className="w-full p-2 border rounded" />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Agregar Producto</button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {business.products.length > 0 ? (
                    business.products.map((product) => (
                        <div key={product.id} className="border p-4 rounded-lg shadow">
                            {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded" />}
                            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                            <p className="text-gray-500">{product.description}</p>
                            <p className="text-blue-600 font-bold">${product.price}</p>
                            <button onClick={() => setEditingProduct(product)} className="bg-yellow-500 text-white p-1 rounded mt-2">Editar</button>
                            <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-500 text-white p-1 rounded mt-2 ml-2">Eliminar</button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No hay productos disponibles.</p>
                )}
            </div>

            {editingProduct && (
                <div className="mt-6 p-4 border rounded shadow">
                    <h2 className="text-lg font-bold">Editar Producto</h2>
                    <form onSubmit={handleEditProduct} className="mt-4 space-y-2">
                        <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} className="w-full p-2 border rounded" required />
                        <input type="text" value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} className="w-full p-2 border rounded" />
                        <input type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} className="w-full p-2 border rounded" required />
                        <input type="text" value={editingProduct.imageUrl} onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })} className="w-full p-2 border rounded" />
                        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Actualizar Producto</button>
                        <button type="button" onClick={() => setEditingProduct(null)} className="w-full bg-gray-500 text-white p-2 rounded mt-2">Cancelar</button>
                    </form>
                </div>
            )}
        </div>
    );
}
