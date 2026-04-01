import Link from "next/link"
import { MapPin, Home, Building, DoorOpen, SlidersHorizontal } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { communes } from "@/lib/data"

export default async function AnnoncesPage({
  searchParams,
}: {
  searchParams: { commune?: string; type?: string; loyer?: string }
}) {
  let query = supabase
    .from("listings")
    .select("*")
    .order("published_at", { ascending: false })

  if (searchParams.commune) {
    query = query.eq("commune", searchParams.commune)
  }
  if (searchParams.type) {
    query = query.eq("type", searchParams.type)
  }
  if (searchParams.loyer) {
    query = query.lte("rent", parseInt(searchParams.loyer))
  }

  const { data: listings } = await query
  const results = listings ?? []

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">

        <section className="border-b bg-card px-4 py-6">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-4 text-2xl font-bold">Toutes les annonces</h1>
            <form className="flex flex-wrap gap-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <select
                  name="commune"
                  defaultValue={searchParams.commune ?? ""}
                  className="h-10 rounded-lg border border-input bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Toutes les communes</option>
                  {communes.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Home className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <select
                  name="type"
                  defaultValue={searchParams.type ?? ""}
                  className="h-10 rounded-lg border border-input bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Tous les types</option>
                  <option value="Maison">Maison</option>
                  <option value="Appartement">Appartement</option>
                  <option value="Studio">Studio</option>
                </select>
              </div>

              <div className="relative">
                <SlidersHorizontal className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <select
                  name="loyer"
                  defaultValue={searchParams.loyer ?? ""}
                  className="h-10 rounded-lg border border-input bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Loyer max</option>
                  <option value="500">500 €</option>
                  <option value="700">700 €</option>
                  <option value="900">900 €</option>
                  <option value="1200">1 200 €</option>
                </select>
              </div>

              <Button type="submit" size="sm">Filtrer</Button>

              {(searchParams.commune || searchParams.type || searchParams.loyer) && (
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/annonces">Réinitialiser</Link>
                </Button>
              )}
            </form>
          </div>
        </section>

        <section className="px-4 py-8">
          <div className="mx-auto max-w-7xl">
            <p className="mb-6 text-sm text-muted-foreground">
              {results.length} annonce{results.length > 1 ? "s" : ""} trouvée{results.length > 1 ? "s" : ""}
            </p>

            {results.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground">
                <p className="text-lg">Aucune annonce ne correspond à vos critères.</p>
                <Button variant="outline" className="mt-6" asChild>
                  <Link href="/annonces">Voir toutes les annonces</Link>
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((listing) => (
                  <PropertyCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}