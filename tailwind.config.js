/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#eff6ff',
  				'500': '#2F72E2',
  				'600': '#2563eb',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			gray: {
  				'50': '#FAFBFC',
  				'100': '#f3f4f6',
  				'200': '#E1E1E1',
  				'300': '#d1d5db',
  				'400': '#9DA4B2',
  				'500': '#677289',
  				'600': '#8C93A1',
  				'900': '#1A1A1A'
  			},
  			danger: '#EF494F',
  			success: '#10b981',
  			warning: '#f59e0b',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			tab: '0px 1px 3px 0px rgba(0,0,0,0.04), 0px 1px 1px 0px rgba(0,0,0,0.02)',
  			button: '0px 1px 3px 0px rgba(0,0,0,0.04), 0px 1px 1px 0px rgba(0,0,0,0.02)',
  			menu: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
  			modal: '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
  			dropdown: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
  			focus: '0 0 0 3px rgba(47,114,226,0.2)'
  		},
  		outlineWidth: {
  			'0.5': '0.5px'
  		},
  		outlineOffset: {
  			'-0.5': '-0.5px'
  		},
  		borderWidth: {
  			'0.5': '0.5px'
  		},
  		height: {
  			'0.5': '0.5px',
  			'1.5': '1.5px'
  		},
  		width: {
  			'240': '240px'
  		},
  		fontFamily: {
  			inter: [
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
