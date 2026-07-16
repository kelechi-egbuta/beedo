/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#16213E",
        paper: "#F5F6F8",
        surface: "#FFFFFF",
        line: "#E4E7EE",
        coral: {
          DEFAULT: "#FF6B4A",
          dark: "#E8532F",
        },
        stage: {
          new: "#64748B",
          contacted: "#3B82F6",
          qualified: "#8B5CF6",
          proposal: "#E8A33D",
          won: "#1F9D55",
          lost: "#EF4444",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
