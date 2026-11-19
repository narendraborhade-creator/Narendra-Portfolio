# Narendra Vijay Borhade // HUD Cyber Portfolio & Android App

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-00f3ff?style=for-the-badge&logo=github)](https://narendraborhade-creator.github.io/Narendra-Portfolio/)
[![React](https://img.shields.io/badge/React%2018-black?style=for-the-badge&logo=react&logoColor=00f3ff)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-3D%20Core-black?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite%206-black?style=for-the-badge&logo=vite&logoColor=646CFF)](https://vitejs.dev/)
[![Jetpack Compose](https://img.shields.io/badge/Android-Jetpack%20Compose-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://developer.android.com/compose)
[![Splunk](https://img.shields.io/badge/Splunk%20Enterprise-360k+%20BOTS-black?style=for-the-badge&logo=splunk)](https://www.splunk.com/)

> **SOC Analyst & Cybersecurity Specialist | VAPT & AppSec | Python & AI Security Tooling**  
> MCA in Cyber Security (NMIET Pune, 7.8 CGPA) | BCA (DY Patil, 7.5 CGPA)

---

## 🌐 Live Demonstrations

* **GitHub Pages Web Portal:** [https://narendraborhade-creator.github.io/Narendra-Portfolio/](https://narendraborhade-creator.github.io/Narendra-Portfolio/)
* **Aegis 3D Safe Browser (Live):** [https://aegisscans.dev](https://aegisscans.dev)
* **Manga.for-me Privacy Reader (Live):** [https://manga-for-me.vercel.app](https://manga-for-me.vercel.app)
* **LinkedIn:** [https://www.linkedin.com/in/narendra-borhade-developer](https://www.linkedin.com/in/narendra-borhade-developer)
* **GitHub Primary:** [https://github.com/Creator-Naren](https://github.com/Creator-Naren)
* **GitHub Secondary:** [https://github.com/narendraborhade-creator](https://github.com/narendraborhade-creator)

---

## ⚡ Architecture & Features

### 1. 3D Web Application (`src/`)
* **3D Holographic Core (`HologramCanvas.tsx`)**: Interactive Three.js wireframe icosahedron, dodecahedron nucleus, orbital scan rings, and 280+ particle data cloud reacting to cursor parallax.
* **21st.dev UI Elements**:
  * **Card3D**: 3D tilt physics with cursor spotlight gradient and `prefers-reduced-motion` compliance.
  * **BentoGrid**: Asymmetric HUD telemetry radar featuring simulated live packet streams (`Suricata IDS + Wireshark DPI`).
  * **CyberDock**: macOS/Mobbin-styled floating dock with magnification and keyboard focus tooltips.
  * **CyberMatrixCanvas**: Interactive particle matrix with holographic laser vector connections.
* **Interactive Splunk BOTS v1 Lab (`SiemLabExplorer.tsx`)**:
  * Real SPL hunting queries across **360,000+ indexed events**.
  * Detection for Acunetix scans, blind SQLi, reflected XSS, and Wireshark PCAP + Snort IDS alert fusion.
* **OffSec Proving Grounds: Stapler Box Root Chain**:
  * Step-by-step kill chain: Nmap/SMB recon $\rightarrow$ WordPress LFI config leak $\rightarrow$ MySQL `INTO OUTFILE` RCE $\rightarrow$ Root shell (`uid=0`).
* **AEGIS-CYBER-CORE AI Terminal (`HolographicTerminal.tsx`)**:
  * Embedded holographic terminal with natural language QA and Google Gemini 2.0 Flash API integration.
* **Procedural Web Audio Engine (`soundEffects.ts`)**:
  * Procedural synthesizer generating tactile clicks, scan sweeps, DEFCON alert warbles, and target lock chimes without external audio assets.

### 2. Native Android Application (`android/`)
* Built with **Kotlin** and **Jetpack Compose** (Material 3) under `android/`.
* Includes the complete HUD dossier screen, telemetry chips, project directory, and SIEM queries with `@Preview` support.
* Production-ready Proguard rules and Gradle configuration.

### 3. Multi-Agent & Cloud Services (`src/services/`)
* **Google Antigravity SDK Swarm (`antigravityAgent.ts`)**: Autonomous multi-agent coordination between `SOC-Analyst-Core`, `OffSec-Exploit-Researcher`, and `Portfolio-Copilot-Agent`.
* **Firebase Service (`firebase.ts`)**: Realtime telemetry logging and encrypted transmission storage.

---

## 🚀 Local Development

### Web Application
```bash
# Clone the repository
git clone https://github.com/narendraborhade-creator/Narendra-Portfolio.git
cd Narendra-Portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Android Application
1. Open the `android/` directory in **Android Studio**.
2. Sync Gradle dependencies.
3. Run on an emulator or physical device (Target SDK 34, Min SDK 26).

---

## 📜 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
