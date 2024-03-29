import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import { ViteMinifyPlugin } from 'vite-plugin-minify'
import os from "os"

export default defineConfig({
    base: '',
    plugins: [react(), viteTsconfigPaths(), ViteMinifyPlugin({})],
    server: {    
        open: true,
        port: 3000, 
    },
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            },
            output: {
                comments: false
            },
            maxWorkers: os.cpus().length - 1
        }
    }
})