"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

const etapes = ["Votre compte", "Votre logement", "Photos", "Paiement"]

const communes = [
  "Legé", "La Limouzinière", "Machecoul",
  "Saint-Philbert-de-Grand-Lieu", "Touvois", "Corcoué-sur-Logne"
]

const equipements = [
  "Jardin", "Balcon / Terrasse", "Garage / Parking",
  "Cave", "Animaux acceptés", "Charges comprises",
  "Meublé", "Ascenseur"
]

export default function PublierPage() {
  const router = useRouter()
  const [etape, setEtape] = useState(0)
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState("")

  const [compte, setCompte] = useState({ email: "", password: "" })
  const [logement, setLogement] = useState({
    title: "",
    type: "Maison",
    commune: "Legé",
    address: "",
    surface: "",
    rent: "",
    rooms: "",
    bedrooms: "",
    available_date: "",
    description: "",
    features: [] as string[],
  })

  const toggleFeature = (f: string) => {
    setLogement((prev) => ({
      ...prev,
      features: prev.features.includes(f)
        ? prev.features.filter((x) => x !== f)
        : [...prev.features, f],
    }))
  }

  const handleSuivant = async () => {
    setErreur("")

    if (etape === 0) {
      if (!compte.email || !compte.password) {
        setErreur("Veuillez remplir tous les champs.")
        return
      }
      setEtape(1)
    } else if (etape === 1) {
      if (!logement.title || !logement.address || !logement.surface || !logement.rent) {
        setErreur("Veuillez remplir les champs obligatoires.")
        return
      }
      setEtape(2)
    } else if (etape === 2) {
      setEtape(3)
    } else if (etape === 3) {
      setLoading(true)
      try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: compte.email,
          password: compte.password,
        })
        if (authError) throw authError

        const { error: listingError } = await supabase.from("listings").insert({
          title: logement.title,
          type: logement.type,
          commune: logement.commune,
          address: logement.address,
          surface: parseInt(logement.surface),
          rent: parseInt(logement.rent),
          rooms: parseInt(logement.rooms) || 1,
          bedrooms: parseInt(logement.bedrooms) || 1,
          bathrooms: 1,
          description: logement.description,
          features: logement.features,
          available: true,
          available_date: logement.available_date || "Immédiatement",
          owner_id: authData.user?.id,
        })
        if (listingError) throw listingError

        router.push("/annonces")
      } catch (e: any) {
        setErreur(e.message ?? "Une erreur est survenue.")
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-12">
        <div className="mx-auto max-w-2xl">

          <div className="mb-10 flex items-center gap-0">
            {etapes.map((label, i) => (
              <div key={i} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    i < etape ? "bg-green-500 text-white" :
                    i === etape ? "bg-primary text-white" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {i < etape ? "✓" : i + 1}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                </div>
                {i < etapes.length - 1 && (
                  <div className={`mb-4 h-0.5 flex-1 ${i < etape ? "bg-green-500" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="rounded-xl border bg-card p-8">

            {etape === 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Créez votre compte</h2>
                <p className="text-sm text-muted-foreground">Votre espace propriétaire pour gérer vos annonces.</p>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={compte.email}
                    onChange={(e) => setCompte({ ...compte, email: e.target.value })}
                    placeholder="votre@email.com"
                    className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Mot de passe</label>
                  <input
                    type="password"
                    value={compte.password}
                    onChange={(e) => setCompte({ ...compte, password: e.target.value })}
                    placeholder="Minimum 6 caractères"
                    className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            )}

            {etape === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Votre logement</h2>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Titre de l'annonce *</label>
                  <input
                    value={logement.title}
                    onChange={(e) => setLogement({ ...logement, title: e.target.value })}
                    placeholder="Ex: Maison T4 avec jardin à Legé"
                    className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Type de bien</label>
                    <select
                      value={logement.type}
                      onChange={(e) => setLogement({ ...logement, type: e.target.value })}
                      className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option>Maison</option>
                      <option>Appartement</option>
                      <option>Studio</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Commune</label>
                    <select
                      value={logement.commune}
                      onChange={(e) => setLogement({ ...logement, commune: e.target.value })}
                      className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {communes.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Adresse complète *</label>
                  <input
                    value={logement.address}
                    onChange={(e) => setLogement({ ...logement, address: e.target.value })}
                    placeholder="12 rue des Acacias"
                    className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Surface (m²) *</label>
                    <input
                      type="number"
                      value={logement.surface}
                      onChange={(e) => setLogement({ ...logement, surface: e.target.value })}
                      placeholder="90"
                      className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Loyer mensuel (€) *</label>
                    <input
                      type="number"
                      value={logement.rent}
                      onChange={(e) => setLogement({ ...logement, rent: e.target.value })}
                      placeholder="780"
                      className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Nombre de pièces</label>
                    <input
                      type="number"
                      value={logement.rooms}
                      onChange={(e) => setLogement({ ...logement, rooms: e.target.value })}
                      placeholder="4"
                      className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Disponible à partir du</label>
                    <input
                      type="date"
                      value={logement.available_date}
                      onChange={(e) => setLogement({ ...logement, available_date: e.target.value })}
                      className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Description</label>
                  <textarea
                    value={logement.description}
                    onChange={(e) => setLogement({ ...logement, description: e.target.value })}
                    placeholder="Décrivez votre logement..."
                    rows={4}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Équipements</label>
                  <div className="grid grid-cols-2 gap-2">
                    {equipements.map((eq) => (
                      <label key={eq} className="flex cursor-pointer items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={logement.features.includes(eq)}
                          onChange={() => toggleFeature(eq)}
                          className="rounded border-input"
                        />
                        {eq}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {etape === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Photos</h2>
                <p className="text-sm text-muted-foreground">Ajoutez des photos de votre logement pour attirer plus de locataires. Cette fonctionnalité sera disponible très prochainement.</p>
                <div className="flex h-40 items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 text-muted-foreground">
                  <p className="text-sm">Dépôt de photos — bientôt disponible</p>
                </div>
              </div>
            )}

            {etape === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Récapitulatif & Paiement</h2>
                <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Annonce</span>
                    <span className="font-medium">{logement.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Commune</span>
                    <span>{logement.commune}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Loyer</span>
                    <span>{logement.rent} €/mois</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Publication (30 jours)</span>
                    <span className="text-primary">9,90 €</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">En cliquant sur "Publier", votre annonce sera mise en ligne immédiatement. Le paiement Stripe sera intégré prochainement.</p>
              </div>
            )}

            {erreur && (
              <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{erreur}</p>
            )}

            <div className="mt-8 flex justify-between">
              {etape > 0 && (
                <Button variant="outline" onClick={() => setEtape(etape - 1)}>
                  ← Retour
                </Button>
              )}
              <Button className="ml-auto" onClick={handleSuivant} disabled={loading}>
                {loading ? "Publication en cours..." :
                 etape === 3 ? "Publier mon annonce →" : "Étape suivante →"}
              </Button>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}