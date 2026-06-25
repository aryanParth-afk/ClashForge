"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Swords, Home, Users, User } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/player", label: "Player", icon: User },
  { href: "/clan", label: "Clan", icon: Users },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full glass" id="main-navbar">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ── Logo / Brand ── */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
          id="navbar-brand"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 transition-colors group-hover:bg-primary/25">
            <Swords className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Clash<span className="text-primary">Forge</span>
          </span>
        </Link>

        {/* ── Navigation links ── */}
        <nav className="flex items-center gap-1" id="navbar-links">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                id={`nav-link-${label.toLowerCase()}`}
                className={`
                  relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>

                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute -bottom-px left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
