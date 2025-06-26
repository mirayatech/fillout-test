/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          50: "#eff6ff",
          500: "#2F72E2", // Brand blue
          600: "#2563eb",
        },
        // Gray scale
        gray: {
          50: "#FAFBFC",
          100: "#f3f4f6",
          200: "#E1E1E1",
          300: "#d1d5db",
          400: "#9DA4B2",
          500: "#677289",
          600: "#8C93A1",
          900: "#1A1A1A",
        },
        // Status colors
        danger: "#EF494F",
        success: "#10b981",
        warning: "#f59e0b",
      },
      boxShadow: {
        tab: "0px 1px 3px 0px rgba(0,0,0,0.04), 0px 1px 1px 0px rgba(0,0,0,0.02)",
        button:
          "0px 1px 3px 0px rgba(0,0,0,0.04), 0px 1px 1px 0px rgba(0,0,0,0.02)",
        menu: "0px 1px 3px rgba(0,0,0,0.04)",
        focus: "0 0 0 3px rgba(47,114,226,0.2)",
      },
      outlineWidth: {
        0.5: "0.5px",
      },
      outlineOffset: {
        "-0.5": "-0.5px",
      },
      borderWidth: {
        0.5: "0.5px",
      },
      height: {
        0.5: "0.5px",
        1.5: "1.5px",
      },
      width: {
        240: "240px",
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
