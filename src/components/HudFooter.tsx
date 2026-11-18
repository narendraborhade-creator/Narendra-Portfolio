import React from 'react';
import { ShieldAlert, ArrowUp, Github, Linkedin, Mail, Globe, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundFX } from '../utils/soundEffects';

interface HudFooterProps {
  onOpenTerminal: () => void;
}

export const HudFooter: React.FC<HudFooterProps> = ({ onOpenTerminal }) => {
  const scrollToTop = () => {
    soundFX.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--hud-border)] bg-black/90 py-10 px-4 sm:px-6 lg:px-8 font-mono text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Branding */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
          <div className="flex items-center gap-2 text-white font-hud font-bold text-sm">
            <ShieldAlert className="w-4 h-4 text-[var(--hud-primary)]" />
            <span>NARENDRA VIJAY BORHADE</span>
            <span className="text-[10px] text-[var(--hud-primary)] border border-[var(--hud-primary)]/40 px-1">
              SYS-2026
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            SOC Analyst & Cybersecurity Specialist • MCA Candidate (SPPU)
          </p>
          <p className="text-[10px] text-slate-600">
            SHA-256 HASH: 8f9b23c...d81a9 • PROTOCOL: TLS 1.3 / AES-256 GCM
          </p>
        </div>

        {/* Center Live Apps */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <a
            href="https://aegisscans.dev"
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFX.playClick()}
            className="flex items-center gap-1.5 text-slate-300 hover:text-[var(--hud-primary)] transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>aegisscans.dev</span>
          </a>

          <a
            href="https://manga-for-me.vercel.app"
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFX.playClick()}
            className="flex items-center gap-1.5 text-slate-300 hover:text-[var(--hud-primary)] transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>manga-for-me.vercel.app</span>
          </a>

          <button
            onClick={() => {
              soundFX.playClick();
              onOpenTerminal();
            }}
            className="flex items-center gap-1.5 text-[var(--hud-primary)] hover:underline"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>AI Terminal</span>
          </button>
        </div>

        {/* Right Scroll to Top & Socials */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playClick()}
              className="p-2 border border-slate-800 text-slate-400 hover:text-white hover:border-[var(--hud-primary)] transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={PORTFOLIO_DATA.personal.githubPrimary}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playClick()}
              className="p-2 border border-slate-800 text-slate-400 hover:text-white hover:border-[var(--hud-primary)] transition-all"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              onClick={() => soundFX.playClick()}
              className="p-2 border border-slate-800 text-slate-400 hover:text-white hover:border-[var(--hud-primary)] transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => soundFX.playHover()}
            title="Return to Top Orbit"
            className="p-2 bg-[var(--hud-primary)] text-black font-bold hover:bg-white transition-all shadow-[0_0_15px_var(--hud-glow)]"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
