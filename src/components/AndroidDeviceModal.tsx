import React, { useState } from 'react';
import { 
  X, 
  Wifi, 
  BatteryCharging, 
  ShieldAlert, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  FolderGit2, 
  Terminal, 
  Check, 
  Copy,
  Layers
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundFX } from '../utils/soundEffects';

interface AndroidDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
}

export const AndroidDeviceModal: React.FC<AndroidDeviceModalProps> = ({
  isOpen,
  onClose,
  onOpenTerminal,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'siem' | 'contact'>('overview');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    soundFX.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      {/* Outer wrapper */}
      <div className="relative flex flex-col items-center">
        
        {/* Top Control Bar */}
        <div className="w-full max-w-[380px] flex items-center justify-between pb-2 px-2 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-emerald-400">PIXEL 8 PRO // HUD EDITION</span>
          </div>
          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="p-1 text-slate-400 hover:text-white bg-slate-900 border border-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Realistic Google Pixel Device Frame */}
        <div className="w-[340px] sm:w-[370px] h-[720px] max-h-[88vh] bg-black border-[6px] border-slate-800 rounded-[44px] shadow-[0_0_60px_rgba(0,243,255,0.25)] relative overflow-hidden flex flex-col p-2.5">
          
          {/* Bezel Camera Hole Punch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-950 border border-slate-800 rounded-full z-30 flex items-center justify-center pointer-events-none">
            <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
          </div>

          {/* Android Status Bar */}
          <div className="h-6 px-4 pt-1 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none z-20">
            <span>14:42</span>
            <div className="flex items-center gap-2">
              <Wifi className="w-3 h-3 text-cyan-400" />
              <span className="text-[10px] text-emerald-400 font-bold">5G+</span>
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          {/* Screen Content Body */}
          <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 font-mono select-none scrollbar-none">
            
            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-3">
                {/* Profile Card */}
                <div className="p-4 bg-slate-950 border border-[var(--hud-border)] rounded-2xl relative overflow-hidden">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-cyan-950 border border-cyan-400 rounded-xl flex items-center justify-center text-cyan-300 font-hud font-black text-lg">
                      NVB
                    </div>
                    <div>
                      <h3 className="text-sm font-hud font-bold text-white uppercase">
                        {PORTFOLIO_DATA.personal.name}
                      </h3>
                      <div className="text-[10px] text-cyan-400 font-semibold">
                        SOC Analyst & Cyber Specialist
                      </div>
                      <div className="text-[9px] text-slate-500">
                        Pune, India • MCA (7.8 CGPA)
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] text-slate-300 leading-relaxed">
                    Cybersecurity researcher skilled in SOC operations, Splunk SIEM log forensics (360k+ BOTS events), Wireshark DPI, and full-stack security tooling.
                  </p>
                </div>

                {/* Mobile Telemetry Metric Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'BOTS EVENTS', val: '360,000+' },
                    { label: 'OFFSEC LAB', val: 'STAPLER ROOT' },
                    { label: 'LIVE APPS', val: '2 DEPLOYED' },
                    { label: 'MCA CGPA', val: '7.8 / 10.0' },
                  ].map((m, i) => (
                    <div key={i} className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-xl">
                      <div className="text-[9px] text-slate-500">{m.label}</div>
                      <div className="text-xs font-hud font-bold text-white">{m.val}</div>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="p-3 bg-black/60 border border-slate-800 rounded-2xl space-y-2">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">TACTICAL ACTIONS</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        soundFX.playClick();
                        onOpenTerminal();
                      }}
                      className="py-2 px-2 bg-[var(--hud-primary)] text-black font-hud text-[10px] font-bold rounded-lg flex items-center justify-center gap-1 shadow-[0_0_10px_var(--hud-glow)]"
                    >
                      <Terminal className="w-3 h-3" />
                      <span>AI TERMINAL</span>
                    </button>

                    <button
                      onClick={handleCopyEmail}
                      className="py-2 px-2 bg-slate-900 border border-slate-700 text-slate-200 text-[10px] rounded-lg flex items-center justify-center gap-1"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'COPIED' : 'COPY EMAIL'}</span>
                    </button>
                  </div>
                </div>

                {/* Aegis Browser Spotlight */}
                <div className="p-3 bg-slate-950 border border-cyan-500/40 rounded-2xl">
                  <div className="flex items-center justify-between text-[10px] text-cyan-400 mb-1">
                    <span className="font-bold">FEATURED MOBILE ASSET</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <div className="text-xs font-hud font-bold text-white">
                    Aegis 3D Safe Browser
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    SSRF Sandboxing & Gemini 2.5 Flash AI Copilot
                  </div>
                  <a
                    href="https://aegisscans.dev"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFX.playClick()}
                    className="mt-2.5 w-full py-1.5 bg-cyan-950/80 border border-cyan-400 text-cyan-300 text-[10px] font-bold rounded-lg flex items-center justify-center gap-1"
                  >
                    <span>OPEN AEGISSCANS.DEV</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Tab: Projects */}
            {activeTab === 'projects' && (
              <div className="space-y-3">
                <div className="text-xs font-hud font-bold text-white mb-1">
                  PROJECT DIRECTORY
                </div>
                {PORTFOLIO_DATA.projects.map((p) => (
                  <div key={p.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between text-[9px] text-cyan-400">
                      <span>[{p.hudCode}]</span>
                      <span className="text-emerald-400">{p.status}</span>
                    </div>
                    <div className="text-xs font-hud font-bold text-white">{p.title}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-2">{p.tagline}</div>
                    <div className="flex items-center gap-2 pt-1">
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-cyan-300 underline flex items-center gap-1"
                        >
                          <span>Live</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-slate-400 underline flex items-center gap-1"
                        >
                          <Github className="w-2.5 h-2.5" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: SIEM Logs */}
            {activeTab === 'siem' && (
              <div className="space-y-3">
                <div className="text-xs font-hud font-bold text-white mb-1">
                  SPLUNK SIEM LOG LOGS
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[10px] text-slate-300">
                  <div className="text-cyan-400 font-bold mb-1">360K+ BOTS v1 Dataset</div>
                  <p className="text-slate-400 text-[9px] leading-relaxed">
                    Correlated Apache access logs, Suricata alerts, and Wireshark PCAPs to reconstruct multi-stage cyber attacks.
                  </p>
                </div>

                {PORTFOLIO_DATA.siemSamples.slice(0, 3).map((s) => (
                  <div key={s.id} className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-[10px]">
                    <div className="text-cyan-300 font-bold">{s.title}</div>
                    <div className="text-[9px] text-slate-400 mt-1">{s.tactic}</div>
                    <div className="mt-1.5 p-1.5 bg-black border border-slate-800 text-[8px] text-emerald-400 font-mono overflow-x-auto truncate">
                      {s.splQuery}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Contact */}
            {activeTab === 'contact' && (
              <div className="space-y-3">
                <div className="text-xs font-hud font-bold text-white mb-1">
                  COMMUNICATION HUB
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-[11px]">
                  <div className="flex items-center gap-2 text-white">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="truncate">{PORTFOLIO_DATA.personal.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{PORTFOLIO_DATA.personal.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={PORTFOLIO_DATA.personal.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-[10px] text-center text-cyan-300 font-bold flex items-center justify-center gap-1"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={PORTFOLIO_DATA.personal.githubPrimary}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-[10px] text-center text-white font-bold flex items-center justify-center gap-1"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            )}

          </div>

          {/* Mobbin Signature Bottom Navigation Bar */}
          <div className="h-14 border-t border-slate-800/80 bg-slate-950/95 rounded-b-[36px] flex items-center justify-around px-2 z-20">
            {[
              { id: 'overview', label: 'Home', icon: Layers },
              { id: 'projects', label: 'Projects', icon: FolderGit2 },
              { id: 'siem', label: 'SIEM', icon: ShieldAlert },
              { id: 'contact', label: 'Comms', icon: Mail },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  soundFX.playClick();
                  setActiveTab(tab.id as any);
                }}
                className={`flex flex-col items-center gap-0.5 text-[9px] font-mono transition-colors ${
                  activeTab === tab.id ? 'text-[var(--hud-primary)] font-bold' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Android Gesture Bar */}
          <div className="w-24 h-1 bg-slate-700 rounded-full mx-auto my-1 pointer-events-none" />

        </div>
      </div>
    </div>
  );
};
