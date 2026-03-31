import Link from "next/link"
import { Search, MapPin, Home, Building, DoorOpen, Map, Users, CheckCircle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { listings, communes } from "@/lib/data"

const quickTags = [
  { label: "Maison", icon: Home },
  { label: "Appartement", icon: Building },
  { label: "Studio", icon: DoorOpen },
  { label: "Legé", icon: MapPin },
  { label: "Machecoul", icon: MapPin },
]

export default function HomePage() {
  const recentListings = listings.slice(0, 6)
  const availableCount = listings.filter((l) => l.available).length

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/5 to-background px-4 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-pretty text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Trouvez votre logement idéal dans le{" "}
                <span className="text-primary">Pays de Retz</span>
              </h1>
              <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                Maisons, appartements et studios à louer à Legé, Machecoul, Saint-Philbert-de-Grand-Lieu
                et dans toutes les communes du Pays de Retz.
              </p>

              {/* Search Bar */}
              <div className="mb-6 rounded-xl border border-border bg-card p-4 shadow-lg">
                <div className="flex flex-col gap-3 md:flex-row">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <select
                      className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      defaultValue=""
                    >
                      <option value="">Toutes les communes</option>
                      {communes.map((commune) => (
                        <option key={commune} value={commune}>
                          {commune}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="relative flex-1">
                    <Home className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <select
                      className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      defaultValue=""
                    >
                      <option value="">Type de bien</option>
                      <option value="Maison">Maison</option>
                      <option value="Appartement">Appartement</option>
                      <option value="Studio">Studio</option>
                    </select>
                  </div>
                  <div className="relative flex-1">
                    <Input
                      type="number"
                      placeholder="Loyer max (€)"
                      className="h-11 pl-4"
                    />
                  </div>
                  <Button size="lg" className="h-11 gap-2" asChild>
                    <Link href="/annonces">
                      <Search className="h-5 w-5" />
                      Rechercher
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Quick Tags */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-sm text-muted-foreground">Recherches rapides :</span>
                {quickTags.map((tag) => (
                  <Link key={tag.label} href={`/annonces?q=${tag.label}`}>
                    <Badge
                      variant="secondary"
                      className="cursor-pointer gap-1 px-3 py-1.5 transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <tag.icon className="h-3 w-3" />
                      {tag.label}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recent Listings */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  Annonces récentes
                </h2>
                <p className="mt-1 text-muted-foreground">
                  Les dernières offres de location dans le Pays de Retz
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/annonces">Voir toutes les annonces</Link>
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentListings.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </section>

        {/* Map Banner */}
        <section className="bg-primary px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20">
                  <Map className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary-foreground md:text-2xl">
                    Explorez sur la carte interactive
                  </h3>
                  <p className="text-primary-foreground/80">
                    {availableCount} logements disponibles dans le Pays de Retz
                  </p>
                </div>
              </div>
              <Button
                size="lg"
                variant="secondary"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                asChild
              >
                <Link href="/carte">Voir la carte</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <span className="text-4xl font-bold text-foreground">{listings.length}</span>
                <span className="mt-1 text-muted-foreground">Logements disponibles</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <span className="text-4xl font-bold text-foreground">{communes.length}</span>
                <span className="mt-1 text-muted-foreground">Communes couvertes</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <span className="text-4xl font-bold text-foreground">100%</span>
                <span className="mt-1 text-muted-foreground">Local et vérifié</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
