import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    theme: {
        extend: {
            colors: {
                vektrus: {
                    'button': '#B4E8E5',
                    'sm-light': '#B6EBF7',
                    'sm-dark': '#8BBCDA',
                    'check-light': '#FBE5D8',
                    'check-dark': '#F4BE9D',
                    'planned-light': '#B2EED6',
                    'planned-dark': '#49D69E',
                    'primary-light': '#00E1F0',
                    'primary-dark': '#0095B0',
                    blue: {
                        light: '#E6FBFF',
                        DEFAULT: '#00B8D9',
                        dark: '#0095B0'
                    },
                    gray: {
                        light: '#F5F5F5',
                        dark: '#333333'
                    }
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif']
            },
            boxShadow: {
                'top': '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
            }
        }
    },
    plugins: []
}
export default config
