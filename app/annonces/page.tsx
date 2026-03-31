"use client"

import { useState, useMemo } from "react"
import { SlidersHorizontal, ArrowUpDown } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { listings, communes, propertyTypes } from "@/lib/data"

const ITEMS_PER_PAGE = 6

export default function AnnoncesPage() {
  const [selectedCommunes, setSelectedCommunes] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [maxRent, setMaxRent] = useState([1200])
  const [minSurface, setMinSurface] = useState([0])
  const [availableOnly, setAvailableOnly] = useState(false)
  const [sortBy, setSortBy] = useState("recent")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredListings = useMemo(() => {
    let result = [...listings]

    // Filter by commune
    if (selectedCommunes.length > 0) {
      result = result.filter((l) => selectedCommunes.includes(l.commune))
    }

    // Filter by type
    if (selectedTypes.length > 0) {
      result = result.filter((l) => selectedTypes.includes(l.type))
    }

    // Filter by max rent
    result = result.filter((l) => l.rent <= maxRent[0])

    // Filter by min surface
    result = result.filter((l) => l.surface >= minSurface[0])

    // Filter by availability
    if (availableOnly) {
      result = result.filter((l) => l.available)
    }

    // Sort
    switch (sortBy) {
      case "recent":
        result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        break
      case "rent-asc":
        result.sort((a, b) => a.rent - b.rent)
        break
      case "rent-desc":
        result.sort((a, b) => b.rent - a.rent)
        break
      case "surface-desc":
        result.sort((a, b) => b.surface - a.surface)
        break
    }

    return result
  }, [selectedCommunes, selectedTypes, maxRent, minSurface, availableOnly, sortBy])

  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE)
  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleCommuneChange = (commune: string, checked: boolean) => {
    if (checked) {
      setSelectedCommunes([...selectedCommunes, commune])
    } else {
      setSelectedCommunes(selectedCommunes.filter((c) => c !== commune))
    }
    setCurrentPage(1)
  }

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, type])
    } else {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    }
    setCurrentPage(1)
  }

  const resetFilters = () => {
    setSelectedCommunes([])
    setSelectedTypes([])
    setMaxRent([1200])
    setMinSurface([0])
    setAvailableOnly(false)
    setCurrentPage(1)
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Communes */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Communes</h3>
        <div className="space-y-2">
          {communes.map((commune) => (
            <div key={commune} className="flex items-center gap-2">
              <Checkbox
                id={`commune-${commune}`}
                checked={selectedCommunes.includes(commune)}
                onCheckedChange={(checked) => handleCommuneChange(commune, checked as boolean)}
              />
              <Label htmlFor={`commune-${commune}`} className="text-sm font-normal cursor-pointer">
                {commune}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Type de bien */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Type de bien</h3>
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <div key={type} className="flex items-center gap-2">
              <Checkbox
                id={`type-${type}`}
                checked={selectedTypes.includes(type)}
                onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
              />
              <Label htmlFor={`type-${type}`} className="text-sm font-normal cursor-pointer">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Loyer max */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Loyer maximum : {maxRent[0]} €/mois
        </h3>
        <Slider
          value={maxRent}
          onValueChange={(value) => {
            setMaxRent(value)
            setCurrentPage(1)
          }}
          min={300}
          max={1500}
          step={50}
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>300 €</span>
          <span>1500 €</span>
        </div>
      </div>

      {/* Surface min */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Surface minimum : {minSurface[0]} m²
        </h3>
        <Slider
          value={minSurface}
          onValueChange={(value) => {
            setMinSurface(value)
            setCurrentPage(1)
          }}
          min={0}
          max={150}
          step={10}
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>0 m²</span>
          <span>150 m²</span>
        </div>
      </div>

      {/* Disponibilité */}
      <div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="available-only"
            checked={availableOnly}
            onCheckedChange={(checked) => {
              setAvailableOnly(checked as boolean)
              setCurrentPage(1)
            }}
          />
          <Label htmlFor="available-only" className="text-sm font-normal cursor-pointer">
            Disponible immédiatement
          </Label>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={resetFilters}>
        Réinitialiser les filtres
      </Button>
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Toutes les annonces</h1>
            <p className="mt-1 text-muted-foreground">
              {filteredListings.length} logement{filteredListings.length > 1 ? "s" : ""} trouvé
              {filteredListings.length > 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex gap-8">
            {/* Desktop Filters */}
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold text-foreground">Filtres</h2>
                <FilterContent />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Sort and Mobile Filter */}
              <div className="mb-6 flex items-center justify-between gap-4">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2 lg:hidden">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filtres
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filtres</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort Dropdown */}
                <div className="ml-auto flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Plus récent</SelectItem>
                      <SelectItem value="rent-asc">Loyer croissant</SelectItem>
                      <SelectItem value="rent-desc">Loyer décroissant</SelectItem>
                      <SelectItem value="surface-desc">Surface décroissante</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Listings Grid */}
              {paginatedListings.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {paginatedListings.map((listing) => (
                    <PropertyCard key={listing.id} listing={listing} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
                  <p className="text-lg font-medium text-foreground">Aucun résultat</p>
                  <p className="mt-1 text-muted-foreground">
                    Essayez de modifier vos critères de recherche
                  </p>
                  <Button variant="outline" className="mt-4" onClick={resetFilters}>
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Précédent
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="h-9 w-9"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Suivant
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
