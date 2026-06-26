import { create } from 'zustand';
import { GAMES, LOCATIONS } from './games';

export interface ServerInstance {
  id: string;
  name: string;
  gameId: string;
  status: 'running' | 'stopped' | 'starting' | 'stopping';
  ip: string;
  port: number;
  ram: number; // GB
  cpu: number; // vCPUs
  storage: number; // GB
  location: string; // id
  playersActive: number;
  playersMax: number;
  uptime: number; // seconds, only if running
  version: string;
  createdDate: string;
}

export interface ConsoleLog {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  message: string;
}

interface UserSession {
  email: string;
  name: string;
}

interface AetherStore {
  user: UserSession | null;
  instances: ServerInstance[];
  logs: Record<string, ConsoleLog[]>;
  login: (email: string) => void;
  logout: () => void;
  createInstance: (instance: Omit<ServerInstance, 'id' | 'status' | 'ip' | 'port' | 'playersActive' | 'playersMax' | 'uptime' | 'createdDate'>) => string;
  deleteInstance: (id: string) => void;
  startInstance: (id: string) => void;
  stopInstance: (id: string) => void;
  restartInstance: (id: string) => void;
  addLog: (instanceId: string, level: ConsoleLog['level'], message: string) => void;
  tickUptimes: () => void;
  simulateActivity: () => void;
}

const DEFAULT_INSTANCES: ServerInstance[] = [
  {
    id: 'mc-srv-01',
    name: 'Aether Survival Realm',
    gameId: 'minecraft',
    status: 'running',
    ip: '104.238.190.42',
    port: 25565,
    ram: 6,
    cpu: 2,
    storage: 30,
    location: 'us-east',
    playersActive: 7,
    playersMax: 20,
    uptime: 14820,
    version: '1.20.4',
    createdDate: '2024-02-15'
  },
  {
    id: 'pal-srv-02',
    name: 'Palworld Co-op Guild',
    gameId: 'palworld',
    status: 'stopped',
    ip: '185.60.218.35',
    port: 8211,
    ram: 16,
    cpu: 4,
    storage: 50,
    location: 'eu-west',
    playersActive: 0,
    playersMax: 32,
    uptime: 0,
    version: '0.1.5.1',
    createdDate: '2024-02-20'
  },
  {
    id: 'cs2-srv-03',
    name: 'CS2 128tick Pug Server',
    gameId: 'cs2',
    status: 'running',
    ip: '195.154.122.89',
    port: 27015,
    ram: 4,
    cpu: 2,
    storage: 35,
    location: 'eu-uk',
    playersActive: 4,
    playersMax: 10,
    uptime: 3600,
    version: 'v1.39.2',
    createdDate: '2024-02-22'
  }
];

const INITIAL_LOGS: Record<string, ConsoleLog[]> = {
  'mc-srv-01': [
    { timestamp: '12:00:00', level: 'INFO', message: 'Starting Minecraft server version 1.20.4' },
    { timestamp: '12:00:02', level: 'INFO', message: 'Loading properties' },
    { timestamp: '12:00:02', level: 'INFO', message: 'Default game type: SURVIVAL' },
    { timestamp: '12:00:03', level: 'INFO', message: 'Generating keypair' },
    { timestamp: '12:00:04', level: 'INFO', message: 'Preparing level "world"' },
    { timestamp: '12:00:10', level: 'INFO', message: 'Preparing start region for dimension minecraft:overworld' },
    { timestamp: '12:00:15', level: 'SUCCESS', message: 'Done (11.42s)! For help, type "help"' },
    { timestamp: '12:15:32', level: 'INFO', message: 'Player [Steve] joined the game from 104.23.44.12' },
    { timestamp: '12:18:45', level: 'INFO', message: 'Player [Alex] joined the game from 198.12.5.42' },
    { timestamp: '12:30:00', level: 'INFO', message: 'Saving chunks for level "world"/minecraft:overworld' },
    { timestamp: '12:30:01', level: 'SUCCESS', message: 'Auto-save completed successfully' }
  ],
  'pal-srv-02': [
    { timestamp: '08:00:00', level: 'INFO', message: 'Starting Palworld Dedicated Server...' },
    { timestamp: '08:00:01', level: 'INFO', message: 'Checking SteamCMD updates...' },
    { timestamp: '08:00:03', level: 'INFO', message: 'App "2394010" already up to date.' },
    { timestamp: '08:00:04', level: 'INFO', message: 'Setting up socket connection on port 8211' },
    { timestamp: '08:00:05', level: 'WARN', message: 'Palworld memory leak mitigation: Auto-restart scheduled in 12 hours.' },
    { timestamp: '08:00:06', level: 'SUCCESS', message: 'Palworld Dedicated Server is now listening on 0.0.0.0:8211' },
    { timestamp: '14:00:00', level: 'INFO', message: 'Received shutdown signal' },
    { timestamp: '14:00:01', level: 'INFO', message: 'Stopping active socket listeners...' },
    { timestamp: '14:00:05', level: 'SUCCESS', message: 'Server stopped cleanly' }
  ],
  'cs2-srv-03': [
    { timestamp: '10:00:00', level: 'INFO', message: 'Console initialized.' },
    { timestamp: '10:00:01', level: 'INFO', message: 'Connecting to Steam servers...' },
    { timestamp: '10:00:02', level: 'SUCCESS', message: 'Steam Game Server API authorized' },
    { timestamp: '10:00:02', level: 'INFO', message: 'Setting up tickrate: 128tick sub-tick mode enabled' },
    { timestamp: '10:00:03', level: 'INFO', message: 'Loading map de_dust2...' },
    { timestamp: '10:00:05', level: 'INFO', message: 'Map de_dust2 loaded. Match ready.' },
    { timestamp: '10:12:45', level: 'INFO', message: 'Match started: Team Terrorists vs Counter-Terrorists' }
  ]
};

