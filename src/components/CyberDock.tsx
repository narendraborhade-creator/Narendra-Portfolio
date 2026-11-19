import React, { useState, useRef } from 'react';
import { 
  Crosshair, 
  LayoutGrid, 
  FolderGit2, 
  ShieldAlert, 
  Cpu, 
  FileText, 
  Terminal, 
  Smartphone, 
  Volume2, 
  VolumeX, 
  Send 
} from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

interface CyberDockProps {
  onOpenTerminal: () => void;
  onOpenAndroidModal: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const CyberDock: React.FC<CyberDockProps> = ({
  onOpenTerminal,
  onOpenAndroidModal,
  soundEnabled,
  onToggleSound,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const lastSoundPlayRef = useRef<number>(0);

  const triggerHoverSound = () => {
    const now = Date.now();
    // Throttle hover audio to max once per 80ms
    if (now - lastSoundPlayRef.current > 80) {
      lastSoundPlayRef.current = now;
      soundFX.playHover();
    }
  };

  const items = [
    { label: 'Identity', href: '#identity', icon: Crosshair },
    { label: 'Bento Telemetry', href: '#bento', icon: LayoutGrid },
    { label: 'Projects', href: '#projects', icon: FolderGit2 },
    { label: 'Splunk SIEM', href: '#siem-lab', icon: ShieldAlert },
    { label: 'Skills', href: '#skills', icon: Cpu },
    { label: 'Missions', href: '#experience', icon: FileText },
    { label: 'AI Terminal', action: onOpenTerminal, icon: Terminal, highlight: true },
    { label: 'Android App', action: onOpenAndroidModal, icon: Smartphone, special: true },
    { label: soundEnabled ? 'Mute' : 'Audio', action: onToggleSound, icon: soundEnabled ? Volume2 : VolumeX },
    { label: 'Transmit', href: '#contact', icon: Send },
  ];

  const handleItemClick = (item: typeof items[0]) => {
    soundFX.playClick();
    if (item.action) {
      item.action();
    } else if (item.href) {
      const el = document.querySelector(item.href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Tactical Cyber Dock"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[calc(100vw-1.5rem)] px-1"
    >
      <div className="flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 bg-black/85 border border-[var(--hud-border)] backdrop-blur-xl shadow-[0_0_30px_rgba(0,243,255,0.18)] hud-chamfer overflow-x-auto scrollbar-none">
        {items.map((item, idx) => {
          const isHovered = hoveredIdx === idx;
          const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

          let scaleClass = 'scale-100';
          if (isHovered) scaleClass = 'scale-120 -translate-y-1.5';
          else if (isNeighbor) scaleClass = 'scale-105 -translate-y-0.5';

          return (
            <div key={item.label} className="relative group shrink-0">
              <button
                onClick={() => handleItemClick(item)}
                onMouseEnter={() => {
                  triggerHoverSound();
                  setHoveredIdx(idx);
                }}
                onMouseLeave={() => setHoveredIdx(null)}
                onFocus={() => {
                  triggerHoverSound();
                  setHoveredIdx(idx);
                }}
                onBlur={() => setHoveredIdx(null)}
                aria-label={item.label}
                className={`p-2 sm:p-2.5 transition-all duration-200 ease-out flex items-center justify-center relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${scaleClass} ${
                  item.highlight
                    ? 'bg-[var(--hud-primary)] text-black font-bold shadow-[0_0_15px_var(--hud-glow)]'
                    : item.special
                    ? 'bg-emerald-950/60 border border-emerald-500 text-emerald-400'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-[var(--hud-primary)] hover:border-[var(--hud-primary)]/50'
                }`}
              >
                <item.icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              {/* 21st.dev Tooltip with keyboard focus visibility */}
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/90 border border-[var(--hud-primary)]/50 text-[10px] font-mono text-[var(--hud-primary)] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
