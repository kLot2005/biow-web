/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bio: {
                    physical: '#ff2d55', // Red/Pink
                    emotional: '#00e676', // Green/Turquoise
                    intellectual: '#2979ff', // Blue
                }
            }
        },
    },
    plugins: [],
}
