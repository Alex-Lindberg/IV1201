const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	pruge: ['./src/**/*.{js,jsx,ts,tsx}'],
	variants: {
		extend: {},
	},
	plugins: [],
	content: [
		'./index.html',
		'./src/pages/*.{js,jsx,ts,tsx}',
		'./src/components/*.{js,jsx,ts,tsx}',
		'./src/*.{js,jsx,ts,tsx}',
	],
	theme: {
		screens: {
			sm: '390px', // iPhone 12/13+, SG20 @ 384px
			md: '780px', // Pads
			lg: '1024px',
			xl: '1280px',
		},
		colors: {
			...defaultTheme.colors.black,
			...defaultTheme.colors.white,
			...defaultTheme.colors.gray,
			...defaultTheme.colors.transparent,
			primary: {
				DEFAULT: '#2b2e4a', 
				100: '#d5d5db',
				200: '#aaabb7',
				300: '#808292',
				400: '#55586e',
				500: '#2b2e4a', 
				600: '#22253b',
				700: '#1a1c2c',
				800: '#11121e',
				900: '#09090f',
			},
			secondary: {
				DEFAULT: '#e84545', 
				100: '#fadada',
				200: '#f6b5b5',
				300: '#f18f8f',
				400: '#ed6a6a',
				500: '#e84545', 
				600: '#ba3737',
				700: '#8b2929',
				800: '#5d1c1c',
				900: '#2e0e0e',
			},
			accent: {
				DEFAULT: '#903749', 
				100: '#e9d7db',
				200: '#d3afb6',
				300: '#bc8792',
				400: '#a65f6d',
				500: '#903749', 
				600: '#732c3a',
				700: '#56212c',
				800: '#3a161d',
				900: '#1d0b0f',
			},
			accent2: {
				DEFAULT: '#53354a', 
				100: '#ddd7db',
				200: '#baaeb7',
				300: '#988692',
				400: '#755d6e',
				500: '#53354a', 
				600: '#422a3b',
				700: '#32202c',
				800: '#21151e',
				900: '#110b0f',
			},
			tc: {
				DEFAULT: "#f1f2e1",
				100: "#fcfcf9",
				200: "#f9faf3",
				300: "#f7f7ed",
				400: "#f4f5e7",
				500: "#f1f2e1",
				600: "#c1c2b4",
				700: "#919187",
				800: "#60615a",
				900: "#30302d"
			},
			accept: {
				DEFAULT: "#52da00",
				300: "#97e966",
				400: "#75e133",
				500: "#52da00",
				600: "#42ae00",
				700: "#318300",
				800: "#215700",
				900: "#102c00"
			},

		},
		fontFamily: {
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		},
		extend: {
			spacing: {
				128: '32rem',
				144: '36rem',
			},
			borderRadius: {
				'4xl': '2rem',
			},
		},
	},
};
