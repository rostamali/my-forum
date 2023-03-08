/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				Krub: ['Krub'],
			},
			container: {
				center: true,
				padding: '1rem',
				screens: {
					sm: '600px',
					md: '728px',
					lg: '984px',
					xl: '1240px',
					'2xl': '1240px',
				},
			},
		},
	},
	plugins: [require('flowbite/plugin')],
};
