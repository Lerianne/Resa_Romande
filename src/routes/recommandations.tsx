import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Coins, Wand2 } from "lucide-react";

import { Card, ResaShell } from "@/components/resa-shell";
import { recommendations } from "@/lib/resa-data";

export const Route = createFileRoute("/recommandations")({
  head: () => ({
    meta: [
      { title: "Recommandations — RESA, assistant énergie Romande Energie" },
      {
        name: "description",
        content:
          "Des actions concrètes calculées sur vos données de compteur pour réduire votre facture et gagner des jetons.",
      },
      { property: "og:title", content: "Recommandations — RESA" },
      {
        property: "og:description",
        content:
          "Actions personnalisées pour réduire votre facture d'électricité et valoriser votre surplus solaire.",
      },
    ],
  }),
  component: RecommendationsPage,
});

function parseImpact(impact: string) {
  const value = Number(impact.replace(/[^\d.]/g, ""));
  return impact.trim().startsWith("+") ? value : -value;
}

function RecommendationsPage() {
  const savings = recommendations
    .map((r) => parseImpact(r.impact))
    .reduce((sum, value) => sum + Math.abs(value), 0);
  const tokenTotal = recommendations.reduce((sum, r) => sum + r.tokens, 0);
  const automatable = recommendations.filter((r) => r.effort === "Automatisable").length;

  return (
    <ResaShell
      title="Recommandations personnalisées"
      subtitle="RESA analyse vos courbes de charge, la météo et les prix horaires pour proposer les gestes les plus rentables — la plupart peuvent être automatisés en un clic."
    >
      <section className="grid gap-4 sm:grid-cols-3">
        <Card className="bg-mint text-mint-foreground">
          <p className="text-xs font-semibold uppercase tracking-[0.12em]">Économies possibles</p>
          <p className="mt-2 metric-value text-3xl">{savings.toFixed(2)} CHF</p>
          <p className="mt-1 text-xs opacity-80">par mois, toutes actions appliquées</p>
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Jetons à gagner
          </p>
          <p className="mt-2 metric-value text-3xl text-foreground">{tokenTotal}</p>
          <p className="mt-1 text-xs text-muted-foreground">crédités dès la mise en place</p>
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Automatisable
          </p>
          <p className="mt-2 metric-value text-3xl text-foreground">
            {automatable}
            <span className="text-base font-medium text-muted-foreground">
              /{recommendations.length}
            </span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">sans intervention de votre part</p>
        </Card>
      </section>

      <section className="mt-8 space-y-4">
        {recommendations.map((item) => {
          const gain = parseImpact(item.impact) > 0;
          return (
            <Card key={item.title}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                      {item.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.effort}</span>
                  </div>
                  <h2 className="mt-2.5 text-lg font-semibold text-foreground">{item.title}</h2>
                  <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{item.detail}</p>
                </div>

                <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                  <span
                    className={`metric-value text-xl ${gain ? "text-primary-soft" : "text-primary"}`}
                  >
                    {item.impact}
                  </span>
                  {item.tokens > 0 && (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-mint-foreground">
                      <Coins className="h-3.5 w-3.5" /> + {item.tokens} jetons
                    </span>
                  )}
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    {item.effort === "Automatisable" ? (
                      <>
                        <Wand2 className="h-3.5 w-3.5" /> Automatiser
                      </>
                    ) : (
                      <>
                        Voir la démarche <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </section>
    </ResaShell>
  );
}
