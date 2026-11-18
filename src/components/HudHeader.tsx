import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  Radio, 
  Menu, 
  X, 
  Crosshair,
  Terminal as TerminalIcon,
  FolderGit2,
  Cpu,
  Send,
  FileText
} from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

interface HudHeaderProps {
  activeTheme: string;
  onThemeChange: (theme: string) => void;
  threatLevel: 'NORMAL' | 'ELEVATED' | 'CRITICAL';
  onThreatLevelChange: (level: 'NORMAL' | 'ELEVATED' | 'CRITICAL') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenTerminal: () => void;
}

export const HudHeader: React.FC<HudHeaderProps> = ({
  activeTheme,
  onThemeChange,
  threatLevel,
  onThreatLevelChange,
  soundEnabled,
  onToggleSound,
  onOpenTerminal,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Update high-tech military UTC clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
      setTimeStr(`${hours}:${mins}:${secs}.${ms} IST`);
    };

    updateClock();
    const interval = setInterval(updateClock, 50);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: '// 01.IDENTITY', href: '#identity', icon: Crosshair },
    { label: '// 02.PROJECTS', href: '#projects', icon: FolderGit2 },
    { label: '// 03.SIEM LAB', href: '#siem-lab', icon: ShieldAlert },
    { label: '// 04.SKILLS', href: '#skills', icon: Cpu },
    { label: '// 05.MISSIONS', href: '#experience', icon: FileText },
    { label: '// 06.TRANSMIT', href: '#contact', icon: Send },
  ];

  const handleNavClick = (href: string) => {
    soundFX.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cycleThreat = () => {
    soundFX.playAlert();
    if (threatLevel === 'NORMAL') onThreatLevelChange('ELEVATED');
    else if (threatLevel === 'ELEVATED') onThreatLevelChange('CRITICAL');
    else onThreatLevelChange('NORMAL');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--hud-border)] bg-[var(--hud-bg)] backdrop-blur-md transition-colors duration-300">
      {/* Top Telemetry Strip */}
      <div className="hidden sm:flex items-center justify-between px-4 py-1 text-[11px] border-b border-[var(--hud-border)] bg-black/40 text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[var(--hud-primary)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--hud-primary)] animate-ping" />
            <span className="font-semibold tracking-wider">DEFENSE_CORE: ONLINE</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="tracking-wider">LATENCY: 14ms</span>
          <span className="text-slate-600">|</span>
          <span className="tracking-wider">SEC_LEVEL: 04 // ATS_COMPLIANT</span>
          <span className="text-slate-600">|</span>
          <span className="tracking-wider">LOC: PUNE, INDIA (18.5204° N, 73.8567° E)</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Audio Visualizer Bars */}
          <div className="flex items-center gap-0.5 h-3">
            {[40, 80, 60, 100, 30, 90, 50].map((h, i) => (
              <span
                key={i}
                className="w-0.5 bg-[var(--hud-primary)] transition-all duration-150"
                style={{
                  height: soundEnabled ? `${h}%` : '20%',
                  opacity: soundEnabled ? 0.9 : 0.25,
                }}
              />
            ))}
          </div>

          <div className="font-mono text-[var(--hud-primary)] font-bold tracking-widest">
            {timeStr}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Callsign */}
        <a
          href="#identity"
          onClick={() => soundFX.playClick()}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 border border-[var(--hud-primary)] bg-[var(--hud-primary)]/10 flex items-center justify-center relative overflow-hidden group-hover:bg-[var(--hud-primary)]/20 transition-all">
            <ShieldAlert className="w-5 h-5 text-[var(--hud-primary)] group-hover:scale-110 transition-transform" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[var(--hud-primary)]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[var(--hud-primary)]" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-hud font-extrabold tracking-wider text-base text-white group-hover:text-[var(--hud-primary)] transition-colors">
                NARENDRA BORHADE
              </span>
              <span className="px-1.5 py-0.2 text-[9px] font-bold border border-[var(--hud-primary)]/60 text-[var(--hud-primary)] rounded-none">
                SOC-VAPT
              </span>
            </div>
            <span className="text-[10px] text-slate-400 tracking-widest">
              CALLSIGN: CREATOR-NAREN // MCA_2027
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              onMouseEnter={() => soundFX.playHover()}
              className="px-2.5 py-1.5 text-xs font-mono text-slate-300 hover:text-[var(--hud-primary)] hover:bg-[var(--hud-primary)]/10 border border-transparent hover:border-[var(--hud-primary)]/40 transition-all rounded-none"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Tactical HUD Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Threat Level Switcher */}
          <button
            onClick={cycleThreat}
            onMouseEnter={() => soundFX.playHover()}
            title="Toggle Threat Condition (Normal / Elevated / Critical)"
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold tracking-wider border transition-all ${
              threatLevel === 'CRITICAL'
                ? 'bg-red-950/60 border-red-500 text-red-400 animate-pulse'
                : threatLevel === 'ELEVATED'
                ? 'bg-amber-950/60 border-amber-500 text-amber-400'
                : 'bg-cyan-950/30 border-[var(--hud-primary)] text-[var(--hud-primary)]'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>DEFCON: {threatLevel}</span>
          </button>

          {/* Theme Palette Switcher */}
          <div className="hidden md:flex items-center gap-1 border border-slate-700/60 bg-black/50 p-1">
            {[
              { id: 'cyan', color: '#00f3ff', title: 'Cyber Cyan' },
              { id: 'green', color: '#00ff88', title: 'Matrix Emerald' },
              { id: 'amber', color: '#ffaa00', title: 'Tactical Amber' },
              { id: 'red', color: '#ff1744', title: 'Crimson Breach' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  soundFX.playClick();
                  onThemeChange(t.id);
                }}
                title={t.title}
                className={`w-4 h-4 transition-transform ${
                  activeTheme === t.id ? 'scale-125 ring-1 ring-white' : 'opacity-60 hover:opacity-100'
                }`}
                style={{ backgroundColor: t.color }}
              />
            ))}
          </div>

          {/* Holographic AI Terminal Trigger */}
          <button
            onClick={() => {
              soundFX.playClick();
              onOpenTerminal();
            }}
            onMouseEnter={() => soundFX.playHover()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-[var(--hud-primary)]/15 border border-[var(--hud-primary)] text-[var(--hud-primary)] hover:bg-[var(--hud-primary)] hover:text-black font-semibold transition-all shadow-[0_0_15px_rgba(0,243,255,0.2)]"
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI TERMINAL</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              soundFX.playClick();
            }}
            onMouseEnter={() => soundFX.playHover()}
            title={soundEnabled ? 'Mute Cyber Audio' : 'Unmute Cyber Audio'}
            className="p-2 border border-slate-700/60 text-slate-300 hover:text-[var(--hud-primary)] hover:border-[var(--hud-primary)]/60 transition-all"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[var(--hud-primary)]" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              soundFX.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 border border-slate-700 text-slate-300 hover:text-[var(--hud-primary)]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--hud-border)] bg-black/95 px-4 pt-3 pb-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="flex items-center gap-3 px-3 py-2 text-sm font-mono text-left text-slate-300 hover:text-[var(--hud-primary)] hover:bg-[var(--hud-primary)]/10 border-l-2 border-transparent hover:border-[var(--hud-primary)]"
            >
              <link.icon className="w-4 h-4 text-[var(--hud-primary)]" />
              <span>{link.label}</span>
            </button>
          ))}

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">THEME COLOR:</span>
            <div className="flex items-center gap-2">
              {['cyan', 'green', 'amber', 'red'].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    soundFX.playClick();
                    onThemeChange(t);
                  }}
                  className={`w-5 h-5 rounded-none ${
                    activeTheme === t ? 'ring-2 ring-white' : 'opacity-60'
                  }`}
                  style={{
                    backgroundColor:
                      t === 'cyan' ? '#00f3ff' : t === 'green' ? '#00ff88' : t === 'amber' ? '#ffaa00' : '#ff1744',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
