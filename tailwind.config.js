/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-red": "hsl(7, 99%, 70%)",
        "primary-yellow": "hsl(51, 100%, 49%)",
        "primary-dark-desaturated-cyan": "hsl(167, 40%, 24%)",
        "primary-dark-blue": "hsl(198, 62%, 26%)",
        "primary-moderate-cyan": "hsl(168, 34%, 41%)",
        "neutral-dark-desaturated-blue": "hsl(212, 27%, 19%)",
        "neutral-very-dark-grayish-blue": "hsl(213, 9%, 39%)",
        "neutral-dark-grayish-blue": "hsl(232, 10%, 55%)",
        "neutral-grayish-blue": "hsl(210, 4%, 67%)",
        "neutral-white": "hsl(0, 0%, 100%)",
      },
      fontFamily: {
        Fraunces: ["Fraunces", "system-ui"],
        barlow: ["Barlow", "sans-serif"],
      },
      fontWeight: {
        "fw-regular": 600,
        "fw-semi-bold": 700,
        "fw-bold": 900,
      },
      fontSize: {
        basefs: "1.125rem",
        headerTitle1: "3.5rem",
        headerTitle2: "6.5rem",
      },
    },
  },
  plugins: [],
};
