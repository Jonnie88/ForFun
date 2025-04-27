/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#2D3E50',
				secondary: '#D36B47',
				accent: '#E4B363',
				background: '#F5F2EA',
				success: '#A8C3A0',
				warning: '#DAB1AC'
			}
		}
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};
