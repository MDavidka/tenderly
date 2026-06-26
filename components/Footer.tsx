import React from 'react';
import Link from 'next/link';
import { Cpu, Shield, Zap, Terminal, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-background glow-primary">
                <Cpu className="h-4 w-4 stroke-[2.5]" />
              </div>
              <span className="text-lg font-extrabold tracking-wider bg-gradient-to-r from-white via-foreground to-primary bg-clip-text text-transparent">
                AETHER<span className="text-primary">NODE</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Next-generation gaming infrastructure. Low-latency, high-availability, and fully automated server virtualization.
            </p>
            <div className="flex gap-4 pt-2">
              {/* Mock Social Icons */}
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs font-semibold">Discord</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs font-semibold">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs font-semibold">GitHub</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/games" className="text-sm text-muted-foreground hover:text-primary transition-colors">Games Library</Link></li>
              <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing Plans</Link></li>
              <li><Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">Client Portal</Link></li>
            </ul>
          </div>

          {/* Infrastructure */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Infrastructure</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-3.5 w-3.5 text-primary" /> Ryzen 9 7950X3D CPUs
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-3.5 w-3.5 text-primary" /> DDoS Mitigation (12Tbps)
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Terminal className="h-3.5 w-3.5 text-primary" /> NVMe Gen4 SSD Storage
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Cpu className="h-3.5 w-3.5 text-primary" /> DDR5 ECC 5600MHz RAM
              </li>
            </ul>
          </div>

          {/* Trust / Guarantee */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">SLA SLA Guaranteed</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We guarantee a 99.99% network and node uptime. If we fail to meet our SLA, we issue full refunds. No questions asked.
            </p>
            <div className="rounded-lg border border-border bg-card p-3 flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-foreground">All nodes operational (100%)</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} AetherNode Technologies. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Engineered with <Heart className="h-3 w-3 text-primary fill-primary" /> by Syra for Next-Gen Hosters.
          </p>
        </div>
      </div>
    </footer>
  );
}
