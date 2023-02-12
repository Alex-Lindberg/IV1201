/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	pruge: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: false,
	theme: {
		extend: {},
	},
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
};
