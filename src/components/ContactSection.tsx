import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Copy, 
  Check, 
  ShieldCheck, 
  Radio, 
  Lock,
  ExternalLink
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundFX } from '../utils/soundEffects';

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [category, setCategory] = useState('Recruitment / Full-Time Opportunity');
  const [message, setMessage] = useState('');
  const [transmitting, setTransmitting] = useState(false);
  const [transmitted, setTransmitted] = useState(false);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    soundFX.playSuccess();
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !message) return;

    soundFX.playScan();
    setTransmitting(true);

    setTimeout(() => {
      setTransmitting(false);
      setTransmitted(true);
      soundFX.playSuccess();

      // Formulate mailto link
      const subject = encodeURIComponent(`[SECURITY COMM] ${category} - From: ${senderName || 'Recruiter'}`);
      const body = encodeURIComponent(`Sender Name: ${senderName}\nSender Email: ${senderEmail}\nCategory: ${category}\n\nMessage:\n${message}`);
      window.open(`mailto:${PORTFOLIO_DATA.personal.email}?subject=${subject}&body=${body}`, '_blank');
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[var(--hud-border)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--hud-primary)] uppercase tracking-widest">
            <span className="w-2 h-2 bg-[var(--hud-primary)]" />
            <span>MODULE // 06: ENCRYPTED TRANSMISSION PORTAL</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-hud font-extrabold text-white mt-1">
            INITIATE SECURE COMMS
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            Open for SOC Analyst, Application Security, and Security Engineering opportunities.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono text-[var(--hud-primary)]">
          <Radio className="w-4 h-4 animate-pulse" />
          <span>FREQUENCY 2.404 GHz // READY FOR INGESTION</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Direct Tactical Contact Nodes (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
            // AUTHORIZED CONTACT CHANNELS:
          </div>

          {/* Email Card */}
          <div className="hud-corner-box p-4 border border-slate-800 bg-black/75 hover:border-[var(--hud-primary)] transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span className="flex items-center gap-2 text-[var(--hud-primary)]">
                <Mail className="w-4 h-4" />
                <span>PRIMARY EMAIL GATEWAY</span>
              </span>
              <button
                onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.email, 'email')}
                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 border border-slate-700 px-1.5 py-0.5"
              >
                {copiedField === 'email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedField === 'email' ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="text-sm font-mono text-white hover:text-[var(--hud-primary)] transition-colors break-all font-semibold"
            >
              {PORTFOLIO_DATA.personal.email}
            </a>
          </div>

          {/* Phone Card */}
          <div className="hud-corner-box p-4 border border-slate-800 bg-black/75 hover:border-[var(--hud-primary)] transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span className="flex items-center gap-2 text-[var(--hud-primary)]">
                <Phone className="w-4 h-4" />
                <span>DIRECT SECURE LINE</span>
              </span>
              <button
                onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.phone, 'phone')}
                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 border border-slate-700 px-1.5 py-0.5"
              >
                {copiedField === 'phone' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedField === 'phone' ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
            <a
              href={`tel:${PORTFOLIO_DATA.personal.phone}`}
              className="text-sm font-mono text-white hover:text-[var(--hud-primary)] transition-colors font-semibold"
            >
              {PORTFOLIO_DATA.personal.phone}
            </a>
          </div>

          {/* Location Card */}
          <div className="hud-corner-box p-4 border border-slate-800 bg-black/75">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--hud-primary)] mb-1">
              <MapPin className="w-4 h-4" />
              <span>GEOGRAPHIC BASE</span>
            </div>
            <div className="text-sm font-mono text-white font-semibold">
              {PORTFOLIO_DATA.personal.location}
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-1">
              Open to Pune / Mumbai / Remote / Relocation opportunities.
            </div>
          </div>

          {/* External Networks */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playClick()}
              className="p-3 bg-black/70 border border-slate-800 hover:border-[var(--hud-primary)] transition-all flex items-center justify-between text-xs font-mono group"
            >
              <div className="flex items-center gap-2 text-slate-300 group-hover:text-white">
                <Linkedin className="w-4 h-4 text-cyan-400" />
                <span>LinkedIn</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-[var(--hud-primary)]" />
            </a>

            <a
              href={PORTFOLIO_DATA.personal.githubPrimary}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFX.playClick()}
              className="p-3 bg-black/70 border border-slate-800 hover:border-[var(--hud-primary)] transition-all flex items-center justify-between text-xs font-mono group"
            >
              <div className="flex items-center gap-2 text-slate-300 group-hover:text-white">
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-[var(--hud-primary)]" />
            </a>
          </div>

        </div>

        {/* Right Column: Encrypted Transmission Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="hud-corner-box p-6 border-2 border-[var(--hud-border)] bg-black/90 shadow-[0_0_40px_rgba(0,243,255,0.1)]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-5 text-xs font-mono">
              <div className="flex items-center gap-2 text-white font-bold">
                <Lock className="w-4 h-4 text-[var(--hud-primary)]" />
                <span>TRANSMISSION DISPATCH PROTOCOL</span>
              </div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>AES-256 DISPATCH ACTIVE</span>
              </div>
            </div>

            {transmitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 font-mono">
                <div className="w-12 h-12 bg-emerald-950 border border-emerald-500 rounded-none flex items-center justify-center text-emerald-400 animate-pulse">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-hud font-bold text-white">
                  TRANSMISSION PACKET DISPATCHED
                </h3>
                <p className="text-xs text-slate-300 max-w-md">
                  Your message has been formulated and dispatched to Narendra Borhade's primary inbox. You may also connect directly on LinkedIn.
                </p>
                <button
                  onClick={() => setTransmitted(false)}
                  className="mt-4 px-4 py-2 border border-slate-700 text-xs text-slate-400 hover:text-white"
                >
                  TRANSMIT ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleTransmit} className="space-y-4 font-mono text-xs">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">
                      OPERATOR / RECRUITER NAME:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Vance"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-white outline-none focus:border-[var(--hud-primary)] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">
                      RETURN COMMUNICATION EMAIL:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. recruiter@enterprise.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-white outline-none focus:border-[var(--hud-primary)] transition-colors"
                    />
                  </div>
                </div>

                {/* Category Selector */}
                <div>
                  <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">
                    TRANSMISSION CLASSIFICATION:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-slate-200 outline-none focus:border-[var(--hud-primary)] transition-colors"
                  >
                    <option value="Recruitment / Full-Time Opportunity">Recruitment / Full-Time Opportunity (SOC / AppSec)</option>
                    <option value="Internship / Research Project">Internship / Research Project</option>
                    <option value="Security Consultation / VAPT">Security Consultation / VAPT</option>
                    <option value="Technical Collaboration">Technical Collaboration / AI Tooling</option>
                  </select>
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1">
                    TRANSMISSION PAYLOAD (MESSAGE):
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Enter mission parameters, role description, or inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 p-3 text-white outline-none focus:border-[var(--hud-primary)] transition-colors leading-relaxed"
                  />
                </div>

                {/* Transmit Button */}
                <button
                  type="submit"
                  disabled={transmitting}
                  onMouseEnter={() => soundFX.playHover()}
                  className="w-full py-3 bg-[var(--hud-primary)] text-black font-hud text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[0_0_20px_var(--hud-glow)] disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {transmitting ? 'ENCRYPTING AND ROUTING PACKET...' : 'DISPATCH SECURE TRANSMISSION'}
                  </span>
                </button>

              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
