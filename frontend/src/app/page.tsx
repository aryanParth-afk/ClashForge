import { Swords, ArrowRight, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* ── Animated Background Blobs ── */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-4/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-pulse" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-chart-2/10 rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-pulse" style={{ animationDelay: "4s" }}></div>

      {/* ── Hero Content ── */}
      <section className="relative z-10 flex flex-col items-center text-center max-w-4xl w-full">
        
        {/* Floating Icons */}
        <div className="flex items-center justify-center gap-6 mb-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-chart-1/10 border border-chart-1/20 shadow-lg rotate-[-10deg] hover:rotate-0 transition-transform">
            <Shield className="h-8 w-8 text-chart-1" />
          </div>
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/20 border border-primary/30 shadow-[0_0_30px_rgba(45,212,191,0.3)] z-10">
            <Swords className="h-10 w-10 text-primary" />
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-chart-5/10 border border-chart-5/20 shadow-lg rotate-[10deg] hover:rotate-0 transition-transform">
            <Zap className="h-8 w-8 text-chart-5" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl animate-in fade-in zoom-in-95 duration-1000 delay-150 fill-mode-both">
          Forge your <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-chart-3 to-chart-4">strategy.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
          A premium, data-driven command centre for Clash of Clans.
          Automatically sync your base, analyse live clan data, and plan your upgrades.
        </p>

        {/* Call to Action */}
        <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
          <Link
            href="/dashboard"
            className="group relative inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-[0_0_40px_rgba(45,212,191,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(45,212,191,0.6)]"
          >
            Launch Dashboard
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            
            {/* Sparkle effect */}
            <div className="absolute inset-0 rounded-full border border-white/20"></div>
          </Link>
        </div>
        
        <p className="mt-6 text-sm text-muted-foreground/60 animate-in fade-in duration-1000 delay-700 fill-mode-both">
          No sign-up required. Simply link your player tag.
        </p>
      </section>
    </div>
  );
}
