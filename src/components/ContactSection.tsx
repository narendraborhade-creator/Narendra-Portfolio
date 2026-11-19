import React, { useState, useEffect, useRef } from 'react';
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
  ExternalLink,
  RefreshCw,
  FileText,
  Sparkles,
  Layers
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundFX } from '../utils/soundEffects';

interface TransmissionReceipt {
  packetId: string;
  timestamp: string;
  senderName: string;
  senderEmail: string;
  category: string;
  message: string;
  dispatchMethod: 'gmail' | 'mailto';
}

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [category, setCategory] = useState('Recruitment / Full-Time Opportunity');
  const [message, setMessage] = useState('');
  const [dispatchMethod, setDispatchMethod] = useState<'gmail' | 'mailto'>('gmail');
  const [transmitting, setTransmitting] = useState(false);
  const [transmitted, setTransmitted] = useState(false);
  const [lastTransmission, setLastTransmission] = useState<TransmissionReceipt | null>(null);

  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transmitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      if (transmitTimeoutRef.current) clearTimeout(transmitTimeoutRef.current);
    };
  }, []);

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        soundFX.playSuccess();
        setCopiedField(fieldName);
        if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
        copyTimeoutRef.current = setTimeout(() => setCopiedField(null), 2000);
      }
    } catch (err) {
      console.warn('Clipboard write prevented or failed:', err);
    }
  };

  const generatePayload = (receipt: TransmissionReceipt) => {
    const subject = `[SECURITY COMM] ${receipt.category} - From: ${receipt.senderName}`;
    const bodyText = `SECURITY DISPATCH TELEMETRY\n---------------------------------------\nPACKET ID: ${receipt.packetId}\nTIMESTAMP: ${receipt.timestamp}\nSENDER NAME: ${receipt.senderName}\nSENDER EMAIL: ${receipt.senderEmail}\nCLASSIFICATION: ${receipt.category}\nDISPATCH CHANNEL: ${receipt.dispatchMethod === 'gmail' ? 'GOOGLE MAIL (GMAIL WEB)' : 'SYSTEM MAILTO PROTOCOL'}\n---------------------------------------\n\nMESSAGE PAYLOAD:\n${receipt.message}\n\n[End of Transmission - Sent via Narendra Borhade Cyber HUD]`;
    return { subject, bodyText };
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transmitting || !senderEmail || !message) return;

    soundFX.playScan();
    setTransmitting(true);

    const packetId = `SEC-PKT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const receipt: TransmissionReceipt = {
      packetId,
      timestamp,
      senderName: senderName.trim() || 'Anonymous Operator',
      senderEmail: senderEmail.trim(),
      category,
      message: message.trim(),
      dispatchMethod,
    };

    const { subject, bodyText } = generatePayload(receipt);

    transmitTimeoutRef.current = setTimeout(() => {
      setTransmitting(false);
      setTransmitted(true);
      setLastTransmission(receipt);
      soundFX.playSuccess();

      // Dispatch via chosen channel
      if (dispatchMethod === 'gmail') {
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PORTFOLIO_DATA.personal.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
        const win = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
        if (!win) {
          console.warn('Popup may have been blocked; fallback available in receipt modal.');
        }
      } else {
        const mailtoUrl = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
        const tempAnchor = document.createElement('a');
        tempAnchor.href = mailtoUrl;
        tempAnchor.target = '_self';
        document.body.appendChild(tempAnchor);
        tempAnchor.click();
        document.body.removeChild(tempAnchor);
      }

      // Clear input fields completely so details do not persist in form
      setSenderName('');
      setSenderEmail('');
      setMessage('');
      setCategory('Recruitment / Full-Time Opportunity');
    }, 1000);
  };

  const handleDirectGmailClick = () => {
    soundFX.playClick();
    const defaultSubject = encodeURIComponent('[SECURITY COMM] Recruitment / Ingestion Inquiry');
    const defaultBody = encodeURIComponent(`Hello Narendra,\n\nI reviewed your Cyber HUD Portfolio and would like to connect regarding:\n\nRole / Opportunity:\nCompany / Organization:\nTimeline:\n\nBest regards,\n`);
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PORTFOLIO_DATA.personal.email)}&su=${defaultSubject}&body=${defaultBody}`, '_blank', 'noopener,noreferrer');
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
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>// AUTHORIZED CONTACT CHANNELS:</span>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              ONLINE
            </span>
          </div>

          {/* Email Card with Direct Web Gmail Compose Action */}
          <div className="hud-corner-box p-4 border border-slate-800 bg-black/75 hover:border-[var(--hud-primary)] transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span className="flex items-center gap-2 text-[var(--hud-primary)] font-bold">
                <Mail className="w-4 h-4" />
                <span>PRIMARY EMAIL GATEWAY</span>
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.email, 'email')}
                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 border border-slate-700 px-1.5 py-0.5"
                aria-label="Copy primary email address to clipboard"
                title="Copy email to clipboard"
              >
                {copiedField === 'email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedField === 'email' ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
            
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="text-sm font-mono text-white hover:text-[var(--hud-primary)] transition-colors break-all font-semibold block my-1"
            >
              {PORTFOLIO_DATA.personal.email}
            </a>

            {/* Quick Action: Direct Gmail Web Compose */}
            <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Direct Web Dispatch:</span>
              </span>
              <button
                type="button"
                onClick={handleDirectGmailClick}
                className="text-[11px] font-mono text-[var(--hud-primary)] hover:text-white flex items-center gap-1.5 hover:underline"
              >
                <span>Compose in Gmail Web</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Phone Card */}
          <div className="hud-corner-box p-4 border border-slate-800 bg-black/75 hover:border-[var(--hud-primary)] transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span className="flex items-center gap-2 text-[var(--hud-primary)] font-bold">
                <Phone className="w-4 h-4" />
                <span>DIRECT SECURE LINE</span>
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.phone, 'phone')}
                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 border border-slate-700 px-1.5 py-0.5"
                aria-label="Copy phone number to clipboard"
                title="Copy phone to clipboard"
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
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--hud-primary)] mb-1 font-bold">
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
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile (opens in new tab)"
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
              rel="noopener noreferrer"
              aria-label="Visit primary GitHub profile (opens in new tab)"
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

          {/* Telemetry Indicator */}
          <div className="p-3 bg-slate-950/80 border border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>2FA Authenticated & Verified Cyber Profile Node</span>
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
              <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3 h-3" />
                <span>AES-256 DISPATCH ACTIVE</span>
              </div>
            </div>

            {transmitted && lastTransmission ? (
              /* High-Tech HUD Transmission Receipt with ARIA live region */
              <div 
                role="status" 
                aria-live="polite" 
                className="py-6 flex flex-col space-y-4 font-mono animate-fadeIn"
              >
                <div className="flex items-center gap-3 p-3 bg-emerald-950/40 border border-emerald-500/50">
                  <div className="w-10 h-10 bg-emerald-900 border border-emerald-400 flex items-center justify-center text-emerald-300 shrink-0">
                    <Check className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-hud font-bold text-white tracking-wide">
                      TRANSMISSION PACKET DISPATCHED // STATUS: VERIFIED
                    </h3>
                    <p className="text-[11px] text-emerald-300">
                      Form inputs cleared. Outbound packet successfully routed to Narendra's communication matrix.
                    </p>
                  </div>
                </div>

                {/* Packet Telemetry Details */}
                <div className="p-4 bg-slate-950/80 border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
                    <span className="text-slate-400">PACKET TELEMETRY ID:</span>
                    <span className="text-[var(--hud-primary)] font-bold">{lastTransmission.packetId}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">DISPATCH CHANNEL:</span>
                    <span className="text-amber-400 font-bold">
                      {lastTransmission.dispatchMethod === 'gmail' ? 'GOOGLE MAIL (GMAIL WEB COMPOSE)' : 'SYSTEM MAILTO PROTOCOL'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">INGESTION TARGET:</span>
                    <span className="text-white">{PORTFOLIO_DATA.personal.email}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">SENDER IDENTITY:</span>
                    <span className="text-slate-200">{lastTransmission.senderName} ({lastTransmission.senderEmail})</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">CLASSIFICATION:</span>
                    <span className="text-cyan-300">{lastTransmission.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">TIMESTAMP:</span>
                    <span className="text-slate-400">{lastTransmission.timestamp}</span>
                  </div>

                  {/* Message Preview */}
                  <div className="pt-2 border-t border-slate-800 mt-2">
                    <div className="text-[10px] text-slate-400 uppercase mb-1">PAYLOAD PREVIEW:</div>
                    <div className="p-2 bg-black/60 border border-slate-800/80 text-[11px] text-slate-300 font-mono max-h-24 overflow-y-auto whitespace-pre-wrap">
                      {lastTransmission.message}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {lastTransmission.dispatchMethod === 'gmail' && (
                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        const { subject, bodyText } = generatePayload(lastTransmission);
                        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PORTFOLIO_DATA.personal.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
                        window.open(gmailUrl, '_blank', 'noopener,noreferrer');
                      }}
                      className="px-3 py-2 bg-amber-500/20 border border-amber-500/50 text-amber-300 hover:bg-amber-500/30 text-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>RE-OPEN IN GMAIL WEB</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      const { subject, bodyText } = generatePayload(lastTransmission);
                      const summary = `SUBJECT: ${subject}\nRECIPIENT: ${PORTFOLIO_DATA.personal.email}\n${bodyText}`;
                      copyToClipboard(summary, 'packetSummary');
                    }}
                    className="px-3 py-2 bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs flex items-center justify-center gap-2 transition-all"
                    aria-label="Copy full transmission receipt to clipboard"
                  >
                    {copiedField === 'packetSummary' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'packetSummary' ? 'RECEIPT COPIED' : 'COPY TRANSMISSION RECEIPT'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playClick();
                      setTransmitted(false);
                      setLastTransmission(null);
                    }}
                    className="sm:col-span-2 px-4 py-2.5 bg-[var(--hud-primary)] text-black font-hud text-xs font-bold hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_var(--hud-glow)]"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>DISPATCH ANOTHER TRANSMISSION (NEW PACKET)</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleTransmit} className="space-y-4 font-mono text-xs">
                
                {/* Dispatch Channel Routing Options */}
                <fieldset className="p-3 bg-slate-950/70 border border-slate-800">
                  <legend className="text-[10px] text-slate-400 uppercase tracking-wider px-1 flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-[var(--hud-primary)]" />
                    <span>SELECT TRANSMISSION ROUTE:</span>
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                    <label 
                      className={`flex items-center gap-2 p-2 border cursor-pointer transition-all ${
                        dispatchMethod === 'gmail' 
                          ? 'border-[var(--hud-primary)] bg-[var(--hud-primary)]/10 text-white shadow-[0_0_10px_rgba(0,243,255,0.2)]' 
                          : 'border-slate-800 bg-black/40 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="dispatchMethod"
                        value="gmail"
                        checked={dispatchMethod === 'gmail'}
                        onChange={() => {
                          soundFX.playClick();
                          setDispatchMethod('gmail');
                        }}
                        className="accent-[var(--hud-primary)]"
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-[11px] text-slate-200">Gmail Web (Recommended)</span>
                        <span className="text-[9px] text-slate-400">Direct tab in browser, no blank page</span>
                      </div>
                    </label>

                    <label 
                      className={`flex items-center gap-2 p-2 border cursor-pointer transition-all ${
                        dispatchMethod === 'mailto' 
                          ? 'border-[var(--hud-primary)] bg-[var(--hud-primary)]/10 text-white shadow-[0_0_10px_rgba(0,243,255,0.2)]' 
                          : 'border-slate-800 bg-black/40 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="dispatchMethod"
                        value="mailto"
                        checked={dispatchMethod === 'mailto'}
                        onChange={() => {
                          soundFX.playClick();
                          setDispatchMethod('mailto');
                        }}
                        className="accent-[var(--hud-primary)]"
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-[11px] text-slate-200">System Mail Client</span>
                        <span className="text-[9px] text-slate-400">Triggers Outlook, Mail, or native app</span>
                      </div>
                    </label>
                  </div>
                </fieldset>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label 
                      htmlFor="senderName"
                      className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1"
                    >
                      OPERATOR / RECRUITER NAME:
                    </label>
                    <input
                      id="senderName"
                      name="senderName"
                      type="text"
                      autoComplete="name"
                      maxLength={100}
                      required
                      placeholder="e.g. Alex Vance"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 px-3 py-2 text-white outline-none focus:border-[var(--hud-primary)] transition-colors"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="senderEmail"
                      className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1"
                    >
                      RETURN COMMUNICATION EMAIL:
                    </label>
                    <input
                      id="senderEmail"
                      name="senderEmail"
                      type="email"
                      autoComplete="email"
                      maxLength={120}
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
                  <label 
                    htmlFor="transmissionCategory"
                    className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1"
                  >
                    TRANSMISSION CLASSIFICATION:
                  </label>
                  <select
                    id="transmissionCategory"
                    name="category"
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
                  <label 
                    htmlFor="transmissionPayload"
                    className="block text-slate-400 uppercase text-[10px] tracking-wider mb-1"
                  >
                    TRANSMISSION PAYLOAD (MESSAGE):
                  </label>
                  <textarea
                    id="transmissionPayload"
                    name="message"
                    required
                    rows={4}
                    maxLength={2500}
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

                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    <span>Inputs are securely cleaned upon dispatch</span>
                  </span>
                  <span>TARGET: {PORTFOLIO_DATA.personal.email}</span>
                </div>

              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};