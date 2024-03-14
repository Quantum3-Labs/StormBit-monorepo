import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./utils/**/*.{js,ts,jsx,tsx}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
];
export const plugins = [require("daisyui"), nextui()];
export const daisyui = {
  themes: [
    {
      scaffoldEth: {
        primary: "#93BBFB",
        "primary-content": "#212638",
        accent: "#93BBFB",
        "accent-content": "#212638",
        neutral: "#212638",
        "neutral-content": "#ffffff",
        "base-100": "#ffffff",
        "base-200": "#f4f8ff",
        "base-300": "#DAE8FF",
        "base-content": "#212638",
        info: "#93BBFB",
        success: "#34EEB6",
        warning: "#FFCF72",
        error: "#FF8863",

        "--rounded-btn": "9999rem",

        ".tooltip": {
          "--tooltip-tail": "6px",
        },
        ".link": {
          textUnderlineOffset: "2px",
        },
        ".link:hover": {
          opacity: "80%",
        },
      },
    },
    {
      scaffoldEthDark: {
        primary: "#212638",
        "primary-content": "#F9FBFF",
        accent: "#4969A6",
        "accent-content": "#F9FBFF",
        neutral: "#F9FBFF",
        "neutral-content": "#385183",
        "base-100": "#385183",
        "base-200": "#2A3655",
        "base-300": "#212638",
        "base-content": "#F9FBFF",
        info: "#385183",
        success: "#34EEB6",
        warning: "#FFCF72",
        error: "#FF8863",

        "--rounded-btn": "9999rem",

        ".tooltip": {
          "--tooltip-tail": "6px",
          "--tooltip-color": "oklch(var(--p))",
        },
        ".link": {
          textUnderlineOffset: "2px",
        },
        ".link:hover": {
          opacity: "80%",
        },
      },
    },
  ],
};
export const theme = {
  extend: {
    boxShadow: {
      center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
    },
    animation: {
      "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
  },
};
