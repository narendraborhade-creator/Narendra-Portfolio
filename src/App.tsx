import React, { useState, useEffect } from 'react';
import { HudHeader } from './components/HudHeader';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SiemLabExplorer } from './components/SiemLabExplorer';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { HudFooter } from './components/HudFooter';
import { HolographicTerminal } from './components/HolographicTerminal';
import { soundFX } from './utils/soundEffects';

export const App: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<string>('cyan');
  const [threatLevel, setThreatLevel] = useState<'NORMAL' | 'ELEVATED' | 'CRITICAL'>('NORMAL');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);

  // Sync data-theme attribute with document.body
  useEffect(() => {
    document.body.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundFX.enabled = nextState;
  };

  const themeHexColors: Record<string, string> = {
    cyan: '#00f3ff',
    green: '#00ff88',
    amber: '#ffaa00',
    red: '#ff1744',
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 cyber-grid overflow-x-hidden selection:bg-[var(--hud-primary)] selection:text-black">
      
      {/* Top HUD Navigation & Telemetry Header */}
      <HudHeader
        activeTheme={activeTheme}
        onThemeChange={setActiveTheme}
        threatLevel={threatLevel}
        onThreatLevelChange={setThreatLevel}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Main Mission Content */}
      <main className="relative z-10 space-y-8">
        {/* 01. Hero & 3D Holographic Identity Core */}
        <HeroSection
          onOpenTerminal={() => setTerminalOpen(true)}
          threatLevel={threatLevel}
          themeColor={themeHexColors[activeTheme] || '#00f3ff'}
        />

        {/* 02. Deployed Projects & Repositories Deck */}
        <ProjectsSection />

        {/* 03. Interactive Splunk BOTS SIEM & OffSec Stapler Lab */}
        <SiemLabExplorer />

        {/* 04. Tactical Capabilities Matrix */}
        <SkillsSection />

        {/* 05. Experience Logs, Education & Certifications */}
        <ExperienceSection />

        {/* 06. Encrypted Transmission Portal */}
        <ContactSection />
      </main>

      {/* Bottom HUD Footer */}
      <HudFooter onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Holographic AI Terminal Modal */}
      <HolographicTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Fixed Tactical Watermark */}
      <div className="fixed bottom-2 left-3 z-40 hidden xl:flex items-center gap-2 text-[9px] font-mono text-slate-600 pointer-events-none select-none">
        <span className="w-1.5 h-1.5 bg-[var(--hud-primary)]/40 rounded-full animate-pulse" />
        <span>SYS_CORE: NARENDRA-BORHADE // DEFCON: {threatLevel} // VER: 2026.11</span>
      </div>
    </div>
  );
};

export default App;
