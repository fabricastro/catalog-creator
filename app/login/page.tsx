"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BookOpen, Mail, Lock, LogIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()
            if (res.ok) {
                if (!data.id) {
                    setError("Error al obtener el usuario.")
                    return
                }

                toast({
                    title: "Inicio de sesión exitoso",
                    description: "Redirigiendo al dashboard...",
                })

                const businessRes = await fetch(`/api/user/${data.id}/business`)
                const businessData = await businessRes.json()

                if (businessRes.ok && businessData.slug) {
                    const normalizedSlug = businessData.slug.toLowerCase().replace(/\s+/g, "-")
                    router.push(`/${normalizedSlug}/dashboard`)
                } else {
                    router.push("/")
                }
            } else {
                setError(data.error)
            }
        } catch (err) {
            setError("Ocurrió un error al iniciar sesión. Por favor intente nuevamente.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header with logo */}
            <header className="border-b py-4">
                <div className="container px-4 md:px-6">
                    <Link href="/" className="flex items-center gap-2 font-bold">
                        <BookOpen className="h-6 w-6" />
                        <span>PediloApp</span>
                    </Link>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 flex items-center justify-center p-4 md:p-8">
                <div className="w-full max-w-md">
                    <Card className="border-none shadow-lg">
                        <CardHeader className="space-y-1">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl font-bold">Iniciar sesión</CardTitle>
                                <Link href="/" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
                                    <ArrowLeft className="h-4 w-4" />
                                    Volver
                                </Link>
                            </div>
                            <CardDescription>Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <Alert variant="destructive" className="text-sm">
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="email">Correo electrónico</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="tu@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Contraseña</Label>
                                        <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                                            ¿Olvidaste tu contraseña?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                                            Iniciando sesión...
                                        </>
                                    ) : (
                                        <>
                                            <LogIn className="mr-2 h-4 w-4" />
                                            Iniciar sesión
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 border-t pt-4">
                            <div className="text-center text-sm">
                                Al iniciar sesión, aceptas nuestros{" "}
                                <Link href="/terms" className="text-primary hover:underline">
                                    Términos de servicio
                                </Link>{" "}
                                y{" "}
                                <Link href="/privacy" className="text-primary hover:underline">
                                    Política de privacidad
                                </Link>
                            </div>
                            <div className="text-center text-sm">
                                ¿No tienes una cuenta?{" "}
                                <Link href="/register" className="text-primary font-medium hover:underline">
                                    Registrarse
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t py-4 bg-muted/40">
                <div className="container px-4 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} PediloApp. Todos los derechos reservados.
                </div>
            </footer>
        </div>
    )
}

