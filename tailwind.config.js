import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		colors: {
			txt: colors.slate[700],
			error: colors.rose[700],
			'light-gray': colors.gray[100],
			white: colors.white,
			transparent: colors.transparent,
		},
	},
	plugins: [],
}
