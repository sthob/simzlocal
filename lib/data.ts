export interface Listing {
  id: string
  title: string
  type: "Maison" | "Appartement" | "Studio"
  rooms: number
  bedrooms: number
  bathrooms: number
  surface: number
  rent: number
  address: string
  commune: string
  description: string
  features: string[]
  available: boolean
  availableDate: string
  publishedAt: string
  images: string[]
  owner: {
    name: string
    avatar: string
    rating: number
    reviews: number
  }
}

export interface Review {
  id: string
  author: string
  avatar: string
  rating: number
  comment: string
  date: string
}

export const communes = [
  "Legé",
  "La Limouzinière",
  "Machecoul",
  "Saint-Philbert-de-Grand-Lieu",
  "Touvois",
  "Corcoué-sur-Logne",
]

export const propertyTypes = ["Maison", "Appartement", "Studio"] as const

export const listings: Listing[] = [
  {
    id: "1",
    title: "Maison T4 avec jardin et garage",
    type: "Maison",
    rooms: 4,
    bedrooms: 3,
    bathrooms: 1,
    surface: 95,
    rent: 850,
    address: "12 Rue des Vignes",
    commune: "Legé",
    description:
      "Charmante maison de plain-pied située dans un quartier calme de Legé. Elle comprend une entrée, un séjour lumineux avec accès direct au jardin, une cuisine aménagée et équipée, trois chambres dont une avec placard, une salle de bain avec douche et baignoire, et un WC séparé. Garage attenant et jardin clos de 400m². Proche des commerces et écoles.",
    features: [
      "Jardin clos",
      "Garage",
      "Cuisine équipée",
      "Plain-pied",
      "Double vitrage",
      "Chauffage gaz",
    ],
    available: true,
    availableDate: "1er avril 2026",
    publishedAt: "2026-03-28",
    images: [
      "https://placehold.co/800x600/BA7517/ffffff?text=Maison+T4",
      "https://placehold.co/800x600/e8e8e8/333333?text=Salon",
      "https://placehold.co/800x600/e8e8e8/333333?text=Cuisine",
    ],
    owner: {
      name: "Marie Dupont",
      avatar: "https://placehold.co/100x100/BA7517/ffffff?text=MD",
      rating: 4.8,
      reviews: 12,
    },
  },
  {
    id: "2",
    title: "Appartement T2 centre-ville",
    type: "Appartement",
    rooms: 2,
    bedrooms: 1,
    bathrooms: 1,
    surface: 45,
    rent: 520,
    address: "5 Place de l'Église",
    commune: "Machecoul",
    description:
      "Bel appartement T2 en plein centre de Machecoul, au premier étage d'un petit immeuble calme. Comprend un séjour avec coin cuisine aménagée, une chambre avec rangements, une salle d'eau avec WC. Idéal pour jeune actif ou couple. Proximité immédiate des commerces, marché et gare.",
    features: [
      "Centre-ville",
      "Proche gare",
      "Cuisine aménagée",
      "Calme",
      "Cave",
    ],
    available: true,
    availableDate: "15 avril 2026",
    publishedAt: "2026-03-25",
    images: [
      "https://placehold.co/800x600/BA7517/ffffff?text=Appart+T2",
      "https://placehold.co/800x600/e8e8e8/333333?text=Chambre",
    ],
    owner: {
      name: "Jean Martin",
      avatar: "https://placehold.co/100x100/BA7517/ffffff?text=JM",
      rating: 4.5,
      reviews: 8,
    },
  },
  {
    id: "3",
    title: "Studio meublé proche commerces",
    type: "Studio",
    rooms: 1,
    bedrooms: 0,
    bathrooms: 1,
    surface: 28,
    rent: 420,
    address: "8 Rue du Commerce",
    commune: "Saint-Philbert-de-Grand-Lieu",
    description:
      "Studio entièrement meublé et équipé, idéal pour étudiant ou jeune actif. Comprend une pièce principale avec coin nuit, kitchenette équipée (plaques, réfrigérateur, micro-ondes), salle d'eau avec WC. Situé à 2 minutes à pied du centre et des commerces.",
    features: [
      "Meublé",
      "Équipé",
      "Proche commerces",
      "Charges comprises",
      "Internet inclus",
    ],
    available: true,
    availableDate: "Immédiat",
    publishedAt: "2026-03-30",
    images: [
      "https://placehold.co/800x600/BA7517/ffffff?text=Studio",
    ],
    owner: {
      name: "Sophie Leroy",
      avatar: "https://placehold.co/100x100/BA7517/ffffff?text=SL",
      rating: 4.9,
      reviews: 15,
    },
  },
  {
    id: "4",
    title: "Maison T3 rénovée avec terrasse",
    type: "Maison",
    rooms: 3,
    bedrooms: 2,
    bathrooms: 1,
    surface: 75,
    rent: 720,
    address: "23 Rue des Lilas",
    commune: "La Limouzinière",
    description:
      "Maison de bourg entièrement rénovée en 2024. Elle se compose d'un séjour ouvert sur cuisine équipée, de deux chambres à l'étage, d'une salle de bain moderne et d'un WC. Belle terrasse exposée sud. Stationnement devant la maison. À 5 minutes de Machecoul.",
    features: [
      "Rénové en 2024",
      "Terrasse",
      "Cuisine équipée",
      "Double vitrage",
      "Chauffage électrique",
      "Parking",
    ],
    available: true,
    availableDate: "1er mai 2026",
    publishedAt: "2026-03-20",
    images: [
      "https://placehold.co/800x600/BA7517/ffffff?text=Maison+T3",
      "https://placehold.co/800x600/e8e8e8/333333?text=Terrasse",
    ],
    owner: {
      name: "Pierre Moreau",
      avatar: "https://placehold.co/100x100/BA7517/ffffff?text=PM",
      rating: 4.6,
      reviews: 6,
    },
  },
  {
    id: "5",
    title: "Appartement T3 avec balcon",
    type: "Appartement",
    rooms: 3,
    bedrooms: 2,
    bathrooms: 1,
    surface: 65,
    rent: 650,
    address: "15 Avenue de la Gare",
    commune: "Legé",
    description:
      "Appartement T3 lumineux au 2ème étage avec ascenseur. Séjour avec balcon, cuisine séparée aménagée, deux chambres, salle de bain avec baignoire, WC séparé. Place de parking privée incluse. Résidence calme et bien entretenue.",
    features: [
      "Balcon",
      "Ascenseur",
      "Parking privé",
      "Cave",
      "Interphone",
      "Cuisine aménagée",
    ],
    available: false,
    availableDate: "1er juin 2026",
    publishedAt: "2026-03-15",
    images: [
      "https://placehold.co/800x600/BA7517/ffffff?text=Appart+T3",
      "https://placehold.co/800x600/e8e8e8/333333?text=Balcon",
    ],
    owner: {
      name: "Claire Bernard",
      avatar: "https://placehold.co/100x100/BA7517/ffffff?text=CB",
      rating: 4.7,
      reviews: 9,
    },
  },
  {
    id: "6",
    title: "Maison T5 familiale avec piscine",
    type: "Maison",
    rooms: 5,
    bedrooms: 4,
    bathrooms: 2,
    surface: 140,
    rent: 1200,
    address: "3 Chemin des Prés",
    commune: "Touvois",
    description:
      "Grande maison familiale dans un environnement verdoyant. RDC : entrée, vaste séjour-salon, cuisine aménagée équipée, cellier, WC. Étage : 4 chambres dont une suite parentale avec salle d'eau, salle de bain familiale, WC. Terrain de 1500m² avec piscine hors-sol et abri de jardin. Idéal famille.",
    features: [
      "Piscine",
      "Grand terrain",
      "4 chambres",
      "2 salles de bain",
      "Abri de jardin",
      "Cuisine équipée",
      "Animaux acceptés",
    ],
    available: true,
    availableDate: "1er juillet 2026",
    publishedAt: "2026-03-22",
    images: [
      "https://placehold.co/800x600/BA7517/ffffff?text=Maison+T5",
      "https://placehold.co/800x600/e8e8e8/333333?text=Piscine",
      "https://placehold.co/800x600/e8e8e8/333333?text=Jardin",
    ],
    owner: {
      name: "François Petit",
      avatar: "https://placehold.co/100x100/BA7517/ffffff?text=FP",
      rating: 4.4,
      reviews: 5,
    },
  },
  {
    id: "7",
    title: "Studio indépendant en campagne",
    type: "Studio",
    rooms: 1,
    bedrooms: 0,
    bathrooms: 1,
    surface: 32,
    rent: 400,
    address: "Lieu-dit La Métairie",
    commune: "Corcoué-sur-Logne",
    description:
      "Studio indépendant aménagé dans une ancienne dépendance rénovée. Pièce de vie avec kitchenette, coin nuit, salle d'eau. Entrée indépendante et petit jardin privatif. Cadre champêtre très calme, idéal pour personne seule appréciant la nature. Voiture indispensable.",
    features: [
      "Indépendant",
      "Jardin privatif",
      "Calme",
      "Rénové",
      "Charme ancien",
    ],
    available: true,
    availableDate: "Immédiat",
    publishedAt: "2026-03-29",
    images: [
      "https://placehold.co/800x600/BA7517/ffffff?text=Studio+Campagne",
    ],
    owner: {
      name: "Antoine Dubois",
      avatar: "https://placehold.co/100x100/BA7517/ffffff?text=AD",
      rating: 5.0,
      reviews: 3,
    },
  },
  {
    id: "8",
    title: "Appartement T2 neuf standing",
    type: "Appartement",
    rooms: 2,
    bedrooms: 1,
    bathrooms: 1,
    surface: 48,
    rent: 590,
    address: "Résidence Les Jardins, 2 Rue Neuve",
    commune: "Machecoul",
    description:
      "Appartement neuf livré en 2025 dans résidence récente. Prestations de qualité : parquet, volets roulants électriques, VMC double flux. Séjour lumineux avec cuisine ouverte équipée, chambre avec placard, salle d'eau moderne. Terrasse de 10m² et place de parking en sous-sol.",
    features: [
      "Neuf",
      "Terrasse",
      "Parking sous-sol",
      "Volets électriques",
      "Parquet",
      "VMC double flux",
      "RT 2020",
    ],
    available: true,
    availableDate: "15 mai 2026",
    publishedAt: "2026-03-27",
    images: [
      "https://placehold.co/800x600/BA7517/ffffff?text=Appart+Neuf",
      "https://placehold.co/800x600/e8e8e8/333333?text=Terrasse",
    ],
    owner: {
      name: "Nathalie Roux",
      avatar: "https://placehold.co/100x100/BA7517/ffffff?text=NR",
      rating: 4.8,
      reviews: 7,
    },
  },
]

