import Link from "next/link"
import Image from "next/image"
import { MapPin, Maximize2, BedDouble } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Listing } from "@/lib/data"

interface PropertyCardProps {
  listing: Listing
}

export function PropertyCard({ listing }: PropertyCardProps) {
  return (
    <Link href={`/annonces/${listing.id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <Badge
              variant={listing.available ? "default" : "secondary"}
              className={listing.available ? "bg-green-500 text-white hover:bg-green-600" : ""}
            >
              {listing.available ? "Disponible" : "Bientôt disponible"}
            </Badge>
          </div>
          <div className="absolute right-3 top-3">
            <Badge variant="secondary" className="bg-background/90 text-foreground">
              {listing.type}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="mb-2 line-clamp-1 text-base font-semibold text-foreground group-hover:text-primary">
            {listing.title}
          </h3>
          <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">
              {listing.address}, {listing.commune}
            </span>
          </div>
          <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Maximize2 className="h-4 w-4" />
              <span>{listing.surface} m²</span>
            </div>
            <div className="flex items-center gap-1">
              <BedDouble className="h-4 w-4" />
              <span>{listing.rooms} pièces</span>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xl font-bold text-primary">{listing.rent} €</span>
              <span className="text-sm text-muted-foreground">/mois</span>
            </div>
            <span className="text-xs text-muted-foreground">
              Publié le {new Date(listing.publishedAt).toLocaleDateString("fr-FR")}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
