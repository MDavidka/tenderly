'use client';

import React, { Suspense } from 'react';
import ServerSpecsSlider from '@/components/ServerSpecsSlider';
import { HelpCircle, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';

export default function PricingPage() {
  const faqs = [
    {
      q: 'Can I upgrade or downgrade my RAM later?',
      a: 'Yes! You can scale your server RAM, CPU, and storage up or down at any time with a single click in your dashboard. Your server files remain fully intact, and billing is automatically prorated.'
    },
    {
      q: 'Are backups automated and how long are they kept?',
      a: 'Absolutely. We run automated daily incremental backups of your entire server directory and database. Backups are stored on an off-site secure network and are kept for 14 days.'
    },
    {
      q: 'Do you offer a money-back guarantee?',
      a: 'Yes, we offer a risk-free 7-day money-back guarantee. If you are not satisfied with our server performance or network latency, simply open a billing ticket to receive a full refund.'
    },
    {
      q: 'Where are your game server locations?',
      a: 'We operate state-of-the-art enterprise nodes in Ashburn (USA), Hillsboro (USA), Frankfurt (Germany), London (UK), Singapore, and Sydney (Australia).'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-[clamp(1.75rem,4vw+0.5rem,3.25rem)] font-extrabold tracking-tight text-foreground">
          Deploy Your Game Server Instance
        </h1>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          Select your game and drag the slider to customize RAM, CPU, and SSD storage. Instant setup. Custom premium control panel. Cancel anytime.
        </p>
      </div>

      {/* Main Configuration Slider Wrapped in Suspense because of useSearchParams */}
      <Suspense fallback={
        <div className="h-[400px] w-full rounded-xl border border-border bg-card animate-pulse flex items-center justify-center text-xs text-muted-foreground">
          Loading pricing engine...
        </div>
      }>
        <ServerSpecsSlider />
      </Suspense>

      {/* SLA & Technical Specs Banner */}
      <div className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          Included with Every Server Instance
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-foreground">Dedicated IP & Custom Port</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every server is allocated a dedicated IPv4 address with full access to standard game ports.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-foreground">Full SFTP & Database Access</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Complete file access via SFTP. Deploy custom mods, upload worlds, and manage databases.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-foreground">1-Click Modpack Installer</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Install popular modpacks (Forge, Fabric, Valheim+, Purpur) instantly from our mod library.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-foreground">Sub-User Management</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Grant specific permissions to your co-admins or developers to help manage the server files.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing FAQs */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-foreground">Frequently Asked Questions</h2>
          <p className="text-sm text-muted-foreground">Everything you need to know about AetherNode server hosting.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-xl border border-border bg-muted/20 p-5 space-y-2">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                {faq.q}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed pl-5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