const MOCK_MESSAGES: Record<string, string[]> = {
  minecraft: [
    'Player [Gamer42] joined the game',
    'Player [Gamer42] fell from a high place',
    'Player [Steve] completed advancement [Monster Hunter]',
    'Saved the game to world/db',
    'Can\'t keep up! Is the server overloaded? Running 2005ms behind',
    'Player [Alex] left the game',
    'Auto-save completed successfully'
  ],
  palworld: [
    'Guild Leader captured a wild Lamball',
    'Palworld memory leak threshold check: RAM usage at 64%',
    'Player [PalMaster] connected',
    'Automated world backup created successfully',
    'Player [PalMaster] captured Grizzbolt'
  ],
  cs2: [
    'Player [shroud] connected to server',
    'shroud killed s1mple with awp (headshot)',
    'Round ended - Terrorists win',
    'Server tickrate stabilized at 128.00 ticks/sec',
    'Player [s1mple] disconnected'
  ],
  generic: [
    'Periodic metrics log: CPU 12%, RAM 45%, Disk 22%',
    'Database sync completed successfully',
    'Heartbeat sent to Steam network',
    'Automated backup scheduled check: OK'
  ]
};

const isClient = typeof window !== 'undefined';

export const useAetherStore = create<AetherStore>((set, get) => {
  // Try to hydrate from localStorage if available
  const savedUser = isClient ? localStorage.getItem('aether_user') : null;
  const savedInstances = isClient ? localStorage.getItem('aether_instances') : null;
  const savedLogs = isClient ? localStorage.getItem('aether_logs') : null;

  return {
    user: savedUser ? JSON.parse(savedUser) : { email: 'demo@aethernode.com', name: 'Demo Host' },
    instances: savedInstances ? JSON.parse(savedInstances) : DEFAULT_INSTANCES,
    logs: savedLogs ? JSON.parse(savedLogs) : INITIAL_LOGS,

    login: (email: string) => {
      const user = { email, name: email.split('@')[0] };
      set({ user });
      if (isClient) localStorage.setItem('aether_user', JSON.stringify(user));
    },

    logout: () => {
      set({ user: null });
      if (isClient) {
        localStorage.removeItem('aether_user');
      }
    },

    createInstance: (data) => {
      const id = `srv-${Math.random().toString(36).substring(2, 9)}`;
      const game = GAMES.find(g => g.id === data.gameId);
      const randomIp = `156.124.${Math.floor(Math.random() * 254) + 1}.${Math.floor(Math.random() * 254) + 1}`;
      const port = game ? game.defaultPort : 27015;
      const version = game ? game.version : '1.0.0';

      const newInstance: ServerInstance = {
        id,
        name: data.name,
        gameId: data.gameId,
        status: 'starting',
        ip: randomIp,
        port,
        ram: data.ram,
        cpu: data.cpu,
        storage: data.storage,
        location: data.location,
        playersActive: 0,
        playersMax: game ? game.slotsPerGb * data.ram : 10,
        uptime: 0,
        version,
        createdDate: new Date().toISOString().split('T')[0]
      };

      const now = new Date().toLocaleTimeString();
      const initialLogs: ConsoleLog[] = [
        { timestamp: now, level: 'INFO', message: `Provisioning server virtual machine [ID: ${id}]` },
        { timestamp: now, level: 'INFO', message: `Allocating resources: ${data.ram}GB RAM, ${data.cpu} vCPUs, ${data.storage}GB NVMe Storage` },
        { timestamp: now, level: 'INFO', message: `Setting up networking on ${randomIp}:${port}` },
        { timestamp: now, level: 'INFO', message: `Downloading server files for ${game?.name || 'Game'} (${version})` },
        { timestamp: now, level: 'SUCCESS', message: `Server provisioned successfully. Launching server process...` }
      ];

      set(state => {
        const instances = [...state.instances, newInstance];
        const logs = { ...state.logs, [id]: initialLogs };
        if (isClient) {
          localStorage.setItem('aether_instances', JSON.stringify(instances));
          localStorage.setItem('aether_logs', JSON.stringify(logs));
        }
        return { instances, logs };
      });

      // Simulate starting to running transition
      setTimeout(() => {
        set(state => {
          const instances = state.instances.map(inst => {
            if (inst.id === id) {
              return { ...inst, status: 'running' as const };
            }
            return inst;
          });
          const currentLogs = state.logs[id] || [];
          const readyTime = new Date().toLocaleTimeString();
          const logs = {
            ...state.logs,
            [id]: [
              ...currentLogs,
              { timestamp: readyTime, level: 'SUCCESS', message: `${game?.name} dedicated server started and listening for incoming players.` }
            ]
          };
          if (isClient) {
            localStorage.setItem('aether_instances', JSON.stringify(instances));
            localStorage.setItem('aether_logs', JSON.stringify(logs));
          }
          return { instances, logs };
        });
      }, 5000);

      return id;
    },

    deleteInstance: (id) => {
      set(state => {
        const instances = state.instances.filter(inst => inst.id !== id);
        const logs = { ...state.logs };
        delete logs[id];
        if (isClient) {
          localStorage.setItem('aether_instances', JSON.stringify(instances));
          localStorage.setItem('aether_logs', JSON.stringify(logs));
        }
        return { instances, logs };
      });
    },

    startInstance: (id) => {
      set(state => {
        const instances = state.instances.map(inst => {
          if (inst.id === id) return { ...inst, status: 'starting' as const };
          return inst;
        });
        return { instances };
      });

      const now = new Date().toLocaleTimeString();
      get().addLog(id, 'INFO', 'Initializing power-on sequence...');
      get().addLog(id, 'INFO', 'Starting container runtime environment...');

      setTimeout(() => {
        set(state => {
          const instances = state.instances.map(inst => {
            if (inst.id === id) return { ...inst, status: 'running' as const, uptime: 0 };
            return inst;
          });
          if (isClient) localStorage.setItem('aether_instances', JSON.stringify(instances));
          return { instances };
        });
        const readyTime = new Date().toLocaleTimeString();
        get().addLog(id, 'SUCCESS', 'Server boot complete. Service running.');
      }, 3000);
    },

    stopInstance: (id) => {
      set(state => {
        const instances = state.instances.map(inst => {
          if (inst.id === id) return { ...inst, status: 'stopping' as const };
          return inst;
        });
        return { instances };
      });

      get().addLog(id, 'WARN', 'Received user request to stop server.');
      get().addLog(id, 'INFO', 'Saving current game state to storage...');

      setTimeout(() => {
        set(state => {
          const instances = state.instances.map(inst => {
            if (inst.id === id) return { ...inst, status: 'stopped' as const, playersActive: 0, uptime: 0 };
            return inst;
          });
          if (isClient) localStorage.setItem('aether_instances', JSON.stringify(instances));
          return { instances };
        });
        get().addLog(id, 'SUCCESS', 'Server process stopped cleanly.');
      }, 3000);
    },

    restartInstance: (id) => {
      get().stopInstance(id);
      setTimeout(() => {
        get().startInstance(id);
      }, 3500);
    },

    addLog: (instanceId, level, message) => {
      const now = new Date().toLocaleTimeString();
      set(state => {
        const currentLogs = state.logs[instanceId] || [];
        const updatedLogs = [...currentLogs, { timestamp: now, level, message }].slice(-100); // limit to 100 logs
        const logs = { ...state.logs, [instanceId]: updatedLogs };
        if (isClient) localStorage.setItem('aether_logs', JSON.stringify(logs));
        return { logs };
      });
    },

    tickUptimes: () => {
      set(state => {
        let changed = false;
        const instances = state.instances.map(inst => {
          if (inst.status === 'running') {
            changed = true;
            return { ...inst, uptime: inst.uptime + 1 };
          }
          return inst;
        });
        if (changed && isClient) {
          localStorage.setItem('aether_instances', JSON.stringify(instances));
        }
        return changed ? { instances } : {};
      });
    },

    simulateActivity: () => {
      const state = get();
      const runningInstances = state.instances.filter(inst => inst.status === 'running');
      if (runningInstances.length === 0) return;

      // Pick a random running instance to add a log to and maybe adjust player count
      const randomInst = runningInstances[Math.floor(Math.random() * runningInstances.length)];
      const gameType = randomInst.gameId;
      const messages = MOCK_MESSAGES[gameType] || MOCK_MESSAGES.generic;
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];

      const isWarn = randomMsg.toLowerCase().includes('leak') || randomMsg.toLowerCase().includes('behind') || randomMsg.toLowerCase().includes('overloaded');
      const isSuccess = randomMsg.toLowerCase().includes('completed') || randomMsg.toLowerCase().includes('success') || randomMsg.toLowerCase().includes('stabilized');
      const level = isWarn ? 'WARN' : isSuccess ? 'SUCCESS' : 'INFO';

      state.addLog(randomInst.id, level, randomMsg);

      // Randomly tweak players count
      if (Math.random() > 0.6) {
        set(state => {
          const instances = state.instances.map(inst => {
            if (inst.id === randomInst.id) {
              let delta = Math.random() > 0.5 ? 1 : -1;
              let newPlayers = inst.playersActive + delta;
              if (newPlayers < 0) newPlayers = 0;
              if (newPlayers > inst.playersMax) newPlayers = inst.playersMax;
              return { ...inst, playersActive: newPlayers };
            }
            return inst;
          });
          return { instances };
        });
      }
    }
  };
});
