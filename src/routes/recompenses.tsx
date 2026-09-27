import { createFileRoute } from "@tanstack/react-router";
import { Award, Coins, Sparkles, Target } from "lucide-react";

import { Card, ResaShell } from "@/components/resa-shell";
import { challenges, rewardCatalog, tokenHistory, tokens } from "@/lib/resa-data";

export const Route = createFileRoute("/recompenses")({
  head: () => ({
    meta: [
      { title: "Récompenses — RESA, assistant énergie Romande Energie" },
      {
        name: "description",
        content:
          "Gagnez des jetons en déplaçant votre consommation et échangez-les chez les partenaires de Romande Energie.",
      },
      { property: "og:title", content: "Récompenses — RESA" },
      {
        property: "og:description",
        content:
          "Jetons gagnés, défis en cours et catalogue partenaires pour votre foyer connecté.",
      },
    ],
  }),
  component: RewardsPage,
});

function RewardsPage() {
  const tierProgress = Math.round(
    (tokens.balance / (tokens.balance + tokens.toNextTier)) * 100,
  );

  return (
    <ResaShell
      title="Vos récompenses"
      subtitle="Chaque geste qui soulage le réseau vous rapporte des jetons, échangeables chez nos partenaires suisses — bien au-delà de l'énergie."
    >
      <section className="grid items-start gap-4 lg:grid-cols-3">
        <Card className="bg-primary text-primary-foreground lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] opacity-80">
                <Coins className="h-4 w-4" /> Solde de jetons
              </p>
              <p className="mt-3 metric-value text-5xl">
                {tokens.balance.toLocaleString("fr-CH")}
              </p>
              <p className="mt-1 text-sm opacity-85">+ {tokens.monthEarned} jetons ce mois-ci</p>
            </div>
            <span className="flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1.5 text-sm font-semibold">
              <Award className="h-4 w-4" /> Statut {tokens.tier}
            </span>
          </div>
          <div className="mt-7">
            <div className="flex justify-between text-xs opacity-85">
              <span>Vers le statut {tokens.nextTier}</span>
              <span>{tokens.toNextTier} jetons restants</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary-foreground/25">
              <div
                className="h-full rounded-full bg-primary-foreground"
                style={{ width: `${tierProgress}%` }}
              />
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Sparkles className="h-4 w-4 text-primary" /> Derniers gains
          </h2>
          <ul className="mt-4 space-y-3">
            {tokenHistory.map((entry) => (
              <li key={entry.label} className="flex items-start justify-between gap-3 text-sm">
                <span>
                  <span className="block text-foreground">{entry.label}</span>
                  <span className="text-xs text-muted-foreground">{entry.date}</span>
                </span>
                <span className="whitespace-nowrap font-semibold text-primary">
                  + {entry.amount}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Target className="h-5 w-5 text-primary" /> Défis en cours
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {challenges.map((challenge) => (
            <Card key={challenge.title}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-base font-semibold">{challenge.title}</h3>
                <span className="whitespace-nowrap rounded-full bg-mint px-2.5 py-1 text-xs font-semibold text-mint-foreground">
                  + {challenge.reward}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{challenge.detail}</p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${challenge.progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{challenge.progress}% accompli</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Catalogue partenaires</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Échangez vos jetons auprès de nos partenaires suisses.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rewardCatalog.map((reward) => {
            const affordable = tokens.balance >= reward.cost;
            return (
              <Card key={reward.title} className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-soft">
                  {reward.partner}
                </span>
                <h3 className="mt-2 text-base font-semibold text-foreground">{reward.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{reward.category}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">
                    {reward.cost.toLocaleString("fr-CH")} jetons
                  </span>
                  <button
                    type="button"
                    disabled={!affordable}
                    className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-secondary disabled:text-muted-foreground"
                  >
                    {affordable ? "Échanger" : "Bientôt"}
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </ResaShell>
  );
}
