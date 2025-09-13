import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        background: {
          DEFAULT: "hsl(var(--background))",
          secondary: "hsl(var(--background-secondary))",
          tertiary: "hsl(var(--background-tertiary))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          secondary: "hsl(var(--foreground-secondary))",
          muted: "hsl(var(--foreground-muted))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        neon: {
          blue: "hsl(var(--neon-blue))",
          bright: "hsl(var(--neon-blue-bright))",
          dim: "hsl(var(--neon-blue-dim))",
          glow: "hsl(var(--neon-blue-glow))",
        },
        glass: {
          bg: "hsl(var(--glass-bg))",
          border: "hsl(var(--glass-border))",
          highlight: "hsl(var(--glass-highlight))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          border: "hsl(var(--card-border))",
        },
        input: {
          DEFAULT: "hsl(var(--input))",
          border: "hsl(var(--input-border))",
          focus: "hsl(var(--input-focus))",
        },
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-glass': 'var(--gradient-glass)',
        'gradient-bg': 'var(--gradient-bg)',
        'gradient-glow': 'var(--gradient-glow)',
      },
      boxShadow: {
        'glass': 'var(--shadow-glass)',
        'glass-hover': 'var(--shadow-glass-hover)',
        'glow': 'var(--glow-primary)',
        'glow-soft': 'var(--glow-soft)',
      },
      backdropBlur: {
        'glass': 'var(--blur-glass)',
        'strong': 'var(--blur-strong)',
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius)",
        sm: "calc(var(--radius) / 2)",
        xl: "var(--radius-xl)",
      },
      transitionTimingFunction: {
        'smooth': 'var(--ease-smooth)',
        'bounce': 'var(--ease-bounce)',
      },
      transitionDuration: {
        'fast': 'var(--duration-fast)',
        'normal': 'var(--duration-normal)',
        'slow': 'var(--duration-slow)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" }
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(40px)", filter: "blur(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(60px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "var(--glow-soft)" },
          "50%": { boxShadow: "var(--glow-primary)" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" }
        },
        "slide-left": {
          "0%": { transform: "translateX(40px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" }
        },
        "blur-clear": {
          "0%": { filter: "blur(10px)", opacity: "0" },
          "100%": { filter: "blur(0)", opacity: "1" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-up": "fade-up 0.5s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "slide-left": "slide-left 0.5s ease-out",
        "blur-clear": "blur-clear 0.6s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
