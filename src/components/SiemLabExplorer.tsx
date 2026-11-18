import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  Database, 
  CheckCircle2, 
  ArrowRight,
  Flame
} from 'lucide-react';
import { PORTFOLIO_DATA, SiemQuerySample } from '../data/portfolioData';
import { soundFX } from '../utils/soundEffects';

export const SiemLabExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'splunk' | 'offsec'>('splunk');
  const [selectedSample, setSelectedSample] = useState<SiemQuerySample>(PORTFOLIO_DATA.siemSamples[0]);
  const [currentQuery, setCurrentQuery] = useState<string>(PORTFOLIO_DATA.siemSamples[0].splQuery);
  const [executing, setExecuting] = useState(false);
  const [queryResults, setQueryResults] = useState<{
    count: number;
    timeMs: number;
    log: string;
    events: Array<{ timestamp: string; ip: string; status: number; event: string }>;
  } | null>({
    count: 384,
    timeMs: 42,
    log: PORTFOLIO_DATA.siemSamples[0].sampleLog,
    events: [
      { timestamp: "2026-08-14 11:24:19.412", ip: "40.80.148.42", status: 404, event: "GET /login.php?id=acunetix_wvs_test (User-Agent: Acunetix WVS/10.0)" },
      { timestamp: "2026-08-14 11:24:20.104", ip: "40.80.148.42", status: 404, event: "GET /admin/db.php?test=scan_dir" },
      { timestamp: "2026-08-14 11:24:21.890", ip: "40.80.148.42", status: 200, event: "GET /wp-content/plugins/ (Directory indexing probe)" },
      { timestamp: "2026-08-14 11:24:23.011", ip: "40.80.148.42", status: 500, event: "POST /xmlrpc.php (Brute force amplification probe)" }
    ]
  });

  const handleSelectQuery = (sample: SiemQuerySample) => {
    soundFX.playClick();
    setSelectedSample(sample);
    setCurrentQuery(sample.splQuery);
    setExecuting(true);
    setTimeout(() => {
      setExecuting(false);
      soundFX.playSuccess();
      setQueryResults({
        count: Math.floor(Math.random() * 400) + 120,
        timeMs: Math.floor(Math.random() * 60) + 20,
        log: sample.sampleLog,
        events: [
          { timestamp: "2026-08-14 12:05:43.881", ip: "40.80.148.42", status: 200, event: sample.sampleLog.slice(0, 80) + "..." },
          { timestamp: "2026-08-14 12:06:12.302", ip: "40.80.148.42", status: 200, event: "Target host response time elevated +340ms" },
          { timestamp: "2026-08-14 12:07:01.118", ip: "192.168.250.70", status: 500, event: "Database query syntax anomaly logged in MySQL error.log" }
        ]
      });
    }, 350);
  };

  const handleExecuteSearch = () => {
    soundFX.playScan();
    setExecuting(true);
    setTimeout(() => {
      setExecuting(false);
      soundFX.playSuccess();
      setQueryResults({
        count: Math.floor(Math.random() * 500) + 250,
        timeMs: Math.floor(Math.random() * 70) + 15,
        log: selectedSample.sampleLog,
        events: [
          { timestamp: "2026-08-14 12:05:43.881", ip: "40.80.148.42", status: 200, event: currentQuery.slice(0, 75) + " [MATCH CONFIRMED]" },
          { timestamp: "2026-08-14 12:06:00.010", ip: "192.168.250.70", status: 200, event: "Correlated PCAP frame #14209 with TCP stream 42" },
        ]
      });
    }, 450);
  };

  return (
    <section id="siem-lab" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[var(--hud-border)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--hud-primary)] uppercase tracking-widest">
            <span className="w-2 h-2 bg-[var(--hud-primary)]" />
            <span>MODULE // 03: SOC LOG FORENSICS & VAPT LABS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-hud font-extrabold text-white mt-1">
            SPLUNK SIEM & OFFSEC LAB EXPLORER
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            Real SPL hunting queries across 360,000+ BOTS v1 events & Stapler Linux exploitation chain.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <button
            onClick={() => {
              soundFX.playClick();
              setActiveTab('splunk');
            }}
            className={`px-4 py-2 font-mono text-xs font-semibold border transition-all ${
              activeTab === 'splunk'
                ? 'bg-[var(--hud-primary)] text-black border-[var(--hud-primary)] shadow-[0_0_15px_var(--hud-glow)]'
                : 'bg-black/50 text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
          >
            SPLUNK BOTS (360K+ EVENTS)
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              setActiveTab('offsec');
            }}
            className={`px-4 py-2 font-mono text-xs font-semibold border transition-all ${
              activeTab === 'offsec'
                ? 'bg-[var(--hud-primary)] text-black border-[var(--hud-primary)] shadow-[0_0_15px_var(--hud-glow)]'
                : 'bg-black/50 text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
          >
            OFFSEC STAPLER (ROOT CHAIN)
          </button>
        </div>
      </div>

      {/* Tab 1: Splunk SIEM Interactive Explorer */}
      {activeTab === 'splunk' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Query Selector Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>PRE-CONFIGURED SPL INVESTIGATIONS</span>
              <span className="text-[10px] text-[var(--hud-primary)]">4 AVAILABLE</span>
            </div>

            {PORTFOLIO_DATA.siemSamples.map((sample) => {
              const isSelected = selectedSample.id === sample.id;
              return (
                <button
                  key={sample.id}
                  onClick={() => handleSelectQuery(sample)}
                  onMouseEnter={() => soundFX.playHover()}
                  className={`text-left p-3.5 hud-cut-corners border transition-all ${
                    isSelected
                      ? 'bg-[var(--hud-primary)]/15 border-[var(--hud-primary)] shadow-[0_0_20px_rgba(0,243,255,0.15)]'
                      : 'bg-black/50 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-[var(--hud-primary)] font-semibold">{sample.tactic}</span>
                    <span className={`px-1.5 py-0.5 font-bold ${
                      sample.severity === 'CRITICAL' ? 'bg-red-950 text-red-400 border border-red-800' :
                      sample.severity === 'HIGH' ? 'bg-orange-950 text-orange-400 border border-orange-800' :
                      'bg-yellow-950 text-yellow-400 border border-yellow-800'
                    }`}>
                      {sample.severity}
                    </span>
                  </div>

                  <h4 className="text-xs font-hud font-bold text-white mb-1">
                    {sample.title}
                  </h4>

                  <p className="text-[11px] text-slate-400 line-clamp-2 font-mono">
                    {sample.description}
                  </p>
                </button>
              );
            })}

            {/* Ingestion Metric Callout */}
            <div className="p-3 bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-3">
              <Database className="w-5 h-5 text-[var(--hud-primary)] shrink-0" />
              <div>
                <span className="text-white font-bold">360,000+ Web Events</span> indexed into Splunk Enterprise from the official BOTS v1 dataset.
              </div>
            </div>
          </div>

          {/* Interactive SPL Console & Output (8 cols) */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            
            {/* SPL Query Terminal Box */}
            <div className="hud-corner-box border border-[var(--hud-primary)]/40 p-4 bg-black/85">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[var(--hud-primary)]" />
                  <span className="text-white font-semibold">SPLUNK SEARCH PROCESSING LANGUAGE (SPL) EDITOR</span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="text-emerald-400">INDEX: botsv1</span>
                  <span>|</span>
                  <span>TIME RANGE: ALL TIME</span>
                </div>
              </div>

              {/* Editable SPL input */}
              <div className="relative font-mono text-xs text-cyan-300 bg-slate-950/80 p-3 border border-slate-800/80 rounded-none overflow-x-auto">
                <textarea
                  value={currentQuery}
                  onChange={(e) => setCurrentQuery(e.target.value)}
                  className="w-full bg-transparent outline-none resize-none font-mono text-xs text-cyan-300 leading-relaxed min-h-[50px]"
                  rows={2}
                  spellCheck={false}
                />
              </div>

              {/* Execute Bar */}
              <div className="mt-3 flex items-center justify-between">
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                  <span className="text-[var(--hud-primary)]">MITRE:</span>
                  <span>{selectedSample.mitreRef}</span>
                </div>

                <button
                  onClick={handleExecuteSearch}
                  disabled={executing}
                  onMouseEnter={() => soundFX.playHover()}
                  className="px-4 py-2 bg-[var(--hud-primary)] text-black font-hud text-xs font-bold flex items-center gap-2 hover:bg-white transition-all shadow-[0_0_15px_var(--hud-glow)] disabled:opacity-50"
                >
                  <Play className={`w-3.5 h-3.5 fill-current ${executing ? 'animate-spin' : ''}`} />
                  <span>{executing ? 'CORRELATING LOGS...' : 'EXECUTE SPL QUERY'}</span>
                </button>
              </div>
            </div>

            {/* Query Results & Telemetry */}
            {queryResults && (
              <div className="hud-corner-box p-4 border border-slate-800 bg-black/75">
                <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>EVENTS CORRELATED: <strong className="text-white font-mono">{queryResults.count}</strong></span>
                    <span className="text-slate-600">|</span>
                    <span>EXEC TIME: <strong className="text-[var(--hud-primary)]">{queryResults.timeMs}ms</strong></span>
                  </div>
                  <span className="text-[10px] text-slate-400">SURICATA + STREAM_HTTP</span>
                </div>

                {/* Sample Parsed Event */}
                <div className="mt-3">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
                    // RAW FORENSIC PACKET PAYLOAD / LOG ENTRY:
                  </div>
                  <div className="p-2.5 bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-300/90 overflow-x-auto leading-relaxed">
                    {queryResults.log}
                  </div>
                </div>

                {/* Attack Timeline Stream */}
                <div className="mt-3">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
                    // RECONSTRUCTED ATTACK TIMELINE STREAM:
                  </div>
                  <div className="space-y-1.5 font-mono text-[11px]">
                    {queryResults.events.map((ev, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 bg-slate-900/40 border border-slate-800/60">
                        <span className="text-slate-500 text-[10px]">{ev.timestamp}</span>
                        <span className="px-1 py-0.2 bg-slate-800 text-[var(--hud-primary)] text-[9px]">{ev.ip}</span>
                        <span className={`text-[10px] font-bold ${ev.status === 200 ? 'text-emerald-400' : 'text-red-400'}`}>
                          [{ev.status}]
                        </span>
                        <span className="text-slate-300 truncate">{ev.event}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

      {/* Tab 2: OffSec Stapler Lab Kill Chain */}
      {activeTab === 'offsec' && (
        <div className="hud-corner-box p-6 border border-slate-800 bg-black/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div>
              <div className="text-xs font-mono text-red-400 flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-400" />
                <span>OFFSEC PROVING GROUNDS // STAPLER (LINUX) EXPLOITATION CHAIN</span>
              </div>
              <h3 className="text-xl font-hud font-bold text-white mt-1">
                From External Reconnaissance to Root Shell Privilege Escalation
              </h3>
            </div>
            <div className="mt-2 sm:mt-0 px-3 py-1 bg-red-950/70 border border-red-500 text-red-300 font-mono text-xs font-bold">
              FINAL OUTCOME: # uid=0(root)
            </div>
          </div>

          {/* Stepper Attack Path */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORTFOLIO_DATA.offSecPhases.map((phase) => (
              <div
                key={phase.phase}
                className="hud-cut-corners border border-slate-800 bg-slate-950/70 p-4 relative group hover:border-[var(--hud-primary)] transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[var(--hud-primary)] font-bold">
                    PHASE 0{phase.phase}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">{phase.tool}</span>
                </div>

                <h4 className="text-xs font-hud font-bold text-white mb-2 group-hover:text-[var(--hud-primary)] transition-colors">
                  {phase.name}
                </h4>

                <p className="text-[11px] text-slate-400 font-mono leading-relaxed mb-3">
                  {phase.action}
                </p>

                <div className="mt-auto pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-300">
                  <div className="text-slate-500 text-[9px] uppercase">EVIDENCE / ARTIFACT:</div>
                  <div className="text-emerald-400/90 truncate">{phase.outputSummary}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Vulnerability Chain Flow Diagram */}
          <div className="mt-6 p-4 bg-slate-900/50 border border-slate-800 flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
            <span className="px-2.5 py-1 bg-black border border-slate-700 text-slate-300">1. Nmap / enum4linux</span>
            <ArrowRight className="w-4 h-4 text-[var(--hud-primary)]" />
            <span className="px-2.5 py-1 bg-black border border-slate-700 text-slate-300">2. WordPress LFI (wp-config leak)</span>
            <ArrowRight className="w-4 h-4 text-[var(--hud-primary)]" />
            <span className="px-2.5 py-1 bg-black border border-slate-700 text-slate-300">3. MySQL INTO OUTFILE RCE</span>
            <ArrowRight className="w-4 h-4 text-[var(--hud-primary)]" />
            <span className="px-2.5 py-1 bg-black border border-red-500 text-red-400 font-bold">4. Root Privilege Escalation (uid=0)</span>
          </div>
        </div>
      )}

    </section>
  );
};
