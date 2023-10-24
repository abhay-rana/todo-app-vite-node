/** @type {import('tailwindcss').Config} */
const colors = require('./src/styles/theme-variable.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
    darkMode: 'class', //dark mode is apply when there is change in the root class
    theme: {
        fontFamily: {
            // add the font-size to 62.%% in .css file in html tag
            poppins: ['Poppins', 'sans-serif'], //font links should be at the index.html scripts
            custom_font_name: ['ADELIA', 'cursive'],
            // font-poppins , font-adelia to use the custom fonts classes
        },
        fontSize: {
            12: '1.2rem', // 12px
            14: '1.4rem', // 14px
            16: '1.6rem', // 16px
            18: '1.8rem', // 18px
            20: '2.0rem', // 20px
            24: '2.4rem', // 24px
            28: '2.8rem', //28px
            32: '3.2rem', // 32px
            48: '4.8rem', // 48px
            56: '5.6rem', // 56px
            64: '6.4rem', // 64px
        },
        extend: {
            // screen responsive break-points
            screens: {
                '@sm': { max: '639px' },
                '@md': { min: '640px', max: '1023px' },
                '@lg': { min: '1024px', max: '1440px' },
            },
            colors: colors,
            padding: {
                5: '1rem',
                15: '2rem',
            },
            borderWidth: {
                DEFAULT: '1px',
                0: '0px',
                1: '1px',
            },
        },
    },
    plugins: [],
    important: true,
};


"https://mrtnschndlr.medium.com/things-to-rethink-with-tailwind-css-part-1-breakpoints-b2809e2bbb2"