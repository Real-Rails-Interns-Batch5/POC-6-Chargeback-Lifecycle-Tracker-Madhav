module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#030712',
        surface: '#0B1117',
        border: '#1F2937',
        'accent-primary': '#38BDF8',
        'accent-secondary': '#818CF8',
        'text-primary': '#F3F4F6',
        'text-secondary': '#D1D5DB',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-cyan': '0 0 8px rgba(56, 189, 248, 0.5)',
        'glow-cyan-lg': '0 0 16px rgba(56, 189, 248, 0.8)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '30p': '30%',
        '70p': '70%',
      },
      width: {
        '30p': '30%',
        '70p': '70%',
      },
    },
  },
  plugins: [],
};
