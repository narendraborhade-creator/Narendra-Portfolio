/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#030712',
          surface: '#070f22',
          panel: 'rgba(8, 17, 36, 0.85)',
          border: 'rgba(0, 243, 255, 0.25)',
          cyan: '#00f3ff',
          teal: '#0df',
          blue: '#1e66f5',
          green: '#00ff88',
          purple: '#9d4edd',
          magenta: '#ff007f',
          amber: '#ffaa00',
          red: '#ff1744',
          dim: '#4a628a',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
        hud: ['"Orbitron"', '"Rajdhani"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'hud-cyan': '0 0 20px rgba(0, 243, 255, 0.35), inset 0 0 15px rgba(0, 243, 255, 0.15)',
        'hud-green': '0 0 20px rgba(0, 255, 136, 0.35), inset 0 0 15px rgba(0, 255, 136, 0.15)',
        'hud-red': '0 0 20px rgba(255, 23, 68, 0.4), inset 0 0 15px rgba(255, 23, 68, 0.2)',
        'hud-amber': '0 0 20px rgba(255, 170, 0, 0.4), inset 0 0 15px rgba(255, 170, 0, 0.15)',
        'hologram': '0 8px 32px 0 rgba(0, 243, 255, 0.18)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin-reverse 25s linear infinite',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'flicker': 'flicker 0.15s infinite',
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 8px rgba(0, 243, 255, 0.6))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 18px rgba(0, 243, 255, 0.95))' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
      },
    },
  },
  plugins: [],
}
