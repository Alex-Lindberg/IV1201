const defaultTheme = require('tailwindcss/defaultTheme');

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
		fontFamily: {
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		},
		extend: {
			colors: {
				primary: {
					DEFAULT: '#353535',
					100: '#d7d7d7',
					200: '#aeaeae',
					300: '#868686',
					400: '#5d5d5d',
					500: '#353535',
					600: '#2a2a2a',
					700: '#202020',
					800: '#151515',
					900: '#0b0b0b',
				},
				secondary: {
					DEFAULT: '#ffa500',
					100: '#ffedcc',
					200: '#ffdb99',
					300: '#ffc966',
					400: '#ffb733',
					500: '#ffa500',
					600: '#cc8400',
					700: '#996300',
					800: '#664200',
					900: '#332100',
				},
				accent: {
					DEFAULT: '#deb887',
					100: '#f8f1e7',
					200: '#f2e3cf',
					300: '#ebd4b7',
					400: '#e5c69f',
					500: '#deb887',
					600: '#b2936c',
					700: '#856e51',
					800: '#594a36',
					900: '#2c251b',
				},
				accent2: {
					DEFAULT: '#814d19',
					100: '#e6dbd1',
					200: '#cdb8a3',
					300: '#b39475',
					400: '#9a7147',
					500: '#814d19',
					600: '#673e14',
					700: '#4d2e0f',
					800: '#341f0a',
					900: '#1a0f05',
				},
				tc: {
					DEFAULT: '#f1f2e1',
					100: '#fcfcf9',
					200: '#f9faf3',
					300: '#f7f7ed',
					400: '#f4f5e7',
					500: '#f1f2e1',
					600: '#c1c2b4',
					700: '#919187',
					800: '#60615a',
					900: '#30302d',
				},
				accept: {
					DEFAULT: '#52da00',
					300: '#97e966',
					400: '#75e133',
					500: '#52da00',
					600: '#42ae00',
					700: '#318300',
					800: '#215700',
					900: '#102c00',
				},
			},
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
