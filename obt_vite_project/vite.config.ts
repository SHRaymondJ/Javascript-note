import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        reactRefresh(),
        legacy({
            target: ['defaulst', 'IE 11'],
        }),
    ],
    base: './',
})
