import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-base font-bold text-primary-foreground">S</span>
              </div>
              <span className="text-lg font-semibold">
                <span className="text-foreground">Simz</span>
                <span className="text-primary">Local</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              La plateforme de référence pour les annonces immobilières dans le Pays de Retz.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/annonces" className="text-muted-foreground hover:text-foreground">
                  Toutes les annonces
                </Link>
              </li>
              <li>
                <Link href="/carte" className="text-muted-foreground hover:text-foreground">
                  Carte interactive
                </Link>
              </li>
              <li>
                <Link href="/publier" className="text-muted-foreground hover:text-foreground">
                  Publier une annonce
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Communes</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/annonces?commune=Legé" className="text-muted-foreground hover:text-foreground">
                  Legé
                </Link>
              </li>
              <li>
                <Link href="/annonces?commune=Machecoul" className="text-muted-foreground hover:text-foreground">
                  Machecoul
                </Link>
              </li>
              <li>
                <Link
                  href="/annonces?commune=Saint-Philbert-de-Grand-Lieu"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Saint-Philbert-de-Grand-Lieu
                </Link>
              </li>
              <li>
                <Link href="/annonces?commune=La Limouzinière" className="text-muted-foreground hover:text-foreground">
                  La Limouzinière
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contact@simzlocal.fr</li>
              <li>Pays de Retz, Loire-Atlantique</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SimzLocal. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
