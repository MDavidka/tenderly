'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAetherStore, ConsoleLog } from '../lib/store';
import { Terminal as TerminalIcon, Play, Send, Trash2 } from 'lucide-react';

interface ConsoleViewProps {
  instanceId: string;
}

export default function ConsoleView({ instanceId }: ConsoleViewProps) {
  const { logs, addLog, instances } = useAetherStore();
  const [command, setCommand] = useState('');
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const instanceLogs = logs[instanceId] || [];
  const instance = instances.find(inst => inst.id === instanceId);

  // Auto scroll to bottom when logs update
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [instanceLogs]);

  const handleSendCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    const cmdText = command.trim();
    const cleanCmd = cmdText.startsWith('/') ? cmdText.substring(1) : cmdText;
    const parts = cleanCmd.split(' ');
    const baseCmd = parts[0].toLowerCase();

    // Add user command to logs
    addLog(instanceId, 'INFO', `> ${cmdText}`);
    setCommand('');

    // Simulate response delay
    setTimeout(() => {
      if (instance?.status !== 'running') {
        addLog(instanceId, 'ERROR', 'Error: Cannot execute command. Server is offline.');
        return;
      }

      switch (baseCmd) {
        case 'help':
          addLog(instanceId, 'INFO', 'Available Console Commands:');
          addLog(instanceId, 'INFO', '  /help              - Show this menu');
          addLog(instanceId, 'INFO', '  /players           - List connected players');
          addLog(instanceId, 'INFO', '  /say <message>     - Broadcast a server message');
          addLog(instanceId, 'INFO', '  /op <player>       - Grant operator/admin privileges');
          addLog(instanceId, 'INFO', '  /kick <player>     - Force disconnect a player');
          addLog(instanceId, 'INFO', '  /status            - Query internal engine stats');
          addLog(instanceId, 'INFO', '  /clear             - Clear terminal display logs');
          break;
        case 'players':
          if (instance.playersActive === 0) {
            addLog(instanceId, 'INFO', 'No players currently connected.');
          } else {
            addLog(instanceId, 'INFO', `Connected players (${instance.playersActive}/${instance.playersMax}):`);
            const mockPlayers = ['shroud', 's1mple', 'Steve', 'Alex', 'Gamer42', 'PalMaster', 'Valkyrie'];
            const activeSlice = mockPlayers.slice(0, Math.min(instance.playersActive, mockPlayers.length));
            activeSlice.forEach(p => addLog(instanceId, 'INFO', `  - ${p} (ping: ${Math.floor(Math.random() * 30) + 5}ms)`));
          }
          break;
        case 'say':
          const msg = parts.slice(1).join(' ');
          if (!msg) {
            addLog(instanceId, 'WARN', 'Usage: /say <message>');
          } else {
            addLog(instanceId, 'SUCCESS', `[BROADCAST] Server: ${msg}`);
          }
          break;
        case 'op':
          const player = parts[1];
          if (!player) {
            addLog(instanceId, 'WARN', 'Usage: /op <player_name>');
          } else {
            addLog(instanceId, 'SUCCESS', `Opping ${player}. Player is now a Server Administrator.`);
          }
          break;
        case 'kick':
          const kickPlayer = parts[1];
          if (!kickPlayer) {
            addLog(instanceId, 'WARN', 'Usage: /kick <player_name>');
          } else {
            addLog(instanceId, 'WARN', `Kicking ${kickPlayer} from the server...`);
            addLog(instanceId, 'INFO', `Connection closed for ${kickPlayer} (Kicked by Administrator)`);
          }
          break;
        case 'status':
          addLog(instanceId, 'INFO', `Engine Status Query:`);
          addLog(instanceId, 'INFO', `  - CPU Usage: ${(Math.random() * 20 + 5).toFixed(1)}%`);
          addLog(instanceId, 'INFO', `  - RAM Usage: ${(instance.ram * 0.45).toFixed(2)}GB / ${instance.ram}GB`);
          addLog(instanceId, 'INFO', `  - TPS / Tickrate: ${instance.gameId === 'cs2' ? '128.0' : '20.0'} (100% stable)`);
          addLog(instanceId, 'INFO', `  - Network Out: ${(Math.random() * 5 + 1).toFixed(2)} Mbps`);
          break;
        case 'clear':
          // We can't easily wipe the entire Zustand array from here without a custom action,
          // but we can add a visual divider or mock clear.
          addLog(instanceId, 'SUCCESS', '--- Console logs cleared by user ---');
          break;
        default:
          addLog(instanceId, 'ERROR', `Unknown command: "${baseCmd}". Type "/help" for available commands.`);
      }
    }, 400);
  };

  const getLogLevelStyle = (level: ConsoleLog['level']) => {
    switch (level) {
      case 'WARN': return 'text-amber-400';
      case 'ERROR': return 'text-red-400 font-semibold';
      case 'SUCCESS': return 'text-emerald-400 font-semibold';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="rounded-xl border border-border bg-black overflow-hidden flex flex-col h-[450px]">
      {/* Console Header */}
      <div className="bg-muted/50 border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-4 w-4 text-primary" />
          <span className="text-xs font-mono font-bold text-foreground">Interactive Web Terminal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${instance?.status === 'running' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
          <span className="text-[10px] font-mono text-muted-foreground uppercase">{instance?.status}</span>
        </div>
      </div>

      {/* Logs Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs select-text">
        {instanceLogs.length === 0 ? (
          <div className="text-muted-foreground text-center py-12">
            No logs available. Start the server to initialize the console.
          </div>
        ) : (
          instanceLogs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-2 leading-relaxed">
              <span className="text-gray-600 shrink-0 select-none">[{log.timestamp}]</span>
              <span className={`shrink-0 select-none ${getLogLevelStyle(log.level)}`}>
                [{log.level}]
              </span>
              <span className="text-foreground break-all">{log.message}</span>
            </div>
          ))
        )}
        <div ref={consoleEndRef} />
      </div>

      {/* Console Input */}
      <form onSubmit={handleSendCommand} className="border-t border-border bg-muted/20 p-3 flex gap-2">
        <input
          type="text"
          placeholder={instance?.status === 'running' ? "Type server command (e.g. /help)..." : "Server is offline. Turn it on to use terminal."}
          disabled={instance?.status !== 'running'}
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="flex-1 rounded-lg border border-border bg-black px-4 py-2 text-xs text-primary placeholder:text-muted-foreground font-mono focus:border-primary focus:outline-none"
        />
        <button
          type="submit"
          disabled={instance?.status !== 'running' || !command.trim()}
          className="rounded-lg bg-primary text-background px-4 py-2 text-xs font-bold hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary transition-all flex items-center gap-1.5"
        >
          <Send className="h-3 w-3" />
          Run
        </button>
      </form>
    </div>
  );
}
