"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Eye,
  MessageSquare,
  Star,
  FileText,
  Edit,
  Power,
  PowerOff,
  Crown,
  Calendar,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { listings } from "@/lib/data"

// Mock data for the dashboard
const mockDashboardData = {
  user: {
    name: "Marie Dupont",
    email: "marie.dupont@email.fr",
    avatar: "https://placehold.co/100x100/BA7517/ffffff?text=MD",
  },
  stats: {
    activeListings: 3,
    viewsThisWeek: 127,
    messagesReceived: 8,
    averageRating: 4.8,
  },
  subscription: {
    plan: "Premium",
    renewalDate: "15 mai 2026",
    price: "9,90 €/mois",
  },
  messages: [
    {
      id: "1",
      sender: "Lucas Martin",
      avatar: "https://placehold.co/50x50/e8e8e8/333333?text=LM",
      preview: "Bonjour, je suis très intéressé par votre maison à Legé. Serait-il possible de...",
      date: "Aujourd'hui",
      listingId: "1",
      unread: true,
    },
    {
      id: "2",
      sender: "Emma Bernard",
      avatar: "https://placehold.co/50x50/e8e8e8/333333?text=EB",
      preview: "Merci pour votre réponse rapide ! Je souhaiterais savoir si les charges...",
      date: "Hier",
      listingId: "1",
      unread: true,
    },
    {
      id: "3",
      sender: "Thomas Petit",
      avatar: "https://placehold.co/50x50/e8e8e8/333333?text=TP",
      preview: "Est-ce que les animaux sont acceptés dans l'appartement ? J'ai un petit chat...",
      date: "Il y a 3 jours",
      listingId: "2",
      unread: false,
    },
  ],
}

// User listings (subset of listings for demo)
const userListings = listings.slice(0, 3).map((listing, index) => ({
  ...listing,
  views: [45, 58, 24][index],
  messages: [3, 4, 1][index],
  active: [true, true, false][index],
}))

export default function DashboardPage() {
  const [listingsState, setListingsState] = useState(userListings)

  const toggleListingActive = (id: string) => {
    setListingsState((prev) =>
      prev.map((listing) =>
        listing.id === id ? { ...listing, active: !listing.active } : listing
      )
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-muted/30 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Bonjour, {mockDashboardData.user.name.split(" ")[0]} !
            </h1>
            <p className="mt-1 text-muted-foreground">
              Bienvenue dans votre espace propriétaire
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {mockDashboardData.stats.activeListings}
                  </p>
                  <p className="text-sm text-muted-foreground">Annonces actives</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {mockDashboardData.stats.viewsThisWeek}
                  </p>
                  <p className="text-sm text-muted-foreground">Vues cette semaine</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {mockDashboardData.stats.messagesReceived}
                  </p>
                  <p className="text-sm text-muted-foreground">Messages reçus</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {mockDashboardData.stats.averageRating}
                  </p>
                  <p className="text-sm text-muted-foreground">Note moyenne</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Listings Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Mes annonces</CardTitle>
                  <Button asChild>
                    <Link href="/publier">Nouvelle annonce</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {listingsState.map((listing) => (
                      <div
                        key={listing.id}
                        className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center"
                      >
                        <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-md sm:w-32">
                          <Image
                            src={listing.images[0]}
                            alt={listing.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <h3 className="truncate font-medium text-foreground">
                              {listing.title}
                            </h3>
                            <Badge
                              variant={listing.active ? "default" : "secondary"}
                              className={listing.active ? "bg-green-500 text-white" : ""}
                            >
                              {listing.active ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <p className="mb-2 text-sm text-muted-foreground">
                            {listing.commune} • {listing.rent} €/mois
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {listing.views} vues
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              {listing.messages} messages
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 sm:flex-col">
                          <Button variant="outline" size="sm" className="gap-1" asChild>
                            <Link href={`/annonces/${listing.id}`}>
                              <Edit className="h-4 w-4" />
                              <span className="sm:hidden lg:inline">Modifier</span>
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() => toggleListingActive(listing.id)}
                          >
                            {listing.active ? (
                              <>
                                <PowerOff className="h-4 w-4" />
                                <span className="sm:hidden lg:inline">Désactiver</span>
                              </>
                            ) : (
                              <>
                                <Power className="h-4 w-4" />
                                <span className="sm:hidden lg:inline">Activer</span>
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Messages */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Messages récents
                    <Badge variant="secondary">{mockDashboardData.messages.filter(m => m.unread).length} nouveaux</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockDashboardData.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-start gap-3 rounded-lg p-3 transition-colors ${
                          message.unread
                            ? "bg-primary/5"
                            : "hover:bg-muted/50"
                        }`}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={message.avatar} alt={message.sender} />
                          <AvatarFallback>
                            {message.sender
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="truncate font-medium text-foreground">
                              {message.sender}
                            </p>
                            <span className="shrink-0 text-xs text-muted-foreground">
                              {message.date}
                            </span>
                          </div>
                          <p className="line-clamp-2 text-sm text-muted-foreground">
                            {message.preview}
                          </p>
                        </div>
                        {message.unread && (
                          <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                        )}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    Voir tous les messages
                  </Button>
                </CardContent>
              </Card>

              {/* Subscription */}
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-primary" />
                    Abonnement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 rounded-lg bg-primary/5 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-foreground">
                        {mockDashboardData.subscription.plan}
                      </span>
                      <Badge className="bg-primary text-primary-foreground">Actif</Badge>
                    </div>
                    <p className="text-2xl font-bold text-primary">
                      {mockDashboardData.subscription.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Renouvellement le {mockDashboardData.subscription.renewalDate}</span>
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    Gérer l&apos;abonnement
                  </Button>
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
