"use client"

import { useState } from "react"
import { Check, User, Home, ImageIcon, CreditCard, Upload } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { communes, propertyTypes } from "@/lib/data"

const steps = [
  { id: 1, name: "Compte", icon: User },
  { id: 2, name: "Logement", icon: Home },
  { id: 3, name: "Photos", icon: ImageIcon },
  { id: 4, name: "Paiement", icon: CreditCard },
]

const equipmentOptions = [
  "Cuisine équipée",
  "Lave-vaisselle",
  "Lave-linge",
  "Jardin",
  "Terrasse",
  "Balcon",
  "Garage",
  "Parking",
  "Cave",
  "Piscine",
  "Animaux acceptés",
  "Meublé",
]

export default function PublierPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    type: "",
    commune: "",
    address: "",
    surface: "",
    rent: "",
    rooms: "",
    bedrooms: "",
    bathrooms: "",
    availableDate: "",
    description: "",
    equipment: [] as string[],
    photos: [] as File[],
  })

  const updateFormData = (field: string, value: string | string[] | File[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleEquipmentChange = (equipment: string, checked: boolean) => {
    if (checked) {
      updateFormData("equipment", [...formData.equipment, equipment])
    } else {
      updateFormData(
        "equipment",
        formData.equipment.filter((e) => e !== equipment)
      )
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      updateFormData("photos", [...formData.photos, ...Array.from(e.target.files)])
    }
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(4, prev + 1))
  const prevStep = () => setCurrentStep((prev) => Math.max(1, prev - 1))

  const handleSubmit = () => {
    alert("Annonce publiée avec succès ! (simulation)")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30 px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 text-center text-3xl font-bold text-foreground">
            Publier une annonce
          </h1>
          <p className="mb-8 text-center text-muted-foreground">
            Louez votre bien rapidement dans le Pays de Retz
          </p>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors ${
                        currentStep > step.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : currentStep === step.id
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-muted-foreground"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        <step.icon className="h-6 w-6" />
                      )}
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium ${
                        currentStep >= step.id
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`mx-2 hidden h-0.5 w-16 sm:block md:w-24 lg:w-32 ${
                        currentStep > step.id ? "bg-primary" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <Card>
            <CardContent className="p-6">
              {/* Step 1: Account */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <CardHeader className="p-0">
                    <CardTitle>Créez votre compte</CardTitle>
                  </CardHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Adresse email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.fr"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => updateFormData("password", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Property */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <CardHeader className="p-0">
                    <CardTitle>Décrivez votre logement</CardTitle>
                  </CardHeader>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="type">Type de bien</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => updateFormData("type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          {propertyTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="commune">Commune</Label>
                      <Select
                        value={formData.commune}
                        onValueChange={(value) => updateFormData("commune", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          {communes.map((commune) => (
                            <SelectItem key={commune} value={commune}>
                              {commune}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      placeholder="12 Rue des Vignes"
                      value={formData.address}
                      onChange={(e) => updateFormData("address", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                    <div>
                      <Label htmlFor="surface">Surface (m²)</Label>
                      <Input
                        id="surface"
                        type="number"
                        placeholder="75"
                        value={formData.surface}
                        onChange={(e) => updateFormData("surface", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="rent">Loyer (€)</Label>
                      <Input
                        id="rent"
                        type="number"
                        placeholder="650"
                        value={formData.rent}
                        onChange={(e) => updateFormData("rent", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="rooms">Pièces</Label>
                      <Input
                        id="rooms"
                        type="number"
                        placeholder="3"
                        value={formData.rooms}
                        onChange={(e) => updateFormData("rooms", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bedrooms">Chambres</Label>
                      <Input
                        id="bedrooms"
                        type="number"
                        placeholder="2"
                        value={formData.bedrooms}
                        onChange={(e) => updateFormData("bedrooms", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="bathrooms">Salles de bain</Label>
                      <Input
                        id="bathrooms"
                        type="number"
                        placeholder="1"
                        value={formData.bathrooms}
                        onChange={(e) => updateFormData("bathrooms", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="availableDate">Date de disponibilité</Label>
                      <Input
                        id="availableDate"
                        type="date"
                        value={formData.availableDate}
                        onChange={(e) => updateFormData("availableDate", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Décrivez votre bien en détail..."
                      className="min-h-[120px]"
                      value={formData.description}
                      onChange={(e) => updateFormData("description", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-3 block">Équipements</Label>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                      {equipmentOptions.map((equipment) => (
                        <div key={equipment} className="flex items-center gap-2">
                          <Checkbox
                            id={`eq-${equipment}`}
                            checked={formData.equipment.includes(equipment)}
                            onCheckedChange={(checked) =>
                              handleEquipmentChange(equipment, checked as boolean)
                            }
                          />
                          <Label
                            htmlFor={`eq-${equipment}`}
                            className="cursor-pointer text-sm font-normal"
                          >
                            {equipment}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Photos */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <CardHeader className="p-0">
                    <CardTitle>Ajoutez des photos</CardTitle>
                  </CardHeader>
                  <p className="text-sm text-muted-foreground">
                    Ajoutez des photos de qualité pour attirer plus de locataires
                  </p>
                  <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-8">
                    <div className="flex flex-col items-center text-center">
                      <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
                      <p className="mb-2 text-sm font-medium text-foreground">
                        Glissez-déposez vos photos ici
                      </p>
                      <p className="mb-4 text-xs text-muted-foreground">
                        ou cliquez pour parcourir
                      </p>
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <Button variant="outline" asChild>
                        <label htmlFor="photo-upload" className="cursor-pointer">
                          Parcourir les fichiers
                        </label>
                      </Button>
                    </div>
                  </div>
                  {formData.photos.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {formData.photos.map((photo, index) => (
                        <div
                          key={index}
                          className="relative aspect-square rounded-lg bg-muted"
                        >
                          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                            {photo.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Payment */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <CardHeader className="p-0">
                    <CardTitle>Finalisez votre annonce</CardTitle>
                  </CardHeader>

                  {/* Summary */}
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <h3 className="mb-4 font-semibold text-foreground">Récapitulatif</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type de bien</span>
                        <span className="font-medium text-foreground">
                          {formData.type || "Non renseigné"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Commune</span>
                        <span className="font-medium text-foreground">
                          {formData.commune || "Non renseigné"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Loyer</span>
                        <span className="font-medium text-foreground">
                          {formData.rent ? `${formData.rent} €/mois` : "Non renseigné"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Surface</span>
                        <span className="font-medium text-foreground">
                          {formData.surface ? `${formData.surface} m²` : "Non renseigné"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Photos</span>
                        <span className="font-medium text-foreground">
                          {formData.photos.length} photo(s)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="rounded-lg border border-primary bg-primary/5 p-6 text-center">
                    <p className="mb-2 text-sm text-muted-foreground">Frais de publication</p>
                    <p className="text-4xl font-bold text-primary">9,90 €</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Paiement unique - Annonce visible 60 jours
                    </p>
                  </div>

                  <Button onClick={handleSubmit} className="w-full" size="lg">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Payer et publier
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Paiement sécurisé par Stripe
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Précédent
                </Button>
                <Button variant="secondary" className="hidden sm:inline-flex">
                  Sauvegarder
                </Button>
                {currentStep < 4 && <Button onClick={nextStep}>Suivant</Button>}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
