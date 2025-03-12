"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Layers, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/app/context/AuthContext"

export default function Home() {
  const { user } = useAuth(); // ✅ Obtener el usuario autenticado

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold">
            <BookOpen className="h-6 w-6" />
            <span>PediloApp</span>
          </div>
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
                  Iniciar Sesión
                </Link>
                <Link href="/register">
                  <Button size="sm">Registrarse</Button>
                </Link>
              </>
            ) : (
              <Link href={`/${user.business?.slug}/dashboard`}>
                <Button size="sm" variant="outline">
                  Ir al Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-1 lg:gap-12 items-center text-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Creador de Catálogos
                  </h1>
                  <p className="text-muted-foreground md:text-xl">
                    Convierte tu lista de productos en un catálogo digital atractivo en minutos, sin necesidad de diseñadores.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 md:flex-row md:justify-center">
                  {!user ? (
                    <Link href="/register">
                      <Button size="lg" className="gap-1">
                        Comenzar Gratis <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/${user.business?.slug}/dashboard`}>
                      <Button size="lg" variant="outline">
                        Ir al Dashboard
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 bg-muted/50">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Características Principales</h2>
                <p className="text-muted-foreground md:text-xl">
                  Todo lo que necesitas para crear catálogos profesionales
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card>
                <CardHeader className="pb-2">
                  <Zap className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>Rápido y Sencillo</CardTitle>
                  <CardDescription>Crea tu catálogo en minutos con nuestra interfaz intuitiva</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Sube tus productos y descarga tu catálogo listo para compartir.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Layers className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>Múltiples Formatos</CardTitle>
                  <CardDescription>Exporta tu catálogo en PDF, web o formato digital interactivo</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Comparte fácilmente por WhatsApp, correo electrónico o redes sociales.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <BookOpen className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>Plantillas Profesionales</CardTitle>
                  <CardDescription>Elige entre docenas de diseños modernos y personalizables</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Adapta los colores, fuentes y estilos a tu marca para un resultado profesional.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 CatálogoFácil. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Términos
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Privacidad
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
