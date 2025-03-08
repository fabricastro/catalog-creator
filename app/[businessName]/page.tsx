// app/[businessName]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BusinessPage() {
    const params = useParams();
    const businessName = params.businessName as string;
    const [business, setBusiness] = useState<{ name: string, description?: string, logoUrl?: string, products: any[], contact?: string, hours?: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState<{ id: string, name: string, price: number }[]>([]);

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const res = await fetch(`/api/business/${businessName}`);
                if (!res.ok) throw new Error("Error al obtener el negocio");
                const data = await res.json();
                setBusiness(data);
            } catch (error) {
                console.error("Error fetching business data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBusiness();
    }, [businessName]);

    const addToCart = (product: { id: string, name: string, price: number }) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const removeFromCart = (index: number) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    const sendOrder = () => {
        if (!business?.contact) {
            alert("Este negocio no tiene un contacto disponible.");
            return;
        }

        const message = `Hola, quiero hacer un pedido en ${business.name}:

` +
            cart.map((item) => `- ${item.name}: $${item.price}`).join("\n") +
            `\n\nTotal: $${cart.reduce((total, item) => total + item.price, 0)}`;

        const whatsappUrl = `https://wa.me/${business.contact}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };

    if (loading) return <p>Cargando...</p>;
    if (!business) return <p>Negocio no encontrado.</p>;

    return (
        <div className="p-6 text-center">
            {business.logoUrl && <img src={business.logoUrl} alt={business.name} className="w-32 h-32 object-cover mx-auto rounded-full" />}
            <h1 className="text-3xl font-bold mt-4">{business.name}</h1>
            {business.description && <p className="text-gray-600 mt-2">{business.description}</p>}
            {business.hours && <p className="text-gray-500 mt-1">Horario: {business.hours}</p>}
            {business.contact && <p className="text-gray-500 mt-1">Contacto: {business.contact}</p>}

            <h2 className="text-2xl font-bold mt-6">Carta</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {business.products.length > 0 ? (
                    business.products.map((product) => (
                        <div key={product.id} className="border p-4 rounded-lg shadow">
                            {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded" />}
                            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                            <p className="text-gray-500">{product.description}</p>
                            <p className="text-blue-600 font-bold">${product.price}</p>
                            <button onClick={() => addToCart(product)} className="mt-2 px-4 py-2 bg-green-500 text-white rounded">Agregar al carrito</button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No hay productos disponibles.</p>
                )}
            </div>

            <h2 className="text-xl font-bold mt-6">Carrito</h2>
            <div className="p-4 border rounded-lg shadow mt-4">
                {cart.length > 0 ? (
                    <>
                        {cart.map((item, index) => (
                            <div key={index} className="flex justify-between items-center border-b py-2">
                                <p>{item.name}</p>
                                <p className="text-blue-600 font-bold">${item.price}</p>
                                <button onClick={() => removeFromCart(index)} className="ml-4 px-2 py-1 bg-red-500 text-white rounded">X</button>
                            </div>
                        ))}
                        <p className="text-lg font-bold mt-4">Total: ${cart.reduce((total, item) => total + item.price, 0)}</p>
                        <button onClick={sendOrder} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Enviar Pedido</button>
                    </>
                ) : (
                    <p className="text-gray-500">El carrito está vacío.</p>
                )}
            </div>
        </div>
    );
}
