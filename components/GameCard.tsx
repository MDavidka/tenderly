'use client';

import React from 'react';
import Link from 'next/link';
import { Game } from '../lib/games';
import { Sword, Flame, Skull, Target, Sailboat, Egg, Sparkles, Wrench, ArrowRight, Cpu, HardDrive } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

export const GAME_ICONS: Record<string, React.ComponentType<any>> = {
  minecraft: Sword,
  palworld: Flame,
  rust: Skull,
  cs2: Target,
  valheim: Sailboat,
  ark: Egg,
  enshrouded: Sparkles,
  gmod: Wrench,
};

export default function GameCard({ game }: GameCardProps) {
  const IconComponent = GAME_ICONS[game.id] || Sword;

  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,242,254,0.05)] group">
      {/* Decorative gradient background */}
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-2xl transition-all group-hover:scale-150" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted border border-border text-primary group-hover:bg-primary group-hover:text-background transition-all">
            <IconComponent className="h-6 w-6" />
          </div>
          {game.popular && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
              POPULAR
            </span>
          )}
        </div>

        {/* Title & Desc */}
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {game.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-6">
          {game.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 border-t border-border pt-4 mb-6">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase">Min CPU</p>
              <p className="text-xs font-semibold text-foreground">{game.minCpu} vCPUs</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase">Min Storage</p>
              <p className="text-xs font-semibold text-foreground">{game.minStorage}GB NVMe</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="flex items-center justify-between mt-auto">
        <div>
          <p className="text-xs text-muted-foreground">Starting at</p>
          <p className="text-lg font-extrabold text-foreground">
            ${game.basePrice.toFixed(2)}
            <span className="text-xs font-normal text-muted-foreground">/mo</span>
          </p>
        </div>
        <Link
          href={`/pricing?game=${game.id}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted border border-border text-foreground hover:bg-primary hover:text-background hover:border-primary transition-all group/btn"
          aria-label={`Configure ${game.name} server`}
        >
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
