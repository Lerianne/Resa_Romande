// Demo data for the RESA household energy assistant.
// Values simulate a connected household in French-speaking Switzerland.

export const household = {
  name: "Famille Ricard",
  address: "Chemin des Pâles 18, 1095 Lutry",
  meter: "CH-SM-1042 8871",
  tariff: "Vario Plus — 0.2760 CHF/kWh",
  devices: ["Panneaux solaires 6.4 kWp", "Borne de recharge VE", "Pompe à chaleur", "Batterie 10 kWh"],
};

export const liveMetrics = {
  currentPower: 2.14, // kW
  solarProduction: 3.42, // kW
  batteryLevel: 78, // %
  gridExport: 1.28, // kW
  selfConsumption: 64, // %
  co2Avoided: 41.6, // kg this month
};

export const monthToDate = {
  consumedKwh: 384,
  producedKwh: 297,
  billedChf: 106.0,
  daysElapsed: 26,
  daysInMonth: 30,
};

export const forecast = {
  endOfMonthKwh: 443,
  endOfMonthChf: 122.3,
  previousMonthKwh: 471,
  previousMonthChf: 132.8,
  neighbourhoodAvgKwh: 512,
  confidence: 92,
};

export const dailyConsumption = [
  { day: "1", conso: 14.2, solaire: 9.1 },
  { day: "3", conso: 15.6, solaire: 11.4 },
  { day: "5", conso: 13.1, solaire: 12.8 },
  { day: "7", conso: 16.4, solaire: 8.2 },
  { day: "9", conso: 12.8, solaire: 13.6 },
  { day: "11", conso: 15.2, solaire: 12.1 },
  { day: "13", conso: 17.9, solaire: 7.4 },
  { day: "15", conso: 14.6, solaire: 11.9 },
  { day: "17", conso: 13.4, solaire: 14.2 },
  { day: "19", conso: 15.8, solaire: 10.6 },
  { day: "21", conso: 16.2, solaire: 9.8 },
  { day: "23", conso: 14.1, solaire: 12.4 },
  { day: "25", conso: 13.7, solaire: 13.1 },
  { day: "26", conso: 15.0, solaire: 11.2 },
];

export const hourlyLoad = [
  { hour: "00h", kw: 0.6 },
  { hour: "03h", kw: 0.4 },
  { hour: "06h", kw: 1.2 },
  { hour: "09h", kw: 1.9 },
  { hour: "12h", kw: 2.6 },
  { hour: "15h", kw: 2.1 },
  { hour: "18h", kw: 3.4 },
  { hour: "21h", kw: 2.2 },
];

export const deviceBreakdown = [
  { name: "Pompe à chaleur", kwh: 148, share: 39 },
  { name: "Recharge VE", kwh: 112, share: 29 },
  { name: "Cuisine & électroménager", kwh: 64, share: 17 },
  { name: "Éclairage & veilles", kwh: 37, share: 9 },
  { name: "Divers", kwh: 23, share: 6 },
];

export const tradingActivity = [
  { label: "Surplus vendu au voisinage", value: "48 kWh", amount: "+ 9.60 CHF" },
  { label: "Énergie achetée en communauté", value: "22 kWh", amount: "− 4.20 CHF" },
  { label: "Commission Romande Energie", value: "—", amount: "− 0.45 CHF" },
];

export const tokens = {
  balance: 2480,
  monthEarned: 310,
  tier: "Argent",
  nextTier: "Or",
  toNextTier: 520,
};

export const tokenHistory = [
  { date: "24 sept.", label: "Recharge VE décalée en heures creuses", amount: 60 },
  { date: "21 sept.", label: "Surplus solaire partagé avec la communauté", amount: 85 },
  { date: "18 sept.", label: "Pic de réseau évité (18h–20h)", amount: 45 },
  { date: "14 sept.", label: "Objectif hebdomadaire atteint", amount: 70 },
  { date: "09 sept.", label: "Parrainage d'un voisin", amount: 50 },
];

export const rewardCatalog = [
  {
    partner: "Logitech",
    title: "20% sur les accessoires connectés",
    cost: 800,
    category: "Maison connectée",
  },
  {
    partner: "Infomaniak",
    title: "6 mois de stockage Swiss Cloud",
    cost: 1200,
    category: "Numérique",
  },
  { partner: "CFF", title: "Carte journalière dégriffée", cost: 1500, category: "Mobilité" },
  { partner: "Coop", title: "Bon d'achat de 20 CHF", cost: 1000, category: "Quotidien" },
  {
    partner: "Romande Energie",
    title: "1 mois d'abonnement RESA offert",
    cost: 600,
    category: "Énergie",
  },
  {
    partner: "Alpiq Trail",
    title: "Entrée musée & expo énergie",
    cost: 450,
    category: "Loisirs",
  },
];

export const challenges = [
  {
    title: "Semaine sans pic",
    detail: "Restez sous 3 kW entre 18h et 20h pendant 7 jours",
    progress: 71,
    reward: 120,
  },
  {
    title: "Solaire d'abord",
    detail: "Atteignez 70% d'autoconsommation sur le mois",
    progress: 91,
    reward: 150,
  },
  {
    title: "Voisin solidaire",
    detail: "Partagez 60 kWh de surplus avec la communauté locale",
    progress: 80,
    reward: 100,
  },
];

export const recommendations = [
  {
    title: "Décaler la recharge du VE à 23h",
    impact: "− 14.20 CHF / mois",
    tokens: 60,
    effort: "Automatisable",
    detail:
      "Votre véhicule est branché vers 19h, en pleine pointe. En lançant la recharge à 23h, vous payez le tarif creux et évitez de solliciter le réseau.",
    category: "Mobilité",
  },
  {
    title: "Abaisser la pompe à chaleur de 1°C la nuit",
    impact: "− 9.80 CHF / mois",
    tokens: 40,
    effort: "Automatisable",
    detail:
      "Entre 23h et 6h, une consigne à 19°C suffit au confort. Le gain sur la pompe à chaleur représente près de 8% de votre consommation mensuelle.",
    category: "Chauffage",
  },
  {
    title: "Programmer le lave-linge sur le pic solaire",
    impact: "− 4.60 CHF / mois",
    tokens: 25,
    effort: "1 réglage",
    detail:
      "Vos panneaux produisent le plus entre 11h et 15h. Décaler deux cycles par semaine dans cette fenêtre les rend quasiment gratuits.",
    category: "Électroménager",
  },
  {
    title: "Vendre le surplus de batterie en fin de journée",
    impact: "+ 6.30 CHF / mois",
    tokens: 55,
    effort: "Automatisable",
    detail:
      "Votre batterie reste souvent à plus de 70% le soir. Revendre 4 kWh au réseau communautaire vers 19h valorise ce surplus au meilleur prix.",
    category: "Échange",
  },
  {
    title: "Passer au tarif Vario Nuit",
    impact: "− 7.10 CHF / mois",
    tokens: 0,
    effort: "Changement de contrat",
    detail:
      "Avec 58% de votre consommation déjà en heures creuses, le tarif Vario Nuit devient plus avantageux que votre contrat actuel.",
    category: "Contrat",
  },
  {
    title: "Isoler la conduite d'eau chaude au sous-sol",
    impact: "− 5.40 CHF / mois",
    tokens: 30,
    effort: "Petits travaux",
    detail:
      "Les pertes thermiques sur les 6 mètres non isolés représentent environ 20 kWh par mois. Un installateur partenaire intervient en 2 heures.",
    category: "Bâtiment",
  },
];
