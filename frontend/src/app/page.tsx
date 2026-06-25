import { Swords, User, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const FEATURES = [
  {
    icon: User,
    title: "Player Analyzer",
    description:
      "Enter any player tag to instantly view their accurate profile, hero equipment, and troop levels.",
    href: "/player",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    icon: Users,
    title: "Clan Inspector",
    description:
      "Look up any clan by tag. View stats, member roster, and war history — all cached for speed.",
    href: "/clan",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
      {/* ── Hero ── */}
      <section className="flex flex-col items-center pt-24 pb-16 text-center" id="hero">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 glow">
          <Swords className="h-8 w-8 text-primary" />
        </div>

        <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Forge your&nbsp;
          <span className="text-gradient">strategy</span>
        </h1>

        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          A data-driven command centre for Clash of Clans.
          Analyse villages, inspect clans, and plan upgrades —
          all from one sleek dashboard.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/player"
            id="cta-player"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 hover:shadow-[0_0_20px_rgba(45,212,191,0.4)]"
          >
            Analyse Player
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/clan"
            id="cta-clan"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            Inspect Clan
          </Link>
        </div>
      </section>

      {/* ── Feature cards ── */}
      <section
        className="grid w-full max-w-4xl gap-6 pb-24 sm:grid-cols-2"
        id="features"
      >
        {FEATURES.map(({ icon: Icon, title, description, href, color, bgColor }) => (
          <Link
            key={href}
            href={href}
            className="group glass rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:glow"
          >
            <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${bgColor}`}>
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <h2 className="mb-2 text-xl font-semibold">{title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
            <span className={`mt-4 inline-flex items-center gap-1 text-sm font-medium ${color} opacity-0 transition-opacity group-hover:opacity-100`}>
              Open <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
