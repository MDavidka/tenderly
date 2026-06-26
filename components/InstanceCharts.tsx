'use client';

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useAetherStore } from '../lib/store';
import { Cpu, HardDrive, Activity } from 'lucide-react';

interface InstanceChartsProps {
  instanceId: string;
}

interface ChartDataPoint {
  time: string;
  cpu: number;
  ram: number;
  network: number;
}

export default function InstanceCharts({ instanceId }: InstanceChartsProps) {
  const { instances } = useAetherStore();
  const instance = instances.find(inst => inst.id === instanceId);
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<ChartDataPoint[]>([]);

  // Guard against SSR hydration issues
  useEffect(() => {
    setMounted(true);
    
    // Generate initial history
    const initialData: ChartDataPoint[] = [];
    const now = new Date();
    for (let i = 9; i >= 0; i--) {
      const timeStr = new Date(now.getTime() - i * 4000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      initialData.push({
        time: timeStr,
        cpu: instance?.status === 'running' ? Math.floor(Math.random() * 25) + 10 : 0,
        ram: instance?.status === 'running' ? parseFloat((instance.ram * 0.35 + Math.random() * 0.4).toFixed(2)) : 0,
        network: instance?.status === 'running' ? Math.floor(Math.random() * 8) + 2 : 0
      });
    }
    setData(initialData);
  }, [instanceId, instance?.status]);

  // Real-time update loop
  useEffect(() => {
    if (!mounted || instance?.status !== 'running') return;

    const interval = setInterval(() => {
      setData(prev => {
        const nextTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const baseCpu = instance.gameId === 'palworld' || instance.gameId === 'ark' ? 35 : 15;
        const newCpu = Math.floor(Math.random() * 20) + baseCpu;
        const newRam = parseFloat((instance.ram * 0.4 + Math.random() * 0.3).toFixed(2));
        const newNetwork = Math.floor(Math.random() * 12) + 3;

        const updated = [...prev.slice(1), {
          time: nextTime,
          cpu: newCpu,
          ram: newRam,
          network: newNetwork
        }];
        return updated;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [mounted, instance?.status, instance?.ram]);

  if (!mounted) {
    return (
      <div className="h-[250px] w-full rounded-xl border border-border bg-card animate-pulse flex items-center justify-center text-xs text-muted-foreground">
        Loading analytics engine...
      </div>
    );
  }

  const latestCpu = data[data.length - 1]?.cpu || 0;
  const latestRam = data[data.length - 1]?.ram || 0;
  const latestNetwork = data[data.length - 1]?.network || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* CPU Chart */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-primary" />
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">CPU Core Load</h3>
          </div>
          <span className="text-sm font-bold text-foreground font-mono">{latestCpu}%</span>
        </div>
        <div className="h-[150px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#00f2fe" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={[0, 100]} stroke="#4b5563" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f1115', borderColor: '#1f2937', fontSize: '10px' }} />
              <Area type="monotone" dataKey="cpu" stroke="#00f2fe" strokeWidth={2} fillOpacity={1} fill="url(#colorCpu)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RAM Chart */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-secondary" />
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">RAM Allocation</h3>
          </div>
          <span className="text-sm font-bold text-foreground font-mono">
            {latestRam.toFixed(2)} / {instance?.ram || 0} GB
          </span>
        </div>
        <div className="h-[150px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4facfe" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#4facfe" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={[0, instance?.ram || 16]} stroke="#4b5563" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f1115', borderColor: '#1f2937', fontSize: '10px' }} />
              <Area type="monotone" dataKey="ram" stroke="#4facfe" strokeWidth={2} fillOpacity={1} fill="url(#colorRam)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Network Chart */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-400" />
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Network Port IO</h3>
          </div>
          <span className="text-sm font-bold text-foreground font-mono">{latestNetwork} Mbps</span>
        </div>
        <div className="h-[150px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={[0, 50]} stroke="#4b5563" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f1115', borderColor: '#1f2937', fontSize: '10px' }} />
              <Area type="monotone" dataKey="network" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorNet)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
