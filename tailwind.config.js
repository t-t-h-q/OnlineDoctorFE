/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  darkMode: 'class',
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Add paths to your project files
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#A0C4FF", // lighter shade
          DEFAULT: "#1D4ED8", // main primary color
          dark: "#1E40AF", // darker shade
        },
        secondary: {
          light: "#FDE68A",
          DEFAULT: "#F59E0B",
          dark: "#B45309",
        },
        accent: {
          light: "#34D399",
          DEFAULT: "#10B981",
          dark: "#047857",
        },
        neutral: {
          light: "#F3F4F6",
          DEFAULT: "#9CA3AF",
          dark: "#1F2937",
        },
        background: "#F9FAFB", // Background color for the site
        text: "#111827", // Default text color
      },
    },
  },
  plugins: [],
  important: true,
}

