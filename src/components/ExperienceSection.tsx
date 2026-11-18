import React from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundFX } from '../utils/soundEffects';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[var(--hud-border)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--hud-primary)] uppercase tracking-widest">
            <span className="w-2 h-2 bg-[var(--hud-primary)]" />
            <span>MODULE // 05: PROFESSIONAL LOGS & CREDENTIALS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-hud font-extrabold text-white mt-1">
            EXPERIENCE, EDUCATION & CERTIFICATIONS
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            Chronological SOC internships, postgraduate cybersecurity coursework, and verified industry credentials.
          </p>
        </div>

        <div className="mt-4 md:mt-0 px-3 py-1 bg-black/60 border border-slate-700 text-slate-300 font-mono text-xs">
          STATUS: VERIFIED CANDIDATE
        </div>
      </div>

      {/* Main Grid: Left Experience & Education, Right Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Work Experience & Education (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-8">
          
          {/* Work Experience Sub-section */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--hud-primary)] uppercase tracking-widest mb-4">
              <Briefcase className="w-4 h-4 text-[var(--hud-primary)]" />
              <span>SOC & SOFTWARE INTERNSHIP MISSIONS</span>
            </div>

            <div className="space-y-4">
              {PORTFOLIO_DATA.experience.map((exp, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => soundFX.playHover()}
                  className="hud-corner-box p-5 border border-slate-800 bg-black/75 hover:border-[var(--hud-primary)] transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-800/80 mb-3 text-xs font-mono">
                    <span className="text-[var(--hud-primary)] font-bold">[{exp.hudTag}]</span>
                    <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-hud font-bold text-white group-hover:text-[var(--hud-primary)] transition-colors">
                    {exp.role} <span className="text-slate-400 font-mono font-normal">@ {exp.company}</span>
                  </h3>

                  <ul className="mt-3 space-y-2">
                    {exp.highlights.map((point, i) => (
                      <li key={i} className="text-xs font-mono text-slate-300 flex items-start gap-2 leading-relaxed">
                        <span className="text-[var(--hud-primary)] text-sm">▹</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Sub-section */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--hud-primary)] uppercase tracking-widest mb-4">
              <GraduationCap className="w-4 h-4 text-[var(--hud-primary)]" />
              <span>ACADEMIC FOUNDATION & SPECIALIZATION</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => soundFX.playHover()}
                  className="hud-cut-corners p-4 border border-slate-800 bg-black/75 hover:border-[var(--hud-primary)] transition-all"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                    <span className="text-[var(--hud-primary)] font-bold">[{edu.hudCode}]</span>
                    <span className="px-1.5 py-0.5 bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold">
                      CGPA: {edu.cgpa}
                    </span>
                  </div>

                  <h4 className="text-xs font-hud font-bold text-white mb-1">
                    {edu.degree}
                  </h4>

                  <div className="text-[11px] font-mono text-slate-300 mb-1">
                    {edu.institution}
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 mb-3">
                    {edu.university} • {edu.period}
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                    <span className="text-slate-500">FOCUS: </span>
                    <span className="text-slate-300">{edu.specialization}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Certifications Dossier (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--hud-primary)] uppercase tracking-widest">
            <Award className="w-4 h-4 text-[var(--hud-primary)]" />
            <span>VERIFIED CYBERSECURITY CREDENTIALS</span>
          </div>

          <div className="space-y-3">
            {PORTFOLIO_DATA.certifications.map((cert, i) => (
              <div
                key={i}
                onMouseEnter={() => soundFX.playHover()}
                className="hud-corner-box p-4 border border-slate-800 bg-black/75 hover:border-[var(--hud-primary)] transition-all group"
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                  <span className="text-[var(--hud-primary)] font-bold tracking-wider">
                    [{cert.credentialId}]
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    {cert.status}
                  </span>
                </div>

                <h4 className="text-xs font-hud font-bold text-white group-hover:text-[var(--hud-primary)] transition-colors leading-snug">
                  {cert.title}
                </h4>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-1 mb-2">
                  <span className="text-slate-300">{cert.issuer}</span>
                  <span className="text-[10px] text-slate-500">{cert.date}</span>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
                  <span className="text-slate-500">DOMAINS: </span>
                  <span className="text-cyan-300/80">{cert.skillsGained}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ATS Compliance Certificate Summary Card */}
          <div className="p-4 bg-gradient-to-r from-cyan-950/40 via-black to-blue-950/40 border border-[var(--hud-border)] font-mono text-xs text-slate-300">
            <div className="flex items-center gap-2 text-[var(--hud-primary)] font-bold mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>ATS AUDIT SCORE: 98/100</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Resume structured with standardized headers, verified metrics, actionable impact statements, and exact MITRE/OWASP cybersecurity identifiers.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