export const reviews: Review[] = [
  {
    id: "1",
    author: "Lucas D.",
    avatar: "https://placehold.co/50x50/e8e8e8/333333?text=LD",
    rating: 5,
    comment:
      "Propriétaire très réactif et à l'écoute. La maison correspondait parfaitement à la description. Je recommande !",
    date: "2026-02-15",
  },
  {
    id: "2",
    author: "Emma B.",
    avatar: "https://placehold.co/50x50/e8e8e8/333333?text=EB",
    rating: 4,
    comment:
      "Bon contact, logement propre à l'entrée. Quelques petits travaux à prévoir mais dans l'ensemble très satisfaite.",
    date: "2026-01-20",
  },
  {
    id: "3",
    author: "Thomas M.",
    avatar: "https://placehold.co/50x50/e8e8e8/333333?text=TM",
    rating: 5,
    comment:
      "Excellent propriétaire, très professionnel. Les démarches ont été simples et rapides.",
    date: "2025-12-10",
  },
]

export const coordinates: Record<string, [number, number]> = {
  "Legé": [46.8833, -1.6],
  "La Limouzinière": [46.95, -1.6167],
  "Machecoul": [46.9933, -1.8167],
  "Saint-Philbert-de-Grand-Lieu": [47.0367, -1.6417],
  "Touvois": [46.9, -1.6833],
  "Corcoué-sur-Logne": [46.95, -1.5833],
}
