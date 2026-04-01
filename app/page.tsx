import Link from "next/link"
import { Search, MapPin, Home, Building, DoorOpen } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { communes } from "@/lib/data"

const quickTags = [
  { label: "Maison", icon: Home },
  { label: "Appartement", icon: Building },
  { label: "Studio", icon: DoorOpen },
  { label: "Legé", icon: MapPin },
  { label: "Machecoul", icon: MapPin },
]

export default async function HomePage() {
  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(6)

  const { count } = await supabase
    .from("listings")
    .select("*", { count: "exact", head: true })
    .eq("available", true)

  const recentListings = listings ?? []
  const availableCount = count ?? 0

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-primary/5 to-background px-4 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Trouvez votre logement idéal dans le{" "}
                <span className="text-primary">Pays de Retz</span>
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Maisons, appartements et studios à louer à Legé, Machecoul,
                Saint-Philbert-de-Grand-Lieu et dans toutes les communes du Pays de Retz.
              </p>
              <div className="mb-6 rounded-xl border border-border bg-card p-4 shadow-lg">
                <div className="flex flex-col gap-3 md:flex-row">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <select className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" defaultValue="">
                      <option value="">Toutes les communes</option>
                      {communes.map((commune) => (
                        <option key={commune} value={commune}>{commune}</option>
                      ))}
                    </select>
                  </div>
                  <div className="relative flex-1">
                    <Home className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <select className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" defaultValue="">
                      <option value="">Type de bien</option>
                      <option value="Maison">Maison</option>
                      <option value="Appartement">Appartement</option>
                      <option value="Studio">Studio</option>
                    </select>
                  </div>
                  <Button size="lg" className="h-11 gap-2" asChild>
                    <Link href="/annonces">
                      <Search className="h-5 w-5" />
                      Rechercher
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {quickTags.map((tag) => (
                  <Badge key={tag.label} variant="secondary" className="cursor-pointer gap-1 px-3 py-1.5 text-sm">
                    <tag.icon className="h-3.5 w-3.5" />
                    {tag.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Annonces récentes</h2>
              <Link href="/annonces" className="text-sm text-primary hover:underline">
                Voir toutes les annonces →
              </Link>
            </div>
            {recentListings.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground">
                <p className="text-lg">Aucune annonce pour le moment.</p>
                <p className="mt-2 text-sm">Soyez le premier à publier un logement !</p>
                <Button className="mt-6" asChild>
                  <Link href="/publier">Publier une annonce</Link>
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recentListings.map((listing) => (
                  <PropertyCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="bg-primary/5 px-4 py-8">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-medium">Voir sur la carte interactive</span>
            </div>
            <p className="text-sm text-muted-foreground">{availableCount} logements disponibles</p>
            <Button variant="outline" asChild>
              <Link href="/carte">Ouvrir la carte →</Link>
            </Button>
          </div>
        </section>

        <section className="px-4 py-12">
          <div className="mx-auto max-w-7xl grid grid-cols-3 divide-x text-center">
            <div className="px-8">
              <p className="text-3xl font-bold text-primary">{availableCount}</p>
              <p className="mt-1 text-sm text-muted-foreground">logements disponibles</p>
            </div>
            <div className="px-8">
              <p className="text-3xl font-bold text-primary">6</p>
              <p className="mt-1 text-sm text-muted-foreground">communes couvertes</p>
            </div>
            <div className="px-8">
              <p className="text-3xl font-bold text-primary">100%</p>
              <p className="mt-1 text-sm text-muted-foreground">local & entre particuliers</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}