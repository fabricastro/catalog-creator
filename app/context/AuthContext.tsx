"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Tipos de datos para usuario
interface User {
    id: string;
    email: string;
    business?: {
        id: string;
        name: string;
        slug: string;
        logoUrl?: string;
    };
}

// Contexto de autenticación
interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    logout: () => void;
}

// Crear contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor de autenticación
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Verificar autenticación al cargar la aplicación
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/auth/check");
                if (!res.ok) {
                    setUser(null);
                } else {
                    const userData = await res.json();
                    setUser(userData);
                }
            } catch (error) {
                console.error("❌ Error verificando autenticación:", error);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    // Función para cerrar sesión
    const logout = async () => {
        setIsLoading(true);
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            setUser(null);
            router.push("/login");
        } catch (error) {
            console.error("❌ Error cerrando sesión:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook para usar el contexto
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }
    return context;
}
