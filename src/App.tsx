import React, { useState, useEffect } from 'react';
import { HudHeader } from './components/HudHeader';
import { HeroSection } from './components/HeroSection';
import { BentoGrid } from './components/BentoGrid';
import { ProjectsSection } from './components/ProjectsSection';
import { SiemLabExplorer } from './components/SiemLabExplorer';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { HudFooter } from './components/HudFooter';
import { HolographicTerminal } from './components/HolographicTerminal';
import { CyberDock } from './components/CyberDock';
import { CyberMatrixCanvas } from './components/CyberMatrixCanvas';
import { AndroidDeviceModal } from './components/AndroidDeviceModal';
import { soundFX } from './utils/soundEffects';

export const App: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<string>('cyan');
  const [threatLevel, setThreatLevel] = useState<'NORMAL' | 'ELEVATED' | 'CRITICAL'>('NORMAL');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [androidModalOpen, setAndroidModalOpen] = useState<boolean>(false);

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

  const activeColor = themeHexColors[activeTheme] || '#00f3ff';

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 cyber-grid overflow-x-hidden selection:bg-[var(--hud-primary)] selection:text-black">
      
      {/* 21st.dev Interactive Particle Matrix Canvas */}
      <CyberMatrixCanvas color={activeColor} />

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
      <main className="relative z-10 space-y-8 pb-16">
        {/* 01. Hero & 3D Holographic Identity Core */}
        <HeroSection
          onOpenTerminal={() => setTerminalOpen(true)}
          threatLevel={threatLevel}
          themeColor={activeColor}
        />

        {/* 02. 21st.dev High-Density Bento Radar Matrix */}
        <BentoGrid
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenAndroidModal={() => setAndroidModalOpen(true)}
        />

        {/* 03. Deployed Projects & Repositories Deck */}
        <ProjectsSection />

        {/* 04. Interactive Splunk BOTS SIEM & OffSec Stapler Lab */}
        <SiemLabExplorer />

        {/* 05. Tactical Capabilities Matrix */}
        <SkillsSection />

        {/* 06. Experience Logs, Education & Certifications */}
        <ExperienceSection />

        {/* 07. Encrypted Transmission Portal */}
        <ContactSection />
      </main>

      {/* 21st.dev & Mobbin Signature Floating Cyber Dock */}
      <CyberDock
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenAndroidModal={() => setAndroidModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Bottom HUD Footer */}
      <HudFooter onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Holographic AI Terminal Modal */}
      <HolographicTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Mobbin Google Pixel 8 Pro Android Simulation Modal */}
      <AndroidDeviceModal
        isOpen={androidModalOpen}
        onClose={() => setAndroidModalOpen(false)}
        onOpenTerminal={() => {
          setAndroidModalOpen(false);
          setTerminalOpen(true);
        }}
      />

      {/* Fixed Tactical Watermark */}
      <div className="fixed bottom-2 left-3 z-40 hidden xl:flex items-center gap-2 text-[9px] font-mono text-slate-600 pointer-events-none select-none">
        <span className="w-1.5 h-1.5 bg-[var(--hud-primary)]/40 rounded-full animate-pulse" />
        <span>SYS_CORE: NARENDRA-BORHADE // DEFCON: {threatLevel} // 21ST_HUD_v2.0</span>
      </div>
    </div>
  );
};

export default App;
