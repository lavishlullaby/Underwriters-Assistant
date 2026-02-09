import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-bg-from))",
          foreground: "hsl(var(--sidebar-foreground))",
          muted: "hsl(var(--sidebar-muted))",
          border: "hsl(var(--sidebar-border))",
          accent: "hsl(var(--sidebar-accent))",
        },
        ai: {
          surface: "hsl(var(--ai-surface))",
          "surface-foreground": "hsl(var(--ai-surface-foreground))",
        },
        status: {
          green: "hsl(var(--status-green))",
          yellow: "hsl(var(--status-yellow))",
          red: "hsl(var(--status-red))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      boxShadow: {
        "card-sm": "0 2px 8px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.02)",
        "card-md": "0 4px 20px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.02)",
        "card-lg": "0 8px 30px rgba(0,0,0,0.05), 0 4px 10px rgba(0,0,0,0.02)",
        "warm": "0 4px 20px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.02)",
        "warm-hover": "0 8px 30px rgba(0,0,0,0.06), 0 4px 10px rgba(0,0,0,0.03)",
        "urgent": "0 4px 12px rgba(239,68,68,0.15)",
        "warning": "0 4px 12px rgba(245,158,11,0.15)",
        "info": "0 4px 12px rgba(59,130,246,0.15)",
        "ai-glow": "0 0 20px rgba(139,92,246,0.15)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
