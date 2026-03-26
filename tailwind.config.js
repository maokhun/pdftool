/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 45px -25px rgba(15, 23, 42, 0.25)",
        card: "0 12px 30px -20px rgba(15, 23, 42, 0.4)"
      },
      colors: {
        cloud: "#f5f7fb",
        ink: "#0f172a",
        slate: {
          650: "#334155"
        }
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(59, 130, 246, 0.25)" },
          "50%": { boxShadow: "0 0 0 10px rgba(59, 130, 246, 0)" }
        }
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out both",
        "float-slow": "floatSlow 7s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
