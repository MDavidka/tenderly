'use client';

import React, { useState } from 'react';
import { GAMES, Game } from '../../lib/games';
import GameCard from '../../components/GameCard';
import { Search, Filter, Cpu, Shield, HelpCircle } from 'lucide-react';

type CategoryFilter = 'all' | 'survival' | 'sandbox' | 'fps' | 'coop';

interface CategoryItem {
  id: CategoryFilter;
  name: string;
}

export default function GamesPage() {
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<CategoryFilter>('all');

  // Filter games based on search query and category
  const filteredGames = GAMES.filter((game: Game) => {
    const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase()) ||
                          game.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || game.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories: CategoryItem[] = [
    { id: 'all', name: 'All Games' },
    { id: 'survival', name: 'Survival' },
    { id: 'sandbox', name: 'Sandbox' },
    { id: 'fps', name: 'FPS' },
    { id: 'coop', name: 'Co-op' },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-[clamp(1.75rem,4vw+0.5rem,3rem)] font-extrabold tracking-tight text-foreground">
          Supported Games Library
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Search and deploy virtualized high-performance instances for your favorite games. All installations feature 1-click mod installers and auto-backups.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card rounded-xl border border-border p-4">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search games (e.g. Minecraft, Palworld)..."
            value={search}
            onChange={handleSearchChange}
            className="w-full rounded-lg border border-border bg-muted/30 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat: CategoryItem) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`rounded-lg px-4 py-2 text-xs font-semibold border transition-all ${
                category === cat.id
                  ? 'bg-primary text-background border-primary glow-primary'
                  : 'bg-muted/30 text-muted-foreground border-border hover:border-border/80 hover:text-foreground'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredGames.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-xl border border-dashed border-border space-y-4">
          <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto" />
          <h3 className="text-lg font-bold text-foreground">No games found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            We couldn't find any games matching "{search}". Try searching for another title, or contact support to request a game.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game: Game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}

      {/* Technical Guarantee Banner */}
      <div className="rounded-xl border border-border bg-muted/10 p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Cpu className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-foreground">No Resource Overselling</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Unlike budget providers, we never oversell our CPU cores or RAM. Your allocated hardware is 100% dedicated to your container at all times.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Shield className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-foreground">Always-On Protection</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Every game server has standard access to our 12Tbps Corero DDoS mitigation network, ensuring your server stays up even during intense attacks.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Search className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-foreground">Custom Game Configurations</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Gain full control over game parameters, startup flags, and server update branches directly through our advanced web dashboard.
          </p>
        </div>
      </div>

    </div>
  );
}
