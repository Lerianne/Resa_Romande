import romandeEnergieLogo from "@/assets/romande-energie-logo.png";

export function ResaLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2.5">
        <img
          src={romandeEnergieLogo}
          alt="Romande Energie"
          className="h-14 w-auto object-contain sm:h-16"
        />
        <span className="border-l border-border pl-2.5 font-display text-lg font-semibold text-foreground">
          RESA
        </span>
      </div>
    </div>
  );
}
