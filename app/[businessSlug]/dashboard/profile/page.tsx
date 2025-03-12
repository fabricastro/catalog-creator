"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save } from "lucide-react"
import { toast } from "sonner" // ✅ Usamos Sonner

export default function ProfilePage() {
    const router = useRouter()

    const [user, setUser] = useState<{ email: string } | null>(null)
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/auth/check")
                if (!res.ok) {
                    router.push("/login")
                    return
                }
                const userData = await res.json()
                setUser(userData)
            } catch (error) {
                console.error("❌ Error obteniendo usuario:", error)
            }
        }
        fetchUser()
    }, [router])

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("Todos los campos son obligatorios.")
            return
        }

        if (newPassword !== confirmPassword) {
            toast.error("Las contraseñas nuevas no coinciden.")
            return
        }

        setLoading(true)

        try {
            const res = await fetch("/api/auth/update-password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword }),
            })

            const data = await res.json()

            if (res.ok) {
                toast.success("Tu contraseña ha sido cambiada exitosamente.")
                setCurrentPassword("")
                setNewPassword("")
                setConfirmPassword("")
            } else {
                throw new Error(data.error || "Error al actualizar la contraseña")
            }
        } catch (error) {
            console.error("❌ Error cambiando contraseña:", error)
            toast.error(error instanceof Error ? error.message : "Error desconocido")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container py-6">
            <h1 className="text-3xl font-bold mb-6">Perfil</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Información del usuario</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg">Correo electrónico: <span className="font-medium">{user?.email || "Cargando..."}</span></p>
                </CardContent>
            </Card>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Cambiar contraseña</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div>
                            <Label className="mb-2" htmlFor="current-password">Contraseña actual</Label>
                            <Input
                                id="current-password"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label className="mb-2" htmlFor="new-password">Nueva contraseña</Label>
                            <Input
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label className="mb-2" htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" size="lg" className="gap-2" disabled={loading}>
                            {loading ? "Guardando..." : "Guardar cambios"}
                            <Save className="h-4 w-4" />
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
