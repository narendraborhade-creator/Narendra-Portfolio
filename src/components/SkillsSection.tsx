import React from 'react';
import { 
  ShieldAlert, 
  Crosshair, 
  Cpu, 
  Server, 
  CheckCircle2
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundFX } from '../utils/soundEffects';

export const SkillsSection: React.FC = () => {

  const iconMap: Record<string, React.ReactNode> = {
    ShieldAlert: <ShieldAlert className="w-5 h-5 text-[var(--hud-primary)]" />,
    Crosshair: <Crosshair className="w-5 h-5 text-[var(--hud-primary)]" />,
    Cpu: <Cpu className="w-5 h-5 text-[var(--hud-primary)]" />,
    Server: <Server className="w-5 h-5 text-[var(--hud-primary)]" />,
  };

  return (
    <section id="skills" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[var(--hud-border)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--hud-primary)] uppercase tracking-widest">
            <span className="w-2 h-2 bg-[var(--hud-primary)]" />
            <span>MODULE // 04: TACTICAL CAPABILITIES MATRIX</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-hud font-extrabold text-white mt-1">
            CYBERSECURITY & DEV TELEMETRY
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            Proficiencies across defensive SOC operations, offensive penetration testing, and full-stack AI security tooling.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>ALL DEFENSE MODULES CALIBRATED</span>
        </div>
      </div>

      {/* Skills 4-Column Tactical Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PORTFOLIO_DATA.skills.map((module) => (
          <div
            key={module.hudId}
            onMouseEnter={() => soundFX.playHover()}
            className="hud-corner-box p-6 border border-[var(--hud-border)] bg-black/75 hover:border-[var(--hud-primary)] transition-all hover:shadow-[0_0_25px_rgba(0,243,255,0.1)]"
          >
            {/* Module Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[var(--hud-primary)]/10 border border-[var(--hud-primary)]/40">
                  {iconMap[module.icon]}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[var(--hud-primary)] tracking-widest">
                    [{module.hudId}]
                  </span>
                  <h3 className="text-base font-hud font-bold text-white">
                    {module.category}
                  </h3>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-500">READY</span>
            </div>

            {/* Skill Meters */}
            <div className="space-y-3.5">
              {module.skills.map((skill) => (
                <div key={skill.name} className="group/item">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300 group-hover/item:text-[var(--hud-primary)] transition-colors flex items-center gap-1.5">
                      {skill.highlight && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--hud-primary)]" />
                      )}
                      <span>{skill.name}</span>
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 font-mono">
                      {skill.level}%
                    </span>
                  </div>

                  {/* High-tech HUD Telemetry Bar */}
                  <div className="h-2 w-full bg-slate-900 border border-slate-800 relative overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--hud-primary)]/60 to-[var(--hud-primary)] transition-all duration-700 relative"
                      style={{ width: `${skill.level}%` }}
                    >
                      {/* Scan notch */}
                      <span className="absolute top-0 right-0 bottom-0 w-1 bg-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Module Bottom Status */}
            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="text-slate-500 uppercase tracking-widest">VALIDATION:</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                VERIFIED IN PRODUCTION & LABS
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
