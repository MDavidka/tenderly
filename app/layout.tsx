'use client';

import React, { useEffect } from 'react';
import { useAetherStore } from '../lib/store';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'sonner';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { tickUptimes, simulateActivity } = useAetherStore();

  // Initialize server simulation tick (uptime counter and console noise)
  useEffect(() => {
    const uptimeInterval = setInterval(() => {
      tickUptimes();
    }, 1000);

    const activityInterval = setInterval(() => {
      simulateActivity();
    }, 5000);

    return () => {
      clearInterval(uptimeInterval);
      clearInterval(activityInterval);
    };
  }, [tickUptimes, simulateActivity]);

  return (
    <html lang="en" className="bg-background text-foreground dark">
      <head>
        <title>AetherNode — Premium High-Performance Game Server Hosting</title>
        <meta name="description" content="Deploy and manage high-performance game servers instantly. Powered by Ryzen 9 7950X3D and NVMe SSDs." />
      </head>
      <body className="min-h-screen flex flex-col justify-between selection:bg-primary/30 selection:text-primary">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster theme="dark" position="bottom-right" closeButton richColors />
      </body>
    </html>
  );
}
