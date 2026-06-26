'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GAMES, Game } from '@/lib/games';
import { useAetherStore } from '@/lib/store';
import { Cpu, HardDrive, Shield, Zap, Check, AlertCircle } from 'lucide-react';
import { GAME_ICONS } from './GameCard';
import { toast } from 'sonner';

export default function ServerSpecsSlider() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, createInstance } = useAetherStore();

  // Selected game from URL query, default to minecraft
  const initialGameId = searchParams.get('game') || 'minecraft';
  const initialGame = GAMES.find(g => g.id === initialGameId) || GAMES[0];

  const [ram, setRam] = useState(initialGame.minRam);
  const [selectedGame, setSelectedGame] = useState<Game>(initialGame);
  const [location, setLocation] = useState('us-east');
  const [serverName, setServerName] = useState('');

  // Update RAM if selected game changes
  useEffect(() => {
    if (selectedGame) {
      setRam(Math.max(ram, selectedGame.minRam));
    }
  }, [selectedGame]);

  // Calculate scaled CPU based on RAM
  const cpu = ram <= 4 ? 2 : ram <= 8 ? 4 : ram <= 16 ? 6 : 8;
  // Calculate scaled NVMe Storage based on RAM
  const storage = Math.max(selectedGame.minStorage, ram * 5);

  // Price Calculation: base price + (ram * price per gb)
  const price = selectedGame.basePrice + ((ram - selectedGame.minRam) * selectedGame.pricePerGb);

  const handleDeploy = () => {
    const finalServerName = serverName.trim() || `${selectedGame.name} Server`;
    
    if (!user) {
      toast.info('Please sign in to deploy and host your server instances.');
      router.push(`/login?redirect=pricing&game=${selectedGame.id}&ram=${ram}&location=${location}&name=${encodeURIComponent(finalServerName)}`);
      return;
    }

    try {
      const instanceId = createInstance({
        name: finalServerName,
        gameId: selectedGame.id,
        ram,
        cpu,
        storage,
        location,
        version: selectedGame.version,
      });

      toast.success(`Deploying ${finalServerName}! Redirecting to dashboard...`);
      router.push(`/dashboard?instance=${instanceId}`);
    } catch (error) {
      toast.error('Failed to create server instance.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Configuration Slider Panel */}
      <div className="lg:col-span-8 bg-card rounded-xl border border-border p-6 md:p-8 space-y-8">
        
        {/* Game Selector */}
        <div>
          <label className="text-sm font-semibold text-foreground block mb-3">
            1. Select Your Game
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {GAMES.map((game) => {
              const Icon = GAME_ICONS[game.id] || Cpu;
              const isSelected = selectedGame.id === game.id;
              return (
                <button
                  key={game.id}
                  onClick={() => setSelectedGame(game)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/5 text-primary glow-primary'
                      : 'border-border bg-muted/30 text-muted-foreground hover:border-border/80 hover:text-foreground'
                  }`}
                >
                  <Icon className="h-6 w-6 mb-2" />
                  <span className="text-xs font-bold truncate w-full">{game.name}</span>
                  <span className="text-[10px] text-muted-foreground mt-1">From ${game.basePrice.toFixed(0)}/mo</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Server Name input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-foreground block mb-2" htmlFor="srv-name">
              2. Server Name (Optional)
            </label>
            <input
              id="srv-name"
              type="text"
              placeholder={`My ${selectedGame.name} Server`}
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              className="w-full rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground block mb-2" htmlFor="srv-loc">
              3. Server Location
            </label>
            <select
              id="srv-loc"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="us-east">Ashburn, USA (Low Latency)</option>
              <option value="us-west">Hillsboro, USA (West Coast)</option>
              <option value="eu-west">Frankfurt, Germany (Central EU)</option>
              <option value="eu-uk">London, United Kingdom (UK)</option>
              <option value="ap-east">Singapore (Asia Pacific)</option>
              <option value="ap-south">Sydney, Australia (Oceania)</option>
            </select>
          </div>
        </div>

        {/* RAM Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-foreground block">
              4. Configure RAM Capacity
            </label>
            <span className="text-lg font-black text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-lg">
              {ram} GB DDR5 ECC
            </span>
          </div>

          <input
            type="range"
            min={selectedGame.minRam}
            max={64}
            step={2}
            value={ram}
            onChange={(e) => setRam(parseInt(e.target.value))}
            className="w-full h-2 rounded-lg bg-muted border border-border appearance-none cursor-pointer accent-primary"
          />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Min required: {selectedGame.minRam}GB</span>
            <span>Recommended: {selectedGame.minRam + 4}GB</span>
            <span>Extreme: 64GB</span>
          </div>

          {ram < selectedGame.minRam + 2 && (
            <div className="rounded-lg bg-amber-950/20 border border-amber-900/30 p-3 flex items-start gap-2 text-xs text-amber-400">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>
                Allocating near-minimum RAM is fine for small player counts, but we recommend adding at least 2-4GB more if you plan to install heavy modpacks or support 10+ concurrent players.
              </span>
            </div>
          )}
        </div>

        {/* Hardware Specifications Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-border pt-6">
          <div className="rounded-xl bg-muted/20 border border-border p-4 flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">Allocated CPU</p>
              <p className="text-sm font-bold text-foreground">{cpu} vCPUs (Ryzen 7950X3D)</p>
            </div>
          </div>

          <div className="rounded-xl bg-muted/20 border border-border p-4 flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <HardDrive className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">Allocated Disk</p>
              <p className="text-sm font-bold text-foreground">{storage}GB NVMe Gen4 SSD</p>
            </div>
          </div>

          <div className="rounded-xl bg-muted/20 border border-border p-4 flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">DDoS Protection</p>
              <p className="text-sm font-bold text-foreground">12 Tbps Premium Shield</p>
            </div>
          </div>
        </div>

      </div>

      {/* Pricing Summary Panel */}
      <div className="lg:col-span-4 bg-card rounded-xl border border-border p-6 md:p-8 space-y-6 sticky top-20">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-4">
          Order Summary
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Selected Game</span>
            <span className="font-bold text-foreground">{selectedGame.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">RAM Allocation</span>
            <span className="font-bold text-foreground">{ram} GB DDR5</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">CPU Slices</span>
            <span className="font-bold text-foreground">{cpu} vCPU Cores</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Storage</span>
            <span className="font-bold text-foreground">{storage} GB NVMe</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Location</span>
            <span className="font-bold text-foreground">
              {location === 'us-east' ? '🇺🇸 Ashburn' : location === 'us-west' ? '🇺🇸 Hillsboro' : location === 'eu-west' ? '🇩🇪 Frankfurt' : location === 'eu-uk' ? '🇬🇧 London' : location === 'ap-east' ? '🇸🇬 Singapore' : '🇦🇺 Sydney'}
            </span>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm font-semibold text-muted-foreground">Monthly Cost</span>
            <div className="text-right">
              <span className="text-3xl font-black text-primary">${price.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground">/mo</span>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground text-right">Excluding local VAT. Billed monthly, cancel anytime.</p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={handleDeploy}
            className="w-full rounded-lg bg-primary hover:bg-primary/90 text-background font-bold py-3 text-sm tracking-wide transition-all glow-primary flex items-center justify-center gap-2"
          >
            <Zap className="h-4 w-4 fill-current" />
            Deploy Server Instance
          </button>
          
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground space-y-2">
            <div className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>Instant provisioning (&lt; 60s)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>Full SFTP & Web Console Access</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>Automated Daily Backups</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
