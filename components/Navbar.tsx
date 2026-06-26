'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAetherStore } from '@/lib/store';
import { Menu, X, Server, LogOut, LayoutDashboard, Shield, HelpCircle, Cpu } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAetherStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Games', href: '/games' },
    { name: 'Pricing', href: '/pricing' },
  ];

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-background glow-primary transition-transform group-hover:scale-105">
                <Cpu className="h-5 w-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-white via-foreground to-primary bg-clip-text text-transparent">
                AETHER<span className="text-primary">NODE</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isLinkActive(link.href) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5 ${
                  pathname.startsWith('/dashboard') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            )}
          </div>

          {/* Desktop CTA / User Profile */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Welcome back,</p>
                  <p className="text-sm font-medium text-foreground max-w-[120px] truncate">{user.name}</p>
                </div>
                <Link
                  href="/dashboard"
                  className="rounded-lg bg-muted px-4 py-2 text-xs font-semibold text-foreground border border-border hover:bg-muted/80 hover:text-primary transition-all flex items-center gap-1.5"
                >
                  <Server className="h-3.5 w-3.5" />
                  Manage
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-red-950/20 text-red-400 hover:bg-red-950/40 border border-red-900/30 px-3 py-2 text-xs font-semibold transition-all flex items-center gap-1.5"
                  aria-label="Sign Out"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/pricing"
                  className="rounded-lg bg-primary text-background font-semibold hover:bg-primary/90 hover:scale-[1.02] transition-all px-4 py-2 text-xs glow-primary"
                >
                  Deploy Server
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none min-w-[44px] min-h-[44px]"
              aria-expanded={isOpen}
              aria-label="Toggle main menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-border bg-background/95 backdrop-blur-lg">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg px-3 py-2 text-base font-medium ${
                  isLinkActive(link.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium ${
                  pathname.startsWith('/dashboard')
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>
            )}
            <div className="border-t border-border my-4 pt-4">
              {user ? (
                <div className="space-y-3">
                  <div className="px-3">
                    <p className="text-xs text-muted-foreground">Logged in as</p>
                    <p className="text-sm font-semibold text-foreground truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-center text-sm font-semibold text-background glow-primary"
                  >
                    <Server className="h-4 w-4" />
                    Go to Console
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-950/20 text-red-400 border border-red-900/30 py-2.5 text-center text-sm font-semibold hover:bg-red-950/40"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 px-2">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center rounded-lg border border-border py-2 text-center text-sm font-medium text-foreground hover:bg-muted"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/pricing"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center rounded-lg bg-primary py-2 text-center text-sm font-semibold text-background glow-primary"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
