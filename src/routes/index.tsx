import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BatteryCharging,
  Leaf,
  Plug,
  Sun,
  TrendingDown,
  Users,
  Zap,
} from "lucide-react";

import { Card, ResaShell } from "@/components/resa-shell";
import {
  dailyConsumption,
  deviceBreakdown,
  forecast,
  hourlyLoad,
  household,
  liveMetrics,
  monthToDate,
  tradingActivity,
} from "@/lib/resa-data";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Tableau de bord — RESA, assistant énergie Romande Energie" },
      {
        name: "description",
        content:
          "Suivez en direct la consommation, la production solaire et la facture prévisionnelle de fin de mois de votre foyer connecté.",
      },
      { property: "og:title", content: "Tableau de bord — RESA" },
      {
        property: "og:description",
        content:
          "Consommation en direct, production solaire et prévision de facture pour votre foyer connecté.",
      },
    ],
  }),
  component: Dashboard,
});

const chartAxis = {
  stroke: "var(--muted-foreground)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
};

function tooltipStyle() {
  return {
    contentStyle: {
      borderRadius: 12,
      border: "1px solid var(--border)",
      fontSize: 12,
      fontFamily: "var(--font-family-sans)",
    },
  };
}

function Metric({
  icon: Icon,
  label,
  value,
  unit,
  hint,
}: {
  icon: typeof Zap;
  label: string;
  value: string;
  unit: string;
  hint: string;
}) {
  return (
    <Card>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-xs font-medium uppercase tracking-[0.1em]">{label}</span>
      </div>
      <p className="mt-3 metric-value text-3xl text-foreground">
        {value}
        <span className="ml-1 text-sm font-medium text-muted-foreground">{unit}</span>
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </Card>
  );
}

function Dashboard() {
  const progress = Math.round((monthToDate.daysElapsed / monthToDate.daysInMonth) * 100);
  const chfDelta = forecast.previousMonthChf - forecast.endOfMonthChf;
  const vsNeighbours = Math.round(
    ((forecast.neighbourhoodAvgKwh - forecast.endOfMonthKwh) / forecast.neighbourhoodAvgKwh) * 100,
  );

  return (
    <ResaShell
      title="Votre énergie, en direct"
      subtitle="RESA lit votre compteur intelligent et vos appareils connectés pour suivre la consommation du foyer, la production solaire et la facture attendue en fin de mois."
    >
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric
          icon={Zap}
          label="Puissance actuelle"
          value={liveMetrics.currentPower.toFixed(2)}
          unit="kW"
          hint="Relevé il y a 30 secondes"
        />
        <Metric
          icon={Sun}
          label="Production solaire"
          value={liveMetrics.solarProduction.toFixed(2)}
          unit="kW"
          hint={`${liveMetrics.selfConsumption}% d'autoconsommation`}
        />
        <Metric
          icon={BatteryCharging}
          label="Batterie domestique"
          value={String(liveMetrics.batteryLevel)}
          unit="%"
          hint={`${liveMetrics.gridExport.toFixed(2)} kW injectés au réseau`}
        />
        <Metric
          icon={Leaf}
          label="CO₂ évité"
          value={liveMetrics.co2Avoided.toFixed(1)}
          unit="kg"
          hint="Depuis le début du mois"
        />
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-lg font-semibold">Consommation et production journalières</h2>
            <span className="text-xs text-muted-foreground">Septembre — kWh par jour</span>
          </div>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyConsumption} margin={{ left: -18, right: 6, top: 6 }}>
                <defs>
                  <linearGradient id="conso" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="solaire" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" {...chartAxis} />
                <YAxis {...chartAxis} />
                <Tooltip {...tooltipStyle()} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Area
                  type="monotone"
                  dataKey="conso"
                  name="Consommation"
                  stroke="var(--chart-1)"
                  strokeWidth={2.4}
                  fill="url(#conso)"
                />
                <Area
                  type="monotone"
                  dataKey="solaire"
                  name="Production solaire"
                  stroke="var(--chart-2)"
                  strokeWidth={2.4}
                  fill="url(#solaire)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] opacity-80">
            Prévision de fin de mois
          </h2>
          <p className="mt-4 metric-value text-4xl">
            {forecast.endOfMonthChf.toFixed(2)}
            <span className="ml-1 text-base font-medium opacity-80">CHF</span>
          </p>
          <p className="mt-1 text-sm opacity-85">
            soit {forecast.endOfMonthKwh} kWh estimés · fiabilité {forecast.confidence}%
          </p>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-xl bg-primary-foreground/12 px-3 py-2">
              <span className="flex items-center gap-2 opacity-90">
                <TrendingDown className="h-4 w-4" /> vs mois précédent
              </span>
              <span className="font-semibold">− {chfDelta.toFixed(2)} CHF</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-primary-foreground/12 px-3 py-2">
              <span className="flex items-center gap-2 opacity-90">
                <Users className="h-4 w-4" /> vs foyers similaires
              </span>
              <span className="font-semibold">− {vsNeighbours}%</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-xs opacity-85">
              <span>
                Facturé à ce jour · {monthToDate.billedChf.toFixed(2)} CHF
              </span>
              <span>
                Jour {monthToDate.daysElapsed}/{monthToDate.daysInMonth}
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary-foreground/25">
              <div
                className="h-full rounded-full bg-primary-foreground"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card>
          <h2 className="text-lg font-semibold">Profil de charge type</h2>
          <p className="mt-1 text-xs text-muted-foreground">Puissance moyenne appelée (kW)</p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyLoad} margin={{ left: -22, right: 6, top: 6 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="hour" {...chartAxis} />
                <YAxis {...chartAxis} />
                <Tooltip {...tooltipStyle()} />
                <Bar dataKey="kw" name="kW" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />

              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">Répartition par usage</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {monthToDate.consumedKwh} kWh consommés ce mois
          </p>
          <ul className="mt-4 space-y-3">
            {deviceBreakdown.map((device) => (
              <li key={device.name}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-foreground">{device.name}</span>
                  <span className="text-muted-foreground">{device.kwh} kWh</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${device.share}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-4">
          <Card>
            <h2 className="text-lg font-semibold">Échanges de voisinage</h2>
            <ul className="mt-3 space-y-2.5 text-sm">
              {tradingActivity.map((row) => (
                <li key={row.label} className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="whitespace-nowrap font-medium text-foreground">
                    {row.amount}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="bg-mint text-mint-foreground">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em]">
              <Plug className="h-4 w-4" /> Appareils connectés
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {household.devices.map((device) => (
                <li key={device} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {device}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
    </ResaShell>
  );
}
