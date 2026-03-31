"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  MapPin,
  Maximize2,
  BedDouble,
  Bath,
  DoorOpen,
  Star,
  Send,
  Bell,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { listings, reviews } from "@/lib/data"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function AnnonceDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const listing = listings.find((l) => l.id === id)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [message, setMessage] = useState("")
  const [alertEmail, setAlertEmail] = useState("")

  if (!listing) {
    notFound()
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % listing.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length)
  }

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Message envoyé ! (simulation)")
    setMessage("")
  }

  const handleSubmitAlert = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Alerte créée pour ${alertEmail} (simulation)`)
    setAlertEmail("")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Back Button */}
          <Link
            href="/annonces"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux annonces
          </Link>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="relative mb-6 overflow-hidden rounded-xl">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={listing.images[currentImageIndex]}
                    alt={listing.title}
                    fill
                    className="object-cover"
                  />
                  {listing.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 shadow-md transition-colors hover:bg-background"
                        aria-label="Image précédente"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 shadow-md transition-colors hover:bg-background"
                        aria-label="Image suivante"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                        {listing.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`h-2 w-2 rounded-full transition-colors ${
                              index === currentImageIndex
                                ? "bg-primary"
                                : "bg-background/60"
                            }`}
                            aria-label={`Image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Title and Badge */}
              <div className="mb-6">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge
                    variant={listing.available ? "default" : "secondary"}
                    className={listing.available ? "bg-green-500 text-white" : ""}
                  >
                    {listing.available ? "Disponible" : "Bientôt disponible"}
                  </Badge>
                  <Badge variant="outline">{listing.type}</Badge>
                </div>
                <h1 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
                  {listing.title}
                </h1>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span>
                    {listing.address}, {listing.commune}
                  </span>
                </div>
              </div>

              {/* Metrics */}
              <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg border border-border bg-card p-4 text-center">
                  <Maximize2 className="mx-auto mb-2 h-6 w-6 text-primary" />
                  <p className="text-xl font-bold text-foreground">{listing.surface} m²</p>
                  <p className="text-sm text-muted-foreground">Surface</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4 text-center">
                  <DoorOpen className="mx-auto mb-2 h-6 w-6 text-primary" />
                  <p className="text-xl font-bold text-foreground">{listing.rooms}</p>
                  <p className="text-sm text-muted-foreground">Pièces</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4 text-center">
                  <BedDouble className="mx-auto mb-2 h-6 w-6 text-primary" />
                  <p className="text-xl font-bold text-foreground">{listing.bedrooms}</p>
                  <p className="text-sm text-muted-foreground">Chambres</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4 text-center">
                  <Bath className="mx-auto mb-2 h-6 w-6 text-primary" />
                  <p className="text-xl font-bold text-foreground">{listing.bathrooms}</p>
                  <p className="text-sm text-muted-foreground">Salle de bain</p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold text-foreground">Caractéristiques</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm"
                    >
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold text-foreground">Description</h2>
                <p className="leading-relaxed text-muted-foreground">{listing.description}</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  <strong>Disponibilité :</strong> {listing.availableDate}
                </p>
              </div>

              {/* Reviews */}
              <div>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  Avis sur le propriétaire
                </h2>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(listing.owner.rating)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium text-foreground">
                    {listing.owner.rating.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground">
                    ({listing.owner.reviews} avis)
                  </span>
                </div>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="rounded-lg border border-border bg-card p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={review.avatar} alt={review.author} />
                            <AvatarFallback>{review.author.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{review.author}</p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < review.rating
                                      ? "fill-primary text-primary"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Contact & Price */}
            <div className="space-y-6">
              {/* Price Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 text-center">
                    <span className="text-4xl font-bold text-primary">{listing.rent} €</span>
                    <span className="text-lg text-muted-foreground">/mois</span>
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    Charges non comprises
                  </p>
                </CardContent>
              </Card>

              {/* Owner Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contacter le propriétaire</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={listing.owner.avatar} alt={listing.owner.name} />
                      <AvatarFallback>
                        {listing.owner.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{listing.owner.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        {listing.owner.rating.toFixed(1)} ({listing.owner.reviews} avis)
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmitMessage}>
                    <Textarea
                      placeholder="Bonjour, je suis intéressé par ce logement..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mb-4 min-h-[120px]"
                    />
                    <Button type="submit" className="w-full gap-2">
                      <Send className="h-4 w-4" />
                      Envoyer un message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Alert Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Bell className="h-5 w-5 text-primary" />
                    Créer une alerte
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Recevez un email dès qu&apos;un logement similaire est publié
                  </p>
                  <form onSubmit={handleSubmitAlert}>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="alert-email">Email</Label>
                        <Input
                          id="alert-email"
                          type="email"
                          placeholder="votre@email.fr"
                          value={alertEmail}
                          onChange={(e) => setAlertEmail(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" variant="outline" className="w-full">
                        Créer l&apos;alerte
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
