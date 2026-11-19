import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Activity, 
  Database, 
  Flame, 
  Globe, 
  Smartphone, 
  Bot, 
  ExternalLink, 
  ArrowUpRight,
  Radio,
  Lock
} from 'lucide-react';
import { Card3D } from './Card3D';
import { soundFX } from '../utils/soundEffects';

interface BentoGridProps {
  onOpenTerminal: () => void;
  onOpenAndroidModal: () => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  onOpenTerminal,
  onOpenAndroidModal,
}) => {
  const [livePackets, setLivePackets] = useState<Array<{ id: number; proto: string; ip: string; alert: string; time: string }>>([
    { id: 1, proto: 'TCP/443', ip: '40.80.148.42', alert: 'Acutenix WVS probe detected', time: '14:42:10' },
    { id: 2, proto: 'UDP/53', ip: '192.168.250.70', alert: 'DMARC DNS TXT validated', time: '14:42:12' },
    { id: 3, proto: 'TCP/80', ip: '10.0.0.45', alert: 'Blind SQLi payload intercepted', time: '14:42:15' },
    { id: 4, proto: 'TCP/22', ip: '40.80.148.42', alert: 'SSH Brute Force threshold tripped', time: '14:42:18' },
  ]);

  // Periodic packet stream simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const protos = ['TCP/443', 'TCP/80', 'UDP/53', 'TCP/3306', 'TCP/445'];
      const ips = ['40.80.148.42', '192.168.1.155', '192.168.250.70', '10.0.2.15'];
      const alerts = [
        'Suricata ET SCAN Nmap probe',
        'HTTP GET /wp-config.php leak blocked',
        'SSRF proxy connection sanitized',
        'Wireshark DPI frame correlated',
        'SHA-256 binary hash verified',
      ];

      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      setLivePackets((prev) => [
        {
          id: Date.now(),
          proto: protos[Math.floor(Math.random() * protos.length)],
          ip: ips[Math.floor(Math.random() * ips.length)],
          alert: alerts[Math.floor(Math.random() * alerts.length)],
          time: timeStr,
        },
        ...prev.slice(0, 3),
      ]);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="bento" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[var(--hud-border)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--hud-primary)] uppercase tracking-widest">
            <span className="w-2 h-2 bg-[var(--hud-primary)]" />
            <span>MODULE // 02-B: 21ST.DEV HIGH-DENSITY BENTO RADAR</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-hud font-extrabold text-white mt-1">
            INTELLIGENCE BENTO MATRIX
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            Asymmetric HUD tiles fusing real-time packet feeds, Splunk dataset telemetry, and multi-platform app previews.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono text-emerald-400">
          <Activity className="w-4 h-4 animate-pulse" />
          <span>REAL-TIME STREAM ACTIVE</span>
        </div>
      </div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Tile 1: Live SOC Telemetry & Packet Radar (8 cols) */}
        <div className="md:col-span-8">
          <Card3D className="h-full">
            <div className="h-full hud-corner-box p-6 border border-[var(--hud-border)] bg-black/85 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--hud-primary)] font-bold">
                    <Radio className="w-4 h-4 animate-pulse" />
                    <span>SOC INCIDENT DETECTION & PACKET RADAR</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">SURICATA IDS + WIRESHARK DPI</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {[
                    { label: 'PACKETS ANALYZED', val: '1.42M', sub: '+4.2k/s' },
                    { label: 'THREAT ALERTS', val: '24', sub: 'RESOLVED' },
                    { label: 'MITRE TACTICS', val: '08', sub: 'MAPPED' },
                    { label: 'FIREWALL PASS', val: '99.8%', sub: 'ENFORCED' },
                  ].map((s, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-950 border border-slate-800">
                      <div className="text-[9px] font-mono text-slate-400">{s.label}</div>
                      <div className="text-base sm:text-lg font-hud font-bold text-white">{s.val}</div>
                      <div className="text-[9px] font-mono text-emerald-400">{s.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Packet stream rows */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    // LIVE ANOMALOUS EVENT FEED:
                  </div>
                  {livePackets.map((pkt) => (
                    <div
                      key={pkt.id}
                      className="flex items-center justify-between p-2 bg-slate-900/50 border border-slate-800/80 text-xs font-mono"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-[10px] text-slate-500">{pkt.time}</span>
                        <span className="px-1.5 py-0.2 bg-slate-800 text-cyan-300 text-[10px] font-bold">
                          {pkt.proto}
                        </span>
                        <span className="text-slate-400 text-[11px] truncate">{pkt.ip}</span>
                        <span className="text-white text-[11px] truncate">» {pkt.alert}</span>
                      </div>
                      <span className="text-[9px] font-mono text-emerald-400 border border-emerald-800/50 px-1">
                        FLAGGED
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Target Environment: Boss of the SOC (BOTS v1)</span>
                <a
                  href="#siem-lab"
                  onClick={() => soundFX.playClick()}
                  className="flex items-center gap-1 text-[var(--hud-primary)] hover:underline"
                >
                  <span>Launch Full SPL Hunter</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Tile 2: Splunk 360k+ BOTS Engine (4 cols) */}
        <div className="md:col-span-4">
          <Card3D className="h-full">
            <div className="h-full hud-corner-box p-6 border border-[var(--hud-border)] bg-black/85 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                    <Database className="w-4 h-4" />
                    <span>SPLUNK BOTS V1</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">INDEXED</span>
                </div>

                <div className="text-3xl font-hud font-extrabold text-white mb-1">
                  360,000+
                </div>
                <div className="text-xs font-mono text-[var(--hud-primary)] font-semibold mb-3">
                  Forensic Web & Endpoint Events
                </div>

                <p className="text-xs font-mono text-slate-300 leading-relaxed mb-4">
                  Ingested into local Splunk Enterprise lab. Correlated HTTP web logs, DNS queries, and Suricata alerts using custom SPL hunting logic.
                </p>

                <div className="p-3 bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
                  <div className="text-[9px] text-slate-500 uppercase">CORE SPL TECHNIQUES:</div>
                  <div className="text-cyan-300 font-semibold mt-1">
                    transaction, stats count by, eval is_sqli, rex field=uri, timechart span=1h
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href="https://github.com/Creator-Naren"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFX.playClick()}
                  className="flex items-center justify-between text-xs font-mono text-slate-300 hover:text-white"
                >
                  <span>Splunk SIEM Repository</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                </a>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Tile 3: OffSec Stapler Lab (4 cols) */}
        <div className="md:col-span-4">
          <Card3D className="h-full">
            <div className="h-full hud-corner-box p-6 border border-slate-800 bg-black/85 flex flex-col justify-between hover:border-red-500/50 transition-colors">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-bold">
                    <Flame className="w-4 h-4" />
                    <span>OFFSEC STAPLER</span>
                  </div>
                  <span className="text-[10px] font-mono text-red-400 bg-red-950/60 px-1.5 py-0.5 border border-red-800">
                    ROOT PWNED
                  </span>
                </div>

                <h3 className="text-base font-hud font-bold text-white mb-2">
                  LFI to MySQL RCE Kill Chain
                </h3>

                <p className="text-xs font-mono text-slate-300 leading-relaxed mb-3">
                  Discovered WordPress plugin LFI to leak `wp-config.php`, authenticated to MySQL on port 3306, dropped PHP webshell via `INTO OUTFILE`, and escalated to root via sudo abuse.
                </p>

                <div className="p-2.5 bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-400">
                  # id<br />
                  uid=0(root) gid=0(root)
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href="#siem-lab"
                  onClick={() => soundFX.playClick()}
                  className="flex items-center justify-between text-xs font-mono text-slate-400 hover:text-white"
                >
                  <span>Inspect 4-Phase Chain</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Tile 4: Aegis 3D Safe Browser Live (4 cols) */}
        <div className="md:col-span-4">
          <Card3D className="h-full">
            <div className="h-full hud-corner-box p-6 border border-slate-800 bg-black/85 flex flex-col justify-between hover:border-[var(--hud-primary)] transition-colors">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--hud-primary)] font-bold">
                    <Globe className="w-4 h-4" />
                    <span>AEGIS 3D SAFE BROWSER</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>

                <h3 className="text-base font-hud font-bold text-white mb-2">
                  SSRF Hardened + Gemini AI Copilot
                </h3>

                <p className="text-xs font-mono text-slate-300 leading-relaxed mb-3">
                  Production 3D security browser with real-time DNS inspection, HTTP security header auditing (HSTS, CSP), and a hybrid FastAPI + Gemini 2.5 Flash copilot.
                </p>

                <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-300">
                  <Lock className="w-3.5 h-3.5" />
                  <span>LIVE AT AEGISSCANS.DEV</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href="https://aegisscans.dev"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFX.playClick()}
                  className="py-2 px-3 bg-[var(--hud-primary)] text-black font-hud text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-white transition-all shadow-[0_0_15px_var(--hud-glow)]"
                >
                  <span>LAUNCH AEGIS BROWSER</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Tile 5: Android Mobile App Simulation & Antigravity Agent (4 cols) */}
        <div className="md:col-span-4">
          <Card3D className="h-full">
            <div className="h-full hud-corner-box p-6 border border-emerald-500/40 bg-black/85 flex flex-col justify-between shadow-[0_0_20px_rgba(0,255,136,0.1)]">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                    <Smartphone className="w-4 h-4" />
                    <span>ANDROID CLI & MOBBIN APP</span>
                  </div>
                  <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-300 text-[9px] font-mono border border-emerald-700">
                    JETPACK COMPOSE
                  </span>
                </div>

                <h3 className="text-base font-hud font-bold text-white mb-2">
                  Mobile App & Autonomous Agent
                </h3>

                <p className="text-xs font-mono text-slate-300 leading-relaxed mb-4">
                  Experience Narendra's portfolio inside an authentic Google Pixel 8 Pro HUD device frame, curated with Mobbin tactile patterns and Google Antigravity Agent workflows.
                </p>

                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <Bot className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Google Antigravity SDK: Multi-Agent Ready</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => {
                    soundFX.playClick();
                    onOpenAndroidModal();
                  }}
                  onMouseEnter={() => soundFX.playHover()}
                  className="flex-1 py-2.5 px-2 bg-emerald-500 text-black font-hud text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-white transition-all shadow-[0_0_15px_rgba(0,255,136,0.3)]"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>ANDROID PREVIEW</span>
                </button>

                <button
                  onClick={() => {
                    soundFX.playClick();
                    onOpenTerminal();
                  }}
                  onMouseEnter={() => soundFX.playHover()}
                  className="py-2.5 px-3 bg-slate-900 border border-slate-700 text-slate-200 font-mono text-xs hover:border-[var(--hud-primary)] hover:text-white transition-all flex items-center gap-1.5"
                >
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AI CORE</span>
                </button>
              </div>
            </div>
          </Card3D>
        </div>

      </div>
    </section>
  );
};
