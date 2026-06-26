export interface Game {
  id: string;
  name: string;
  category: 'survival' | 'sandbox' | 'fps' | 'coop';
  description: string;
  minRam: number; // GB
  minCpu: number; // cores
  minStorage: number; // GB
  defaultPort: number;
  pricePerGb: number; // USD per GB RAM
  basePrice: number; // Base monthly cost
  popular?: boolean;
  slotsPerGb: number;
  version: string;
}

export const GAMES: Game[] = [
  {
    id: 'minecraft',
    name: 'Minecraft',
    category: 'sandbox',
    description: 'Deploy Java or Bedrock servers instantly. Supports Paper, Purpur, Forge, Fabric, and custom modpacks with 1-click installer.',
    minRam: 4,
    minCpu: 2,
    minStorage: 20,
    defaultPort: 25565,
    pricePerGb: 2.50,
    basePrice: 9.99,
    popular: true,
    slotsPerGb: 10,
    version: '1.20.4'
  },
  {
    id: 'palworld',
    name: 'Palworld',
    category: 'survival',
    description: 'Host your Palpagos Islands adventure. High-performance servers optimized to prevent memory leaks and handle 32+ player co-op.',
    minRam: 16,
    minCpu: 4,
    minStorage: 40,
    defaultPort: 8211,
    pricePerGb: 1.80,
    basePrice: 24.99,
    popular: true,
    slotsPerGb: 2,
    version: '0.1.5.1'
  },
  {
    id: 'rust',
    name: 'Rust',
    category: 'survival',
    description: 'High-CPU tickrate servers for brutal survival. Full support for uMod/Oxide plugins, custom maps, and wipe schedules.',
    minRam: 8,
    minCpu: 4,
    minStorage: 50,
    defaultPort: 28015,
    pricePerGb: 2.00,
    basePrice: 15.99,
    popular: false,
    slotsPerGb: 12,
    version: 'Update 254'
  },
  {
    id: 'cs2',
    name: 'Counter-Strike 2',
    category: 'fps',
    description: 'Ultra-low latency sub-tick servers. Optimized for competitive play, practice configs, and community workshops.',
    minRam: 4,
    minCpu: 2,
    minStorage: 35,
    defaultPort: 27015,
    pricePerGb: 2.20,
    basePrice: 12.50,
    popular: false,
    slotsPerGb: 8,
    version: 'v1.39.2'
  },
  {
    id: 'valheim',
    name: 'Valheim',
    category: 'coop',
    description: 'Conquer the tenth Norse realm with friends. Persistent worlds, automated cloud backups, and Valheim Plus mod support.',
    minRam: 4,
    minCpu: 2,
    minStorage: 10,
    defaultPort: 2456,
    pricePerGb: 2.00,
    basePrice: 8.99,
    popular: false,
    slotsPerGb: 5,
    version: '0.217.46'
  },
  {
    id: 'ark',
    name: 'ARK: Survival Ascended',
    category: 'survival',
    description: 'Unreal Engine 5 dinosaur survival. High-performance NVMe storage required and provided. Cross-play enabled across all platforms.',
    minRam: 16,
    minCpu: 6,
    minStorage: 120,
    defaultPort: 7777,
    pricePerGb: 1.70,
    basePrice: 29.99,
    popular: true,
    slotsPerGb: 3,
    version: 'v33.15'
  },
  {
    id: 'enshrouded',
    name: 'Enshrouded',
    category: 'coop',
    description: 'Reclaim the kingdom from the Shroud. Seamless 16-player voxel-based co-op hosting with optimized RAM allocation.',
    minRam: 8,
    minCpu: 4,
    minStorage: 30,
    defaultPort: 15636,
    pricePerGb: 2.10,
    basePrice: 18.50,
    popular: false,
    slotsPerGb: 4,
    version: 'v0.1.4'
  },
  {
    id: 'gmod',
    name: 'Garry\'s Mod',
    category: 'sandbox',
    description: 'Infinite sandbox gaming. Instant Workshop collection mounting, FastDL setup, and customizable server startup arguments.',
    minRam: 2,
    minCpu: 2,
    minStorage: 15,
    defaultPort: 27015,
    pricePerGb: 2.50,
    basePrice: 5.99,
    popular: false,
    slotsPerGb: 16,
    version: 'v2024.03'
  }
];

export const LOCATIONS = [
  { id: 'us-east', name: 'Ashburn, USA', flag: '🇺🇸', latency: '12ms' },
  { id: 'us-west', name: 'Hillsboro, USA', flag: '🇺🇸', latency: '28ms' },
  { id: 'eu-west', name: 'Frankfurt, Germany', flag: '🇩🇪', latency: '15ms' },
  { id: 'eu-uk', name: 'London, United Kingdom', flag: '🇬🇧', latency: '19ms' },
  { id: 'ap-east', name: 'Singapore', flag: '🇸🇬', latency: '35ms' },
  { id: 'ap-south', name: 'Sydney, Australia', flag: '🇦🇺', latency: '42ms' },
];
