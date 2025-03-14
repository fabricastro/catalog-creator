"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Business {
    id: string;
    name: string;
    logoUrl?: string;
}

interface BusinessContextProps {
    business: Business | null;
    setBusiness: (business: Business) => void; // Permite actualizar el negocio
}

const BusinessContext = createContext<BusinessContextProps | undefined>(undefined);

export const BusinessProvider = ({ businessSlug, children }: { businessSlug: string; children: React.ReactNode }) => {
    const [business, setBusiness] = useState<Business | null>(null);

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const res = await fetch(`/api/business/${businessSlug}`);
                if (!res.ok) throw new Error("No se pudo obtener la información del negocio");
                const data = await res.json();
                setBusiness(data);
            } catch (error) {
                console.error("Error obteniendo negocio:", error);
            }
        };

        fetchBusiness();
    }, [businessSlug]);

    return (
        <BusinessContext.Provider value={{ business, setBusiness }}>
            {children}
        </BusinessContext.Provider>
    );
};

export const useBusiness = () => {
    const context = useContext(BusinessContext);
    if (!context) {
        throw new Error("useBusiness debe ser usado dentro de un BusinessProvider");
    }
    return context;
};
