"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, Layers, Zap, CheckCircle2, Clock, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/app/context/AuthContext"
import { Footer } from "@/components/footer"

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto max-w-6xl flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl">PediloApp</span>
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
        <section className="w-full py-12 md:py-24 lg:py-32 border-b">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <Badge className="w-fit" variant="outline">
                  <Sparkles className="h-3.5 w-3.5 mr-1" />
                  <span>Nuevas funciones próximamente</span>
                </Badge>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-6xl">
                    Crea tu catálogo digital <span className="text-primary">en minutos</span>
                  </h1>
                  <p className="text-muted-foreground text-lg md:text-xl max-w-[600px]">
                    Convierte tu lista de productos en un catálogo digital atractivo sin necesidad de diseñadores ni
                    conocimientos técnicos.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start gap-3">
                  {!user ? (
                    <>
                      <Link href="/register">
                        <Button size="lg" className="gap-1 w-full sm:w-auto">
                          Comenzar Gratis <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href="#como-funciona">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto">
                          Cómo funciona
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Link href={`/${user.business?.slug}/dashboard`}>
                      <Button size="lg">Ir al Dashboard</Button>
                    </Link>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Sin necesidad de tarjeta de crédito</span>
                  <CheckCircle2 className="h-4 w-4 text-primary ml-4" />
                  <span>Configuración en 2 minutos</span>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-lg overflow-hidden border shadow-lg">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Ejemplo de catálogo digital"
                    width={800}
                    height={600}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <p className="text-sm font-medium">Ejemplo de catálogo</p>
                      <h3 className="text-xl font-bold">Restaurante Modelo</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="como-funciona" className="w-full py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2 max-w-[800px]">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Cómo funciona</h2>
                <p className="text-muted-foreground text-lg">
                  Crear tu catálogo digital nunca ha sido tan fácil. Sigue estos simples pasos:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <span className="text-lg font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Registra tu negocio</h3>
                <p className="text-muted-foreground">
                  Crea una cuenta gratuita y configura la información básica de tu negocio.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <span className="text-lg font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Agrega tus productos</h3>
                <p className="text-muted-foreground">
                  Sube fotos, precios y descripciones de tus productos o servicios.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <span className="text-lg font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Comparte tu catálogo</h3>
                <p className="text-muted-foreground">
                  Obtén un enlace único para compartir en redes sociales, WhatsApp o donde prefieras.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2 max-w-[800px]">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Características Principales</h2>
                <p className="text-muted-foreground text-lg">
                  Todo lo que necesitas para crear catálogos profesionales que impresionen a tus clientes
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 border-transparent hover:border-primary/20 transition-all">
                <CardHeader className="pb-2">
                  <Zap className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle className="text-xl">Rápido y Sencillo</CardTitle>
                  <CardDescription className="text-base">
                    Crea tu catálogo en minutos con nuestra interfaz intuitiva
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span>Interfaz de arrastrar y soltar</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span>Carga masiva de productos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span>Edición rápida de información</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-transparent hover:border-primary/20 transition-all">
                <CardHeader className="pb-2">
                  <Layers className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle className="text-xl">Múltiples Formatos</CardTitle>
                  <CardDescription className="text-base">
                    Exporta tu catálogo en diferentes formatos según tus necesidades
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span>Catálogo web responsive</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span>Versión PDF descargable</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span>Código QR para compartir</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-transparent hover:border-primary/20 transition-all">
                <CardHeader className="pb-2">
                  <BookOpen className="h-10 w-10 mb-2 text-primary" />
                  <Badge className="w-fit" variant="outline">
                  <Sparkles className="h-3.5 w-3.5 mr-1" />
                  <span>Próximamente</span>
                </Badge>
                  <CardTitle className="text-xl">Plantillas Profesionales</CardTitle>
                  <CardDescription className="text-base">
                    Elige entre docenas de diseños modernos y personalizables
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span>Diseños para cada tipo de negocio</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span>Personalización de colores y fuentes</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span>Adaptación a tu marca</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Upcoming Features */}
        <section className="w-full py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Badge variant="outline" className="mb-2">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>Próximamente</span>
              </Badge>
              <div className="space-y-2 max-w-[800px]">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Nuevas funcionalidades en camino</h2>
                <p className="text-muted-foreground text-lg">
                  Estamos trabajando constantemente para mejorar tu experiencia. Estas son algunas de las funciones que
                  pronto estarán disponibles:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Sistema de pedidos online</h3>
                  <p className="text-muted-foreground">
                    Permite a tus clientes realizar pedidos directamente desde tu catálogo digital, con opciones de pago
                    integradas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Análisis y estadísticas</h3>
                  <p className="text-muted-foreground">
                    Obtén información valiosa sobre las visitas a tu catálogo, productos más vistos y comportamiento de
                    los clientes.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Integración con WhatsApp Business</h3>
                  <p className="text-muted-foreground">
                    Conecta tu catálogo con WhatsApp para recibir pedidos y consultas directamente en tu teléfono.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Aplicación móvil</h3>
                  <p className="text-muted-foreground">
                    Gestiona tu catálogo desde cualquier lugar con nuestra aplicación móvil para iOS y Android.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2 max-w-[800px]">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Preguntas frecuentes</h2>
                <p className="text-muted-foreground text-lg">
                  Respuestas a las dudas más comunes sobre nuestro servicio
                </p>
              </div>
            </div>

            <div className="max-w-[800px] mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>¿Necesito conocimientos técnicos para usar PediloApp?</AccordionTrigger>
                  <AccordionContent>
                    No, nuestra plataforma está diseñada para ser extremadamente fácil de usar. No necesitas
                    conocimientos de diseño ni programación. La interfaz es intuitiva y te guía paso a paso en la
                    creación de tu catálogo digital.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>¿Puedo probar la plataforma antes de pagar?</AccordionTrigger>
                  <AccordionContent>
                    ¡Sí! Ofrecemos un plan totalmente gratuito, ya que la app se encuentra en etapa de prueba.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>¿Cómo comparten mis clientes el catálogo?</AccordionTrigger>
                  <AccordionContent>
                    Tu catálogo tendrá un enlace único que puedes compartir en redes sociales, WhatsApp, correo
                    electrónico o donde prefieras. También generamos un código QR que tus clientes pueden escanear para
                    acceder directamente a tu catálogo.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>¿Puedo actualizar mi catálogo en cualquier momento?</AccordionTrigger>
                  <AccordionContent>
                    Sí, puedes actualizar tu catálogo en tiempo real. Cualquier cambio que realices se reflejará
                    inmediatamente en tu catálogo digital, sin necesidad de volver a compartir el enlace con tus
                    clientes.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>¿Qué pasa si necesito ayuda?</AccordionTrigger>
                  <AccordionContent>
                    Podés contactarnos a través de nuestras vías de comunicación.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="bg-primary/10 rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
                    Comienza a crear tu catálogo digital hoy mismo
                  </h2>
                  <p className="text-lg mb-6">
                    Únete a PediloApp ahora, y dános tu feedback para seguir mejorando!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/register">
                      <Button size="lg" className="w-full sm:w-auto">
                        Comenzar gratis
                      </Button>
                    </Link>
                    <Link href="#como-funciona">
                      <Button size="lg" variant="outline" className="w-full sm:w-auto">
                        Ver demostración
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative w-full max-w-[400px] aspect-square">
                    <Image
                      src="/placeholder.svg?height=400&width=400"
                      alt="Catálogo digital en dispositivos"
                      width={400}
                      height={400}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="simple" businessName="PediloApp" showSocial={true} showLinks={true} />
    </div>
  )
}

