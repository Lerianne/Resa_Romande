import { Link } from "@tanstack/react-router";
import { Bell, Gauge, Gift, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

import { household, tokens } from "@/lib/resa-data";

import { ResaLogo } from "./resa-logo";

const nav = [
  { to: "/", label: "Tableau de bord", icon: Gauge },
  { to: "/recompenses", label: "Récompenses", icon: Gift },
  { to: "/recommandations", label: "Recommandations", icon: Lightbulb },
] as const;

export function ResaShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-4">
          <ResaLogo />
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-mint hover:text-mint-foreground"
                activeProps={{ className: "bg-primary text-primary-foreground hover:bg-primary" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden rounded-full bg-mint px-3 py-1.5 text-xs font-semibold text-mint-foreground sm:inline">
              {tokens.balance.toLocaleString("fr-CH")} jetons
            </span>
            <button
              type="button"
              aria-label="Notifications"
              className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:bg-mint hover:text-mint-foreground"
            >
              <Bell className="h-4 w-4" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              FR
            </div>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto border-t border-border/70 px-5 py-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-muted-foreground"
              activeProps={{ className: "bg-primary text-primary-foreground" }}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-20 pt-8">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-soft">
            {household.name} · {household.address}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground sm:text-4xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {children}
      </main>

      <footer className="border-t border-border/70 bg-mint/50">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            RESA — assistant énergie de Romande Energie · Compteur {household.meter} ·{" "}
            {household.tariff}
          </span>
          <span>Données hébergées en Suisse · Consentement révocable à tout moment</span>
        </div>
      </footer>
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-border/80 bg-card p-5 shadow-card ${className}`}
    >
      {children}
    </div>
  );
}
