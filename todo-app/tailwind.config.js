module.exports = {
    purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'bright-blue': 'hsl(220, 98%, 61%)',
                'my-cyan': 'hsl(192, 100%, 67%)',
                'my-purple': 'hsl(280, 87%, 65%)',
                'my-gray': {
                    100: 'hsl(0, 0%, 98%)',
                    200: 'hsl(236, 33%, 92%)',
                    300: 'hsl(233, 11%, 84%)',
                    400: 'hsl(236, 9%, 61%)',
                    500: 'hsl(235, 19%, 35%)',
                },
                'dark-grayish-blue': {
                    100: 'hsl(234, 39%, 85%)',
                    200: 'hsl(236, 33%, 92%)',
                    300: 'hsl(234, 11%, 52%)',
                    400: 'hsl(233, 14%, 35%)',
                    500: 'hsl(237, 14%, 26%)',
                },
                'dark-blue': {
                    700: 'hsl(235, 24%, 19%)',
                    800: 'hsl(235, 21%, 11%)',
                },
            },
            fontFamily: {
                sans: ['Josefin Sans', 'sans-serif'],
            },
            height: {
                'large-img': '300px',
                'small-img': '200px',
            },
            zIndex: {
                negative: -10,
                'negative-2': -20,
            },
            letterSpacing: {
                'most-widest': '.4em',
            },
        },
    },
    variants: {
        extend: {
            gradientColorStops: ['group-hover'],
        },
    },
    plugins: [],
};
