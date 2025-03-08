"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (res.ok) {
            if (!data.id) {
                setError("Error al obtener el usuario.");
                return;
            }

            const businessRes = await fetch(`/api/user/${data.id}/business`);
            const businessData = await businessRes.json();

            if (businessRes.ok && businessData.name) {
                router.push(`/${businessData.name}/dashboard`); // Redirigir por nombre de negocio
            } else {
                router.push("/");
            }
        } else {
            setError(data.error);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Entrar</button>
            </form>
        </div>
    );
}
