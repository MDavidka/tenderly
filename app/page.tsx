'use client';

import React from 'react';
import Link from 'next/link';
import { GAMES } from '@/lib/games';
import GameCard from '@/components/GameCard';
import { Cpu, Shield, Zap, Server, Award, Globe, Users, ArrowRight, Play, Terminal } from 'lucide-react';

export default function HomePage() {
  // Show only 4 popular/featured games on landing
  const featuredGames = GAMES.filter(g => g.popular || ['minecraft', 'palworld', 'rust', 'cs2'].includes(g.id)).slice(0, 4);

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
        {/* Futuristic background grid & glowing orbs */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px] -z-10 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-secondary/10 blur-[80px] -z-10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary glow-primary">
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>INSTANT PROVISIONING UNDER 60 SECONDS</span>
          </div>

          <h1 className="text-[clamp(2rem,6vw+0.5rem,4.5rem)] font-extrabold tracking-tight leading-none text-balance">
            Unleash the Ultimate <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-emerald-400 bg-clip-text text-transparent">
              Gaming Infrastructure
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-[clamp(1rem,1.5vw+0.5rem,1.25rem)] text-muted-foreground leading-relaxed text-pretty">
            Host high-tickrate servers powered by dedicated <strong className="text-foreground">AMD Ryzen 9 7950X3D</strong> processors, enterprise NVMe Gen4 storage, and custom 12Tbps DDoS shielding.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/pricing"
              className="w-full sm:w-auto rounded-xl bg-primary text-background font-bold px-8 py-4 text-sm tracking-wide transition-all hover:bg-primary/90 hover:scale-[1.02] glow-primary flex items-center justify-center gap-2"
            >
              <Play className="h-4 w-4 fill-current" />
              Deploy Game Server
            </Link>
            <Link
              href="/games"
              className="w-full sm:w-auto rounded-xl bg-muted border border-border text-foreground font-bold px-8 py-4 text-sm tracking-wide transition-all hover:bg-muted/80 hover:border-border/80 flex items-center justify-center gap-2"
            >
              Explore 8+ Games
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Interactive Panel Mockup */}
          <div className="pt-12 max-w-5xl mx-auto">
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
              {/* Window bar */}
              <div className="bg-muted/50 border-b border-border px-4 py-3 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-xs font-mono text-muted-foreground">aethernode-web-panel v2.6.4</div>
                <div className="w-12" />
              </div>
              {/* Screen preview */}
              <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-left font-mono">
                <div className="md:col-span-2 rounded-lg bg-black p-4 space-y-2 h-[220px] overflow-hidden text-xs text-muted-foreground border border-border">
                  <p className="text-primary">&gt; aethernode-cli status</p>
                  <p className="text-emerald-400">[OK] Node-04 (Ashburn, VA) is fully operational</p>
                  <p className="text-emerald-400">[OK] Allocating 16384MB RAM to Palworld Server</p>
                  <p className="text-emerald-400">[OK] Virtual core affinity: Ryzen 9 7950X3D @ 5.7GHz</p>
                  <p className="text-gray-600">[14:32:01] Player [Valkyrie] connected from 104.23.44.12</p>
                  <p className="text-gray-600">[14:32:05] Auto-save completed in 0.12 seconds</p>
                  <p className="text-amber-400">[WARN] Memory garbage collection triggered (freed 412MB)</p>
                  <p className="text-gray-600">[14:34:55] Player [Gamer99] connected from 198.11.12.54</p>
                </div>
                <div className="rounded-lg bg-muted/30 p-4 space-y-4 border border-border text-xs">
                  <div className="space-y-1">
                    <p className="text-muted-foreground uppercase font-semibold text-[10px]">Active Server</p>
                    <p className="text-sm font-bold text-foreground">Palworld Guild Server</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground uppercase font-semibold text-[10px]">CPU CORE LOAD</p>
                    <div className="w-full bg-black rounded-full h-2 overflow-hidden border border-border">
                      <div className="bg-primary h-full rounded-full" style={{ width: '42%' }} />
                    </div>
                    <div className="flex justify-between text-[10px]"><span>42%</span><span>Core #7</span></div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground uppercase font-semibold text-[10px]">RAM ALLOCATION</p>
                    <div className="w-full bg-black rounded-full h-2 overflow-hidden border border-border">
                      <div className="bg-secondary h-full rounded-full" style={{ width: '75%' }} />
                    </div>
                    <div className="flex justify-between text-[10px]"><span>12.0 / 16.0 GB</span><span>75%</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED GAMES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
              Supported Game Servers
            </h2>
            <p className="text-muted-foreground max-w-xl">
              We provide fine-tuned, instant-setup virtual machines for the world's most popular multiplayer titles.
            </p>
          </div>
          <Link
            href="/games"
            className="text-sm font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 shrink-0"
          >
            View all games
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* 3. BENTO GRID FEATURES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Engineered for Competitive Play
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our infrastructure is built for zero bottlenecks, ultra-low ping, and maximum reliability.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Anchor Cell - 12-col base, 5-col md, 2-row */}
          <div className="md:col-span-5 md:row-span-2 rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-primary/10 blur-[80px] group-hover:scale-125 transition-all" />
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-foreground">
                Ryzen 9 7950X3D Processors
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Gaming servers rely heavily on single-thread clock speeds. Our host nodes run AMD Ryzen 9 7950X3D processors with 3D V-Cache, boosting single-core speeds up to 5.7GHz. Say goodbye to tickrate drops and rubberbanding.
              </p>
            </div>
            <div className="border-t border-border pt-6 mt-6 flex justify-between text-xs text-muted-foreground">
              <div>
                <p className="font-bold text-foreground">5.7 GHz</p>
                <p>Boost Clock</p>
              </div>
              <div>
                <p className="font-bold text-foreground">144 MB</p>
                <p>L3 Cache</p>
              </div>
              <div>
                <p className="font-bold text-foreground">DDR5 ECC</p>
                <p>System Memory</p>
              </div>
            </div>
          </div>

          {/* Cell 2 - 7-col md */}
          <div className="md:col-span-7 rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6 group">
            <div className="space-y-4 max-w-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                12Tbps Corero DDoS Mitigation
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our custom scrubbing center filters out malicious traffic in real-time without adding latency. Protect your community from complex L3/L4 and game-specific L7 attacks.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center bg-muted/30 border border-border rounded-xl p-4 shrink-0 w-full md:w-36 text-center">
              <span className="text-2xl font-black text-secondary">12 Tbps</span>
              <span className="text-[10px] text-muted-foreground uppercase">Filter Capacity</span>
            </div>
          </div>

          {/* Cell 3 - 3-col md */}
          <div className="md:col-span-3 rounded-2xl border border-border bg-card p-6 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Zap className="h-5 w-5 fill-current" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Instant Deploy</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our automation API provisions your server files, sets up ports, and generates SFTP keys in under 60 seconds.
              </p>
            </div>
          </div>

          {/* Cell 4 - 4-col md */}
          <div className="md:col-span-4 rounded-2xl border border-border bg-card p-6 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Terminal className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Advanced Web Console</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Manage files with our full-featured web console. Edit configs, install plugins with 1-click, and schedule automated backups.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. REAL-TIME STATS SECTION */}
      <section className="border-y border-border bg-muted/10 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-[clamp(1.75rem,3vw,3rem)] font-black tracking-tight text-primary">142,800+</p>
              <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Servers Deployed</p>
            </div>
            <div className="space-y-2">
              <p className="text-[clamp(1.75rem,3vw,3rem)] font-black tracking-tight text-foreground">99.99%</p>
              <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Uptime SLA</p>
            </div>
            <div className="space-y-2">
              <p className="text-[clamp(1.75rem,3vw,3rem)] font-black tracking-tight text-emerald-400">&lt; 15ms</p>
              <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Average Ping</p>
            </div>
            <div className="space-y-2">
              <p className="text-[clamp(1.75rem,3vw,3rem)] font-black tracking-tight text-secondary">6</p>
              <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Global Locations</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-card to-muted p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden glow-primary">
          <div className="space-y-4 max-w-xl text-left">
            <h2 className="text-3xl font-extrabold text-foreground leading-tight">
              Ready to Launch Your Game Server?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Experience gaming the way it was meant to be. High tickrate, zero lag, and professional administrative controls. Setup takes less than a minute.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link
              href="/pricing"
              className="rounded-xl bg-primary text-background font-bold px-8 py-4 text-sm tracking-wide transition-all hover:bg-primary/90 hover:scale-[1.02] text-center glow-primary"
            >
              Deploy Now
            </Link>
            <Link
              href="/games"
              className="rounded-xl bg-muted border border-border text-foreground font-bold px-8 py-4 text-sm tracking-wide transition-all hover:bg-muted/80 text-center"
            >
              Browse Games
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
