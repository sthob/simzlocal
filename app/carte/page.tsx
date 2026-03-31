"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { MapPin, X, ChevronRight, SlidersHorizontal, Home, Building, DoorOpen } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { listings, communes, propertyTypes, coordinates, type Listing } from "@/lib/data"

// Dynamically import map component to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
)

function MapPage() {
  const [selectedCommunes, setSelectedCommunes] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const filteredListings = useMemo(() => {
    let result = [...listings]

    if (selectedCommunes.length > 0) {
      result = result.filter((l) => selectedCommunes.includes(l.commune))
    }

    if (selectedTypes.length > 0) {
      result = result.filter((l) => selectedTypes.includes(l.type))
    }

    return result
  }, [selectedCommunes, selectedTypes])

  const handleCommuneChange = (commune: string, checked: boolean) => {
    if (checked) {
      setSelectedCommunes([...selectedCommunes, commune])
    } else {
      setSelectedCommunes(selectedCommunes.filter((c) => c !== commune))
    }
  }

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, type])
    } else {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    }
  }

  // Center of Pays de Retz
  const centerPosition: [number, number] = [46.95, -1.65]

  return (
    <div className="flex h-screen flex-col">
      <Header />

      <div className="relative flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden w-80 shrink-0 flex-col border-r border-border bg-background transition-all lg:flex ${
            sidebarOpen ? "" : "-ml-80"
          }`}
        >
          <div className="border-b border-border p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Filtres</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCommunes([])
                  setSelectedTypes([])
                }}
              >
                Réinitialiser
              </Button>
            </div>

            {/* Communes */}
            <div className="mb-4">
              <h3 className="mb-2 text-sm font-medium text-foreground">Communes</h3>
              <div className="space-y-2">
                {communes.map((commune) => (
                  <div key={commune} className="flex items-center gap-2">
                    <Checkbox
                      id={`map-commune-${commune}`}
                      checked={selectedCommunes.includes(commune)}
                      onCheckedChange={(checked) =>
                        handleCommuneChange(commune, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`map-commune-${commune}`}
                      className="cursor-pointer text-sm font-normal"
                    >
                      {commune}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Types */}
            <div>
              <h3 className="mb-2 text-sm font-medium text-foreground">Type de bien</h3>
              <div className="space-y-2">
                {propertyTypes.map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <Checkbox
                      id={`map-type-${type}`}
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={(checked) =>
                        handleTypeChange(type, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`map-type-${type}`}
                      className="cursor-pointer text-sm font-normal"
                    >
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Listings List */}
          <div className="flex-1 overflow-y-auto p-4">
            <p className="mb-4 text-sm text-muted-foreground">
              {filteredListings.length} logement{filteredListings.length > 1 ? "s" : ""}
            </p>
            <div className="space-y-3">
              {filteredListings.map((listing) => (
                <button
                  key={listing.id}
                  onClick={() => setSelectedListing(listing)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors ${
                    selectedListing?.id === listing.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded">
                      <Image
                        src={listing.images[0]}
                        alt={listing.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 truncate text-sm font-medium text-foreground">
                        {listing.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{listing.commune}</p>
                      <p className="mt-1 text-sm font-semibold text-primary">
                        {listing.rent} €/mois
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile Filter Button */}
        <div className="absolute left-4 top-4 z-[1000] lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" className="gap-2 shadow-lg">
                <SlidersHorizontal className="h-4 w-4" />
                Filtres
                {(selectedCommunes.length > 0 || selectedTypes.length > 0) && (
                  <Badge variant="default" className="ml-1">
                    {selectedCommunes.length + selectedTypes.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filtres</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {/* Communes */}
                <div>
                  <h3 className="mb-2 text-sm font-medium text-foreground">Communes</h3>
                  <div className="space-y-2">
                    {communes.map((commune) => (
                      <div key={commune} className="flex items-center gap-2">
                        <Checkbox
                          id={`mobile-commune-${commune}`}
                          checked={selectedCommunes.includes(commune)}
                          onCheckedChange={(checked) =>
                            handleCommuneChange(commune, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={`mobile-commune-${commune}`}
                          className="cursor-pointer text-sm font-normal"
                        >
                          {commune}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Types */}
                <div>
                  <h3 className="mb-2 text-sm font-medium text-foreground">Type de bien</h3>
                  <div className="space-y-2">
                    {propertyTypes.map((type) => (
                      <div key={type} className="flex items-center gap-2">
                        <Checkbox
                          id={`mobile-type-${type}`}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={(checked) =>
                            handleTypeChange(type, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={`mobile-type-${type}`}
                          className="cursor-pointer text-sm font-normal"
                        >
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCommunes([])
                    setSelectedTypes([])
                  }}
                >
                  Réinitialiser
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Toggle Sidebar Button (Desktop) */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute left-0 top-1/2 z-[1000] hidden -translate-y-1/2 rounded-r-lg border border-l-0 border-border bg-background px-1 py-4 shadow-md lg:block"
          style={{ left: sidebarOpen ? "320px" : "0" }}
        >
          <ChevronRight
            className={`h-5 w-5 text-muted-foreground transition-transform ${
              sidebarOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Map */}
        <div className="flex-1">
          <MapContainer
            center={centerPosition}
            zoom={11}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredListings.map((listing) => {
              const coords = coordinates[listing.commune]
              if (!coords) return null

              // Add some random offset to prevent markers from overlapping
              const offset = parseFloat(listing.id) * 0.005
              const position: [number, number] = [
                coords[0] + (offset % 0.02) - 0.01,
                coords[1] + ((offset * 1.5) % 0.02) - 0.01,
              ]

              return (
                <Marker key={listing.id} position={position}>
                  <Popup>
                    <div className="w-48">
                      <div className="relative mb-2 h-24 w-full overflow-hidden rounded">
                        <Image
                          src={listing.images[0]}
                          alt={listing.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="mb-1 text-sm font-semibold">{listing.title}</h3>
                      <p className="mb-1 text-xs text-gray-500">
                        {listing.commune} • {listing.surface} m²
                      </p>
                      <p className="mb-2 text-sm font-bold text-[#BA7517]">
                        {listing.rent} €/mois
                      </p>
                      <Link
                        href={`/annonces/${listing.id}`}
                        className="inline-block rounded bg-[#BA7517] px-3 py-1 text-xs font-medium text-white hover:bg-[#a5681a]"
                      >
                        Voir l&apos;annonce
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              )
            })}
          </MapContainer>
        </div>

        {/* Selected Listing Card (Mobile) */}
        {selectedListing && (
          <div className="absolute bottom-4 left-4 right-4 z-[1000] rounded-lg border border-border bg-background p-4 shadow-lg lg:hidden">
            <button
              onClick={() => setSelectedListing(null)}
              className="absolute right-2 top-2 rounded-full p-1 hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex gap-4">
              <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded">
                <Image
                  src={selectedListing.images[0]}
                  alt={selectedListing.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="mb-1 truncate font-medium text-foreground">
                  {selectedListing.title}
                </h3>
                <p className="mb-1 text-sm text-muted-foreground">
                  {selectedListing.commune} • {selectedListing.surface} m²
                </p>
                <p className="text-lg font-bold text-primary">
                  {selectedListing.rent} €/mois
                </p>
              </div>
            </div>
            <Button className="mt-3 w-full" asChild>
              <Link href={`/annonces/${selectedListing.id}`}>
                Voir l&apos;annonce
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MapPage
