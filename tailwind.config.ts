// tailwind.config.js

import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/_components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			screens: {
				'xs': '480px',    // Extra small devices
				'xsm': '540px',   // Between xs and sm
				'sm': '640px',    // Small devices (default)
				'smd': '720px',   // Between sm and md
				'md': '768px',    // Medium devices (default)
				'ml': '880px',    // Between md and lg
				'lg': '1024px',   // Large devices (default)
				'xl': '1280px',   // Extra large devices (default)
				'2xl': '1536px',  // 2x Extra large devices (default)
				'3xl': '1920px',  // Custom breakpoint for larger screens
				'4xl': '2560px',  // Custom breakpoint for even larger screens
				'5xl': '3200px',  // Ultra large screens
				'portrait': {'raw': '(orientation: portrait)'},  // Portrait orientation
				'landscape': {'raw': '(orientation: landscape)'}, // Landscape orientation
			},
			fontFamily: {
				'PolySans': ['PolySans Median'],
				'Fira': ['Fira Sans'],
				'Playwrite': ['Playwrite DE Grund'],
				'sans': ['sans-serif'],
			},
			colors: {
				pri: {
					DEFAULT: '#ffe11a',
					50: '#fffae0',
					100: '#fff4c0',
					200: '#ffec8a',
					300: '#ffe455',
					400: '#ffdd33',
					500: '#ffcc00',
					600: '#e6b800',
					700: '#cc9900',
					800: '#b37700',
					900: '#8c5900',
				},
				sec: {
					DEFAULT: '#241d14',
					50: '#a49b8f',
					100: '#928778',
					200: '#746c5b',
					300: '#554f3d',
					400: '#403b2b',
					500: '#2b2719',
					600: '#241d14',
					700: '#1d1711',
					800: '#16110d',
					900: '#0f0b08',
				},
				suc: {
					DEFAULT: '#f6f7f5',
					50: '#ffffff',
					100: '#ffffff',
					200: '#ffffff',
					300: '#ffffff',
					400: '#f6f7f5',
					500: '#e1e2e1',
					600: '#bfbfbe',
					700: '#999a99',
					800: '#747674',
					900: '#4e514e',
				},
				inf: {
					DEFAULT: '#dac8be',
					50: '#f5eee8',
					100: '#efe6de',
					200: '#e4d5c9',
					300: '#dac8be',
					400: '#c5b0a2',
					500: '#b0988d',
					600: '#9b8277',
					700: '#866d62',
					800: '#70584d',
					900: '#5b4338',
				},
				// Define gradient colors
				'pri-gradient': {
					from: '#D20062',
					to: '#D6589F',
				},
				'sec-gradient': {
					from: '#D6589F',
					to: '#D895DA',
				},
				'suc-gradient': {
					from: '#D895DA',
					to: '#C4E4FF',
				},
				'inf-gradient': {
					from: '#C4E4FF',
					to: '#D20062',
				},
			},
			keyframes: {
				slideInLeft: {
					'0%': {transform: 'translateX(-100%)', opacity: '0'},
					'100%': {transform: 'translateX(0)', opacity: '1'},
				},
				float: {
					'0%, 100%': {transform: 'translateY(0)'},
					'50%': {transform: 'translateY(-5px)'},
				},
				floatF: {
					'0%, 100%': {transform: 'translateY(0)'},
					'50%': {transform: 'translateY(-20px)'},
				},
				slideInRight: {
					'0%': {transform: 'translateX(100%)', opacity: '0'},
					'100%': {transform: 'translateX(0)', opacity: '1'},
				},
				slideInTop: {
					'0%': {transform: 'translateY(-100%)', opacity: '0'},
					'100%': {transform: 'translateY(0)', opacity: '1'},
				},
				slideInBottom: {
					'0%': {transform: 'translateY(100%)', opacity: '0'},
					'100%': {transform: 'translateY(0)', opacity: '1'},
				},
				glow: {
					'0%, 100%': { boxShadow: '0 0 0 0 rgba(254, 85, 0, 0.7)' },
					'50%': { boxShadow: '0 0 0 10px rgba(254, 85, 0, 0)' },
				},
			},
			animation: {
				slideInLeft: 'slideInLeft 0.5s ease-out',
				slideInRight: 'slideInRight 0.5s ease-out',
				slideInTop: 'slideInTop 0.5s ease-out',
				slideInBottom: 'slideInBottom 0.5s ease-out',
				float: 'float 3s ease-in-out infinite',
				floatF: 'floatF 3s ease-in-out infinite',
				glow: 'glow 1.5s infinite', // Adjust timing as needed
			},
			boxShadow: {
				'pri-glow': '0 0 0 0 rgba(254, 85, 0, 0.7)',
				'sec-glow': '0 0 0 0 rgba(214, 88, 159, 0.7)',
				'suc-glow': '0 0 0 0 rgba(216, 149, 218, 0.7)',
				'inf-glow': '0 0 0 0 rgba(196, 228, 255, 0.7)',
			},
			borderWidth: {
				'3': '3px',
				'6': '6px',
			},
			backgroundImage: {
				'pri-gradient': 'linear-gradient(to right, #D20062, #D6589F)',
				'sec-gradient': 'linear-gradient(to right, #D6589F, #D895DA)',
				'suc-gradient': 'linear-gradient(to right, #D895DA, #C4E4FF)',
				'inf-gradient': 'linear-gradient(to right, #C4E4FF, #D20062)',
			},
		},
	},
	plugins: [],
};

export default config;
