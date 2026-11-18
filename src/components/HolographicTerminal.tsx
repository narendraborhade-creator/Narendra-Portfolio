import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal as TerminalIcon, 
  X, 
  Send, 
  Sparkles, 
  Cpu, 
  Key
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundFX } from '../utils/soundEffects';

interface HolographicTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistoryItem {
  type: 'user' | 'system' | 'error' | 'success';
  text: string;
  timestamp: string;
}

export const HolographicTerminal: React.FC<HolographicTerminalProps> = ({
  isOpen,
  onClose,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      type: 'system',
      text: 'AEGIS-CYBER-CORE v2.6 // NEURAL INTERFACE ONLINE',
      timestamp: 'INIT',
    },
    {
      type: 'system',
      text: 'Welcome to Narendra Borhade\'s Holographic Portfolio Terminal. Type "help" or ask any question regarding SOC experience, SIEM log analysis, or VAPT labs.',
      timestamp: 'READY',
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const getISTTime = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
  };

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    soundFX.playKey();
    const time = getISTTime();

    // Add user command to history
    setHistory((prev) => [...prev, { type: 'user', text: `$ ${trimmed}`, timestamp: time }]);
    setInputVal('');
    setIsProcessing(true);

    const lower = trimmed.toLowerCase();

    // Built-in Cyber Terminal Commands
    setTimeout(async () => {
      let responseText = '';
      let resType: 'system' | 'success' | 'error' = 'system';

      if (lower === 'help') {
        responseText = `AVAILABLE COMMANDS:
  help          - Show this command reference matrix
  identity      - Display Narendra Borhade's dossier & clearance
  skills        - List technical competencies (SOC, VAPT, AI Tooling)
  splunk        - Splunk BOTS v1 dataset analysis metrics
  offsec        - OffSec Stapler Linux exploitation kill chain
  projects      - Display major projects & live URLs
  experience    - Summarize internships at Codec Tech & CodeAlpha
  certifications- Display verified cybersecurity credentials
  scan          - Run tactical passive threat scan simulator
  clear         - Clear terminal display buffer
  exit          - Close holographic interface

NATURAL LANGUAGE AI:
  You can also type questions freely (e.g., "Why hire Narendra as a SOC Analyst?", "What is Aegis 3D Safe Browser?").`;
        resType = 'success';
      } else if (lower === 'clear') {
        setHistory([]);
        setIsProcessing(false);
        return;
      } else if (lower === 'exit') {
        onClose();
        setIsProcessing(false);
        return;
      } else if (lower === 'identity') {
        responseText = `CANDIDATE DOSSIER:
Name: ${PORTFOLIO_DATA.personal.name}
Role: ${PORTFOLIO_DATA.personal.title}
Location: ${PORTFOLIO_DATA.personal.location}
Education: MCA Cyber Security (NMIET Pune, 7.8 CGPA) | BCA (DY Patil, 7.5 CGPA)
Status: Active Candidate / Available for SOC & AppSec Engineering Roles.`;
        resType = 'success';
      } else if (lower === 'skills') {
        responseText = `TACTICAL COMPETENCIES:
1. SOC & SIEM: Splunk Enterprise, SPL Queries, Wireshark, Deep Packet Inspection (DPI), MITRE ATT&CK, Snort IDS.
2. VAPT & AppSec: OWASP Top 10, Nmap, smbclient, enum4linux, LFI, SQLi, XSS, PrivEsc, DNS Security (DMARC/SPF).
3. Languages & Frameworks: Python 3, TypeScript, JavaScript, FastAPI, React, Node.js, Three.js, Gemini API.
4. Systems & Cloud: GCP, Linux (Debian/RHEL), Docker, Git, PostgreSQL, MongoDB, SHA-256 Forensics.`;
        resType = 'success';
      } else if (lower === 'splunk') {
        responseText = `SPLUNK ENTERPRISE SIEM LAB:
• Dataset: 360,000+ Boss of the SOC (BOTS v1) events.
• Attack Detection: Automated Acunetix scanners, Blind SQLi, reflected XSS, brute force floods.
• Correlation: Correlated Wireshark PCAPs with endpoint Apache & Suricata logs to build attack timelines.`;
        resType = 'success';
      } else if (lower === 'offsec') {
        responseText = `OFFSEC PROVING GROUNDS (STAPLER BOX):
• Recon: Nmap TCP/UDP port mapping + SMB enum4linux RID user enumeration.
• Foothold: Vulnerable WordPress Advanced Video Embedder plugin -> LFI config leak (wp-config.php).
• RCE: MySQL direct auth -> INTO OUTFILE PHP shell drop on port 12380.
• Root: .bash_history inspection -> Sudo privileges escalation -> UID=0(root) confirmed.`;
        resType = 'success';
      } else if (lower === 'projects') {
        responseText = `FEATURED SYSTEMS:
1. Aegis 3D Safe Browser: 3D security browser with SSRF sandbox & Gemini 2.5 AI Copilot [https://aegisscans.dev]
2. Splunk BOTS SIEM Lab: 360k+ event threat hunting & forensic reconstruction.
3. Bug-Hunter & Net-Visual-Analyzer: AI static analysis + DMARC/SPF posture validator.
4. OSINT Scanner & ML IDS: Multi-source OSINT + Isolation Forest anomaly detection.
5. Manga.for-me: Privacy-centric reader with anti-tracking proxy [https://manga-for-me.vercel.app]`;
        resType = 'success';
      } else if (lower === 'experience') {
        responseText = `MISSION LOGS:
• Codec Technologies (Jul-Sep 2026): Cyber Security Intern - Deep packet inspection, Wireshark traffic analysis, log triage.
• CodeAlpha (Jan 2026): Cyber Security Intern - Attack surface assessment, defensive vulnerability mitigation.
• Sqrock IT Solutions & NextGen AI (2025-2026): Python automation scripting & technical communication.`;
        resType = 'success';
      } else if (lower === 'certifications') {
        responseText = `VERIFIED CERTIFICATIONS:
1. SOC Analyst & Cyber Security Fundamentals (Codec Tech, 47h 56m)
2. Trust and Security with Google Cloud (Simplilearn SkillUp)
3. Protection from Browser Attacks & System Security (Vodafone Idea / VOIS)
4. Ethical Hacking & Cyber Security (Google Developers Launchpad)
5. Ethical Hacking Workshop (VaultofCodes)`;
        resType = 'success';
      } else if (lower.startsWith('scan')) {
        responseText = `[INITIATING TACTICAL PASSIVE SCAN]
Target: 192.168.1.1 // aegisscans.dev
[+] Checking DNS Records (A, MX, TXT)... RESOLVED
[+] Checking DMARC / SPF Posture... PASS (v=DMARC1; p=reject)
[+] Inspecting HTTP Headers... HSTS=Enabled, CSP=Active, X-Frame-Options=DENY
[+] SSRF Sandbox Health: OPTIMAL
RESULT: No critical anomalies detected. Posture Score: 96/100 (SECURE)`;
        resType = 'success';
      } else if (lower.includes('hire') || lower.includes('why') || lower.includes('soc') || lower.includes('value')) {
        responseText = `ASSESSMENT: WHY HIRE NARENDRA BORHADE FOR SOC ANALYST / SEC ENG:
1. Hands-on SIEM Experience: Not just theory - analyzed 360,000+ real-world BOTS events in Splunk with custom SPL queries.
2. Offensive + Defensive Synergy: Understands how attackers pivot (demonstrated via Stapler LFI->MySQL RCE->Root), enabling faster detection and root-cause analysis.
3. Builder Mindset: Writes production Python automation, FastAPI security microservices, and integrated Google Gemini API into live applications like Aegis 3D Safe Browser.
4. Strong Academic Foundation: MCA in Cyber Security with a 7.8/10 CGPA.`;
        resType = 'success';
      } else if (lower.includes('contact') || lower.includes('email') || lower.includes('phone')) {
        responseText = `TRANSMISSION DETAILS:
• Email: narendra.via.mail@gmail.com
• Phone: +91 8503041687
• LinkedIn: https://www.linkedin.com/in/narendra-borhade-developer
• GitHub: https://github.com/Creator-Naren`;
        resType = 'success';
      } else {
        // Natural Language Synthesis or Gemini query
        if (apiKey) {
          try {
            // Live Gemini API call if key is provided
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{
                  parts: [{
                    text: `You are AEGIS-CYBER-CORE, the futuristic HUD holographic AI assistant for Narendra Borhade (Cybersecurity Specialist & SOC Analyst). Answer the following query in a concise, authoritative, cyberpunk HUD tone using Narendra's resume context:
Resume Summary: ${PORTFOLIO_DATA.personal.summary}
Projects: ${JSON.stringify(PORTFOLIO_DATA.projects.map(p => ({ title: p.title, desc: p.description })))}
Skills: ${JSON.stringify(PORTFOLIO_DATA.skills)}
User Query: "${trimmed}"`
                  }]
                }]
              })
            });

            if (response.ok) {
              const data = await response.json();
              responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from neural core.';
              resType = 'success';
            } else {
              responseText = `[GEMINI API STATUS: ${response.status}] Falling back to local neural heuristics...
Query processed: "${trimmed}". Narendra specializes in Splunk SIEM log correlation, Wireshark DPI, OffSec offensive labs, and Python/AI security tooling. Type "help" for structured commands.`;
            }
          } catch {
            responseText = `Local Neural Core Response: Narendra Borhade is an MCA Cyber Security specialist skilled in Splunk Enterprise, Wireshark, penetration testing, and AI security tooling. (Try asking about his projects, SIEM experience, or Stapler lab).`;
          }
        } else {
          responseText = `AEGIS-CYBER-CORE HEURISTIC MATCH:
Query received: "${trimmed}"
Narendra Vijay Borhade is an SOC Analyst & Cyber Security specialist (MCA, 7.8 CGPA) with hands-on expertise in Splunk (360k+ BOTS events), Wireshark packet inspection, OffSec Proving Grounds exploitation, and AI security engineering (Aegis 3D Safe Browser).
Type "help" to view specific command modules or ask about "splunk", "offsec", or "projects".`;
        }
      }

      setHistory((prev) => [...prev, { type: resType, text: responseText, timestamp: getISTTime() }]);
      soundFX.playClick();
      setIsProcessing(false);
    }, 250);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      {/* Holographic HUD Terminal Window */}
      <div className="w-full max-w-4xl h-[620px] max-h-[92vh] flex flex-col hud-corner-box border-2 border-[var(--hud-primary)] bg-black/95 shadow-[0_0_60px_rgba(0,243,255,0.25)] relative overflow-hidden">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-[var(--hud-border)] select-none">
          <div className="flex items-center gap-2.5">
            <TerminalIcon className="w-4 h-4 text-[var(--hud-primary)] animate-pulse" />
            <span className="font-hud text-xs sm:text-sm font-bold text-white tracking-wider">
              AEGIS-CYBER-CORE // HOLOGRAPHIC AI CONSOLE
            </span>
            <span className="hidden sm:inline px-1.5 py-0.2 bg-[var(--hud-primary)]/15 border border-[var(--hud-primary)]/40 text-[9px] font-mono text-[var(--hud-primary)]">
              TLS 1.3
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              className="text-[10px] font-mono text-slate-400 hover:text-[var(--hud-primary)] flex items-center gap-1 border border-slate-800 px-2 py-0.5"
            >
              <Key className="w-3 h-3 text-cyan-400" />
              <span>{apiKey ? 'GEMINI KEY: ACTIVE' : 'SET GEMINI KEY'}</span>
            </button>

            <button
              onClick={() => {
                soundFX.playClick();
                onClose();
              }}
              className="p-1 text-slate-400 hover:text-red-400 hover:bg-red-950/40 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Optional Gemini API Key Drawer */}
        {showApiKeyInput && (
          <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center gap-2 text-xs font-mono">
            <Sparkles className="w-4 h-4 text-[var(--hud-primary)] shrink-0" />
            <span className="text-slate-300 shrink-0">Google Gemini API Key:</span>
            <input
              type="password"
              placeholder="Paste AI Studio Key (optional for live LLM mode)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1 bg-black border border-slate-700 px-2 py-1 text-cyan-300 font-mono text-xs outline-none focus:border-[var(--hud-primary)]"
            />
            <button
              onClick={() => setShowApiKeyInput(false)}
              className="px-2 py-1 bg-[var(--hud-primary)] text-black font-bold text-[10px]"
            >
              CONFIRM
            </button>
          </div>
        )}

        {/* Terminal Output Log Area */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-3 hologram-scanline">
          {history.map((item, idx) => (
            <div key={idx} className="leading-relaxed">
              {item.type === 'user' ? (
                <div className="text-[var(--hud-primary)] font-bold flex items-start gap-2">
                  <span className="text-slate-500 text-[10px] select-none">[{item.timestamp}]</span>
                  <span>{item.text}</span>
                </div>
              ) : item.type === 'error' ? (
                <div className="text-red-400 pl-4 border-l-2 border-red-500 whitespace-pre-wrap">
                  {item.text}
                </div>
              ) : item.type === 'success' ? (
                <div className="text-emerald-300 pl-4 border-l-2 border-emerald-500 whitespace-pre-wrap bg-emerald-950/10 py-1">
                  {item.text}
                </div>
              ) : (
                <div className="text-slate-300 whitespace-pre-wrap pl-4 border-l-2 border-slate-700">
                  {item.text}
                </div>
              )}
            </div>
          ))}

          {isProcessing && (
            <div className="text-[var(--hud-primary)] font-mono text-xs flex items-center gap-2 animate-pulse pl-4">
              <Cpu className="w-3.5 h-3.5 animate-spin" />
              <span>INTERROGATING CYBER KNOWLEDGE BASE...</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick Command Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-950/90 border-t border-slate-800 flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
          <span className="text-slate-500">QUICK CMDS:</span>
          {['help', 'identity', 'splunk', 'offsec', 'skills', 'projects', 'experience', 'contact', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 py-0.5 bg-black border border-slate-800 text-slate-300 hover:text-[var(--hud-primary)] hover:border-[var(--hud-primary)] transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Input Bar */}
        <div className="p-3 bg-black border-t border-[var(--hud-border)] flex items-center gap-2">
          <span className="text-[var(--hud-primary)] font-mono font-bold pl-2">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command (help, splunk, offsec) or natural question..."
            className="flex-1 bg-transparent text-cyan-200 font-mono text-xs sm:text-sm outline-none placeholder:text-slate-600"
          />
          <button
            onClick={() => handleCommand(inputVal)}
            disabled={!inputVal.trim() || isProcessing}
            className="px-3 py-1.5 bg-[var(--hud-primary)] text-black font-hud text-xs font-bold flex items-center gap-1.5 hover:bg-white transition-all disabled:opacity-40"
          >
            <Send className="w-3 h-3" />
            <span className="hidden sm:inline">DISPATCH</span>
          </button>
        </div>

      </div>
    </div>
  );
};
