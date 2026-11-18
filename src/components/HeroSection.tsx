import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  ExternalLink, 
  Download, 
  MapPin, 
  Mail, 
  Linkedin, 
  Github, 
  Crosshair,
  ShieldAlert,
  Globe
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { HologramCanvas } from './HologramCanvas';
import { soundFX } from '../utils/soundEffects';

interface HeroSectionProps {
  onOpenTerminal: () => void;
  threatLevel: 'NORMAL' | 'ELEVATED' | 'CRITICAL';
  themeColor: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenTerminal,
  threatLevel,
  themeColor
}) => {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const subtitles = PORTFOLIO_DATA.personal.subtitles;

  // Typewriter effect for titles
  useEffect(() => {
    const currentFullText = subtitles[subtitleIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    } else {
      const delta = isDeleting ? 30 : 60;
      timer = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting
            ? currentFullText.substring(0, prev.length - 1)
            : currentFullText.substring(0, prev.length + 1)
        );
      }, delta);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, subtitleIndex, subtitles]);

  const handleDownloadResume = () => {
    soundFX.playSuccess();
    // Creates a download trigger for the ATS Markdown resume
    const file = new Blob([PORTFOLIO_DATA.personal.summary + "\n\nFor full details, visit " + window.location.href], {type: 'text/markdown'});
    const url = URL.createObjectURL(file);
    const element = document.createElement("a");
    element.href = url;
    element.download = "Narendra_Borhade_Resume_2026_ATS.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="identity" className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[var(--hud-primary)]/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Col: Dossier & Technical Profile (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          
          {/* Tactical Badge & Status Header */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <div className="flex items-center gap-2 px-3 py-1 bg-black/60 border border-[var(--hud-primary)] text-[var(--hud-primary)] font-bold">
              <Crosshair className="w-3.5 h-3.5 animate-spin-slow" />
              <span>DOSSIER: {PORTFOLIO_DATA.personal.securityClearance}</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[var(--hud-primary)]/10 border border-[var(--hud-primary)]/40 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[var(--hud-primary)] animate-ping" />
              <span>{PORTFOLIO_DATA.personal.statusBadge}</span>
            </div>

            <div className="hidden sm:flex items-center gap-1 px-2 py-1 text-slate-400 bg-slate-900/60 border border-slate-800">
              <MapPin className="w-3 h-3 text-[var(--hud-primary)]" />
              <span>{PORTFOLIO_DATA.personal.location}</span>
            </div>
          </div>

          {/* Name & Animated Title */}
          <div>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-mono mb-1">
              // CANDIDATE PROFILE IDENTIFIER:
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-hud font-black tracking-tight text-white uppercase">
              {PORTFOLIO_DATA.personal.name}
            </h1>
            
            {/* Dynamic Typewriter Role */}
            <div className="mt-3 flex items-center gap-2 text-base sm:text-xl font-mono text-[var(--hud-primary)] font-semibold min-h-[32px]">
              <span className="text-slate-500">&gt;</span>
              <span>{displayText}</span>
              <span className="inline-block w-2.5 h-5 bg-[var(--hud-primary)] animate-blink" />
            </div>
          </div>

          {/* Summary Box with HUD Corner Styling */}
          <div className="hud-corner-box p-5 border-l-4 border-l-[var(--hud-primary)]">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
              {PORTFOLIO_DATA.personal.summary}
            </p>

            {/* Quick Live Deployments Mention */}
            <div className="mt-4 pt-3 border-t border-[var(--hud-border)] flex flex-wrap items-center gap-4 text-xs font-mono">
              <span className="text-slate-400">ACTIVE MISSIONS:</span>
              <a 
                href="https://aegisscans.dev" 
                target="_blank" 
                rel="noreferrer"
                onClick={() => soundFX.playClick()}
                onMouseEnter={() => soundFX.playHover()}
                className="flex items-center gap-1.5 text-[var(--hud-primary)] hover:underline"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>aegisscans.dev (Aegis 3D Browser)</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <a 
                href="https://manga-for-me.vercel.app" 
                target="_blank" 
                rel="noreferrer"
                onClick={() => soundFX.playClick()}
                onMouseEnter={() => soundFX.playHover()}
                className="flex items-center gap-1.5 text-slate-300 hover:text-[var(--hud-primary)] hover:underline"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>manga-for-me.vercel.app</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>

          {/* Telemetry Chips Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "BOTS EVENTS", val: PORTFOLIO_DATA.personal.telemetry.siemEventsAnalyzed, sub: "Splunk SIEM Lab" },
              { label: "SPL QUERIES", val: PORTFOLIO_DATA.personal.telemetry.splunkSplQueries, sub: "Threat Hunting" },
              { label: "OFFSEC LAB", val: PORTFOLIO_DATA.personal.telemetry.offSecBoxPwned, sub: "Stapler Chained" },
              { label: "MCA CGPA", val: PORTFOLIO_DATA.personal.telemetry.academicCgpa, sub: "NMIET Pune" },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="hud-cut-top-right bg-black/60 border border-[var(--hud-border)] p-3 relative group hover:border-[var(--hud-primary)] transition-all"
              >
                <div className="text-[10px] text-slate-400 tracking-wider font-mono">{stat.label}</div>
                <div className="text-lg sm:text-xl font-hud font-bold text-white group-hover:text-[var(--hud-primary)] transition-colors">
                  {stat.val}
                </div>
                <div className="text-[9px] text-slate-500 font-mono">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Action Hub & CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                soundFX.playClick();
                onOpenTerminal();
              }}
              onMouseEnter={() => soundFX.playHover()}
              className="px-5 py-3 font-hud text-xs sm:text-sm font-bold tracking-wider bg-[var(--hud-primary)] text-black hover:bg-white transition-all flex items-center gap-2 shadow-[0_0_25px_var(--hud-glow)]"
            >
              <Terminal className="w-4 h-4" />
              <span>LAUNCH AI ASSISTANT TERMINAL</span>
            </button>

            <a
              href="#siem-lab"
              onClick={() => soundFX.playClick()}
              onMouseEnter={() => soundFX.playHover()}
              className="px-4 py-3 font-hud text-xs sm:text-sm font-semibold tracking-wider bg-transparent border border-[var(--hud-primary)] text-[var(--hud-primary)] hover:bg-[var(--hud-primary)]/15 transition-all flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>INTERACTIVE SIEM LAB</span>
            </a>

            <button
              onClick={handleDownloadResume}
              onMouseEnter={() => soundFX.playHover()}
              className="px-4 py-3 font-mono text-xs text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white bg-black/40 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>RESUME ATS</span>
            </button>
          </div>

          {/* Social Links Bar */}
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
            <span className="text-slate-500 uppercase tracking-widest text-[10px]">TRANSMISSION CHANNELS:</span>
            <a 
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playClick()}
              onMouseEnter={() => soundFX.playHover()}
              className="flex items-center gap-1.5 hover:text-[var(--hud-primary)] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>

            <a 
              href={PORTFOLIO_DATA.personal.githubPrimary}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playClick()}
              onMouseEnter={() => soundFX.playHover()}
              className="flex items-center gap-1.5 hover:text-[var(--hud-primary)] transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub (Primary)</span>
            </a>

            <a 
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              onClick={() => soundFX.playClick()}
              onMouseEnter={() => soundFX.playHover()}
              className="flex items-center gap-1.5 hover:text-[var(--hud-primary)] transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Email</span>
            </a>
          </div>

        </div>

        {/* Right Col: 3D Holographic Core & HUD Target Matrix (5 cols) */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          
          {/* Tactical Outer Ring Frame */}
          <div className="w-full max-w-[460px] aspect-square relative hud-corner-box border-2 border-[var(--hud-border)] p-2 bg-gradient-to-b from-[var(--hud-primary)]/5 via-black/80 to-black/90 shadow-[0_0_50px_rgba(0,243,255,0.1)]">
            
            {/* HUD Reticle Overlay Elements */}
            <div className="absolute top-2 left-2 text-[9px] font-mono text-[var(--hud-primary)] tracking-widest flex items-center gap-1 z-10">
              <span className="w-2 h-2 border border-[var(--hud-primary)] inline-block" />
              <span>CORE_VISUALIZER // THREE.JS ENGINE</span>
            </div>

            <div className="absolute top-2 right-2 text-[9px] font-mono text-slate-400 z-10">
              FPS: 60.0 // 4K PARTICLES
            </div>

            {/* Target Crosshairs */}
            <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
              <div className="w-48 h-48 border border-[var(--hud-primary)]/20 rounded-full animate-spin-slow" />
              <div className="w-64 h-64 border border-dashed border-[var(--hud-primary)]/15 rounded-full animate-spin-reverse" />
              
              {/* Corner targeting marks */}
              <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-[var(--hud-primary)]" />
              <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-[var(--hud-primary)]" />
              <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-[var(--hud-primary)]" />
              <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-[var(--hud-primary)]" />
            </div>

            {/* Hologram Canvas Element */}
            <div className="w-full h-full relative">
              <HologramCanvas themeColor={themeColor} threatLevel={threatLevel} />
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[10px] font-mono bg-black/80 border border-[var(--hud-border)] px-3 py-1.5 text-slate-300 backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-[var(--hud-primary)]" />
                <span>INTEGRITY: 100%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--hud-primary)]">PROTOCOL: AES-256</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
