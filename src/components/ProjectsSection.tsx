import React, { useState } from 'react';
import { 
  ExternalLink, 
  Github, 
  Globe
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundFX } from '../utils/soundEffects';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: '// ALL ASSETS' },
    { id: 'security', label: '// SECURITY & SIEM' },
    { id: 'offensive', label: '// OFFENSIVE & VAPT' },
    { id: 'ai', label: '// AI & DEV TOOLING' },
    { id: 'web', label: '// WEB APPS' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[var(--hud-border)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--hud-primary)] uppercase tracking-widest">
            <span className="w-2 h-2 bg-[var(--hud-primary)]" />
            <span>MODULE // 02: DEPLOYED SYSTEMS & REPOSITORIES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-hud font-extrabold text-white mt-1">
            FEATURED CYBERSECURITY & AI PROJECTS
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            Production web platforms, Splunk SIEM frameworks, and AI security tooling built by Narendra Borhade.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mt-4 md:mt-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundFX.playClick();
                setActiveCategory(cat.id);
              }}
              onMouseEnter={() => soundFX.playHover()}
              className={`px-3 py-1.5 font-mono text-xs transition-all ${
                activeCategory === cat.id
                  ? 'bg-[var(--hud-primary)] text-black font-bold shadow-[0_0_15px_var(--hud-glow)]'
                  : 'bg-black/50 text-slate-400 border border-slate-800 hover:border-slate-600 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onMouseEnter={() => soundFX.playHover()}
            className="hud-corner-box group flex flex-col justify-between p-5 border border-[var(--hud-border)] bg-black/70 hover:border-[var(--hud-primary)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,243,255,0.15)]"
          >
            {/* Card Top Telemetry */}
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono pb-2 border-b border-slate-800/80 mb-3 text-slate-400">
                <span className="text-[var(--hud-primary)] font-semibold tracking-wider">
                  [{project.hudCode}]
                </span>

                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    project.status === 'ONLINE' ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'
                  }`} />
                  <span className={project.status === 'ONLINE' ? 'text-emerald-400 font-bold' : 'text-cyan-400'}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-lg font-hud font-extrabold text-white group-hover:text-[var(--hud-primary)] transition-colors leading-snug">
                {project.title}
              </h3>
              
              <div className="text-xs font-mono text-cyan-300/80 font-semibold mt-1 mb-3">
                {project.tagline}
              </div>

              {/* Description */}
              <p className="text-xs font-mono text-slate-300 leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Telemetry Stats Rows */}
              <div className="grid grid-cols-3 gap-1.5 p-2 bg-slate-950/80 border border-slate-800/80 mb-4 text-[10px] font-mono">
                {project.stats.map((s, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-slate-500 uppercase tracking-tight text-[9px]">{s.label}</span>
                    <span className="text-white font-semibold truncate">{s.value}</span>
                  </div>
                ))}
              </div>

              {/* Key Highlights / Metrics */}
              <div className="space-y-1 mb-4">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                    <span className="text-[var(--hud-primary)] text-xs">»</span>
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions & Tech Tags */}
            <div className="pt-3 border-t border-slate-800/80">
              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300 group-hover:border-[var(--hud-primary)]/40 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFX.playClick()}
                    className="flex-1 py-2 px-3 text-xs font-hud font-bold text-black bg-[var(--hud-primary)] hover:bg-white transition-all text-center flex items-center justify-center gap-1.5 shadow-[0_0_15px_var(--hud-glow)]"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>LAUNCH APP</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFX.playClick()}
                    className={`py-2 px-3 text-xs font-mono text-slate-300 border border-slate-700 hover:border-[var(--hud-primary)] hover:text-white bg-black/60 transition-all flex items-center justify-center gap-1.5 ${
                      !project.liveUrl ? 'flex-1' : ''
                    }`}
                  >
                    <Github className="w-3.5 h-3.5 text-cyan-400" />
                    <span>SOURCE</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
