const colors = require('tailwindcss/colors');

module.exports = {
    purge: {
        preserveHtmlElements: false,
        content: ['./public/**/*.html', './src/**/*.vue']},
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {colors},
        minHeight: {
            '72': '18rem'
        },
        extend: {
            colors: {
                caldera: {
                    primary: "var(--navbar-color)",
                    // red: '#C31135'
                    // primary: '#750b20',
                    pale: '#750b20',
                    yellow: '#f8c145',
                    blue: '#191970',
                    reddish: '#AA324A',
                    // green: '#21770D', // the real green
                    green: '#0B7560',
                    brown: '#755F63',
                    grayish: '#151515',

                }
            },
            fontFamily: {

            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
