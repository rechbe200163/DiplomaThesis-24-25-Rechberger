import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  daisyui: {
    themes: [
      {
        custom: {
          primary: '#4a90e2', // Soft Blue
          'primary-focus': '#3a7ed1', // Slightly darker blue for focus
          'primary-content': '#ffffff', // White text

          secondary: '#ffb343', // Mint Green
          'secondary-focus': '#41c8aa', // Slightly darker mint green
          'secondary-content': '#000000', // Black text

          accent: '#2c3e50', // Deep Slate Blue
          'accent-focus': '#1a2836', // Darker version of Deep Slate Blue
          'accent-content': '#ffffff', // White text

          neutral: '#3e4c59', // Muted Steel Grey
          'neutral-focus': '#2c3846', // Darker Steel Grey
          'neutral-content': '#d1d5db', // Light grey for contrast

          'base-100': '#1e293b', // Dark blue-grey
          'base-200': '#334155', // Slightly lighter blue-grey
          'base-300': '#475569', // Even lighter blue-grey
          'base-content': '#cbd5e1', // White text for readability
          'base-content-black': '#000000', // Black text for readability

          info: '#00a7b3', // Muted Slate
          success: '#7ed321', // Soft Lime Green
          warning: '#f8e71c', // Gentle Yellow
          error: '#ff2c2c', // Soft Red
          'error-content': '#000000', // White text for readability
        },
      },
    ],
  },

  theme: {
    container: {
      center: 'true',
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        success: {
          '25': '#F6FEF9',
          '50': '#ECFDF3',
          '100': '#D1FADF',
          '600': '#039855',
          '700': '#027A48',
          '900': '#054F31',
        },
        blue: {
          '25': '#F5FAFF',
          '100': '#D1E9FF',
          '500': '#2E90FA',
          '600': '#1570EF',
          '700': '#175CD3',
          '900': '#194185',
        },
        sky: {
          '1': '#F3F9FF',
        },
        black: {
          '1': '#00214F',
          '2': '#344054',
        },
        gray: {
          '25': '#FCFCFD',
          '200': '#EAECF0',
          '300': '#D0D5DD',
          '500': '#667085',
          '600': '#475467',
          '700': '#344054',
          '900': '#101828',
        },
        skeletonBg: {
          '2': '#E5E7EB',
          DEFAULT: '#F3F4F6',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        inter: 'var(--font-inter)',
        'ibm-plex-serif': 'var(--font-ibm-plex-serif)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'collapsible-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'collapsible-down': 'collapsible-down 0.2s ease-out', // Corrected here
        'collapsible-up': 'collapsible-up 0.2s ease-out', // Corrected here
      },
    },
  },
  plugins: [require('daisyui'), require('tailwindcss-animate')],
} satisfies Config;

export default config;
