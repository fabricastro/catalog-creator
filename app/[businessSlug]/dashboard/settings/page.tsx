"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, Info, Phone, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import LogoUploader from "@/components/ui/dashboard/LogoUploader"

interface Business {
  id: string
  name: string
  slug: string
  description?: string
  logoUrl?: string
  contact?: string
  hours?: string
  // address?: string;
}

export default function BusinessSettings() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const businessSlug = params?.businessSlug ? decodeURIComponent(params.businessSlug as string) : null

  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logoUrl: "",
    contact: "",
    hours: "",
    // address: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const fetchBusiness = async () => {
      if (!businessSlug) {
        console.error("❌ No se pudo obtener businessSlug en Settings.")
        return
      }

      try {
        const res = await fetch(`/api/business/${businessSlug}`)
        if (!res.ok) throw new Error("Error al obtener el negocio")

        const data = await res.json()
        setBusiness(data)

        setFormData({
          name: data.name || "",
          description: data.description || "",
          logoUrl: data.logoUrl || "",
          contact: data.contact || "",
          hours: data.hours || "",
          // address: data.address || "",
        })
      } catch (error) {
        console.error("❌ Error fetching business data:", error)
        toast({
          title: "Error",
          description: "No se pudo cargar la información del negocio",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchBusiness()
  }, [businessSlug, toast])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre del negocio es obligatorio"
    }

    if (formData.contact && !/^\+?[0-9]{10,15}$/.test(formData.contact.replace(/\s/g, ""))) {
      newErrors.contact = "Ingresa un número de teléfono válido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const handleLogoUploaded = (logoUrl: string) => {
    setFormData((prev) => ({ ...prev, logoUrl }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Error de validación",
        description: "Por favor corrige los errores en el formulario",
        variant: "destructive",
      })
      return
    }

    setSaving(true)

    try {
      const res = await fetch(`/api/business/${businessSlug}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        toast({
          title: "Cambios guardados",
          description: "La información de tu negocio ha sido actualizada correctamente",
        })

        // Update local business state
        setBusiness({
          ...business!,
          ...formData,
        })
      } else {
        const data = await res.json()
        throw new Error(data.error || "Error al actualizar la información")
      }
    } catch (error) {
      console.error("Error updating business:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al actualizar la información",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="text-muted-foreground">Cargando configuración...</p>
        </div>
      </div>
    )
  }

  if (!business) {
    return (
      <div className="container py-10">
        <Alert variant="destructive" className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Negocio no encontrado</AlertTitle>
          <AlertDescription>
            No se pudo encontrar la información del negocio. Por favor, intenta nuevamente.
          </AlertDescription>
        </Alert>

        <Button asChild>
          <Link href={`/${businessSlug}/dashboard`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al dashboard
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Configuración</h1>
          <p className="text-muted-foreground">Administra la información de tu negocio</p>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/${businessSlug}/dashboard`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">Información general</TabsTrigger>
          <TabsTrigger value="appearance">Apariencia</TabsTrigger>
          <TabsTrigger value="contact">Contacto</TabsTrigger>
        </TabsList>

        <form id="settings-form" onSubmit={handleSubmit} className="space-y-4">
          <TabsContent value="general">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Información del negocio</CardTitle>
                  <CardDescription>Actualiza la información básica de tu negocio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre del negocio</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Mi Restaurante"
                      required
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Una breve descripción de tu negocio"
                      rows={4}
                    />
                  </div>

                  {/* <div className="space-y-2">
                                        <Label htmlFor="address">Dirección</Label>
                                        <Input
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Calle Ejemplo 123, Ciudad"
                                        />
                                    </div> */}

                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vista previa</CardTitle>
                    <CardDescription>Así se verá tu negocio en PediloApp</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg p-4 bg-background">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={formData.logoUrl || ""} alt={formData.name} />
                          <AvatarFallback className="text-xl">{formData.name.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div>
                          <h3 className="text-lg font-bold">{formData.name || "Nombre del negocio"}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {formData.description || "Descripción del negocio"}
                          </p>

                          <div className="flex flex-wrap gap-4 mt-2">
                            {formData.hours && (
                              <div className="flex items-center gap-1 text-xs">
                                <Clock className="h-3 w-3" />
                                <span>{formData.hours}</span>
                              </div>
                            )}

                            {formData.contact && (
                              <div className="flex items-center gap-1 text-xs">
                                <Phone className="h-3 w-3" />
                                <span>{formData.contact}</span>
                              </div>
                            )}

                            {/* {formData.address && (
                                                        <div className="flex items-center gap-1 text-xs">
                                                            <Building2 className="h-3 w-3" />
                                                            <span>{formData.address}</span>
                                                        </div>
                                                    )} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Consejo</AlertTitle>
                  <AlertDescription>
                    Una buena descripción y datos de contacto actualizados ayudan a tus clientes a encontrarte más
                    fácilmente.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Apariencia</CardTitle>
                <CardDescription>Personaliza la apariencia de tu negocio en PediloApp</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                <LogoUploader
                  businessId={business.id}
                  businessName={business.name}
                  currentLogoUrl={formData.logoUrl}
                  onLogoUploaded={(logoUrl) => setFormData({ ...formData, logoUrl })}
                />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Información de contacto</CardTitle>
                <CardDescription>Actualiza la información de contacto de tu negocio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact">Teléfono / WhatsApp</Label>
                    <div className="flex gap-2 items-center">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="+1234567890"
                      />
                    </div>
                    {errors.contact && <p className="text-sm text-destructive">{errors.contact}</p>}
                    <p className="text-sm text-muted-foreground">
                      Este número se utilizará para recibir pedidos por WhatsApp. Incluye el código de país.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hours">Horario de atención</Label>
                    <div className="flex gap-2 items-center">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="hours"
                        name="hours"
                        value={formData.hours}
                        onChange={handleChange}
                        placeholder="Lun-Vie: 9am-6pm, Sáb: 10am-3pm"
                      />
                    </div>
                  </div>

                  <Alert className="mt-6">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Importante</AlertTitle>
                    <AlertDescription>
                      Asegúrate de que tu número de WhatsApp esté activo y pueda recibir mensajes. Los clientes utilizarán
                      este número para realizar sus pedidos.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </form>
        <div className="mt-6 flex justify-end">
          <Button type="submit" form="settings-form" size="lg" disabled={saving} className="gap-2">
            {saving ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"></div>
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Guardar cambios
              </>
            )}
          </Button>
        </div>
      </Tabs>

    </div>
  )
}

