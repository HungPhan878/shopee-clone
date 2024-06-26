/* eslint-disable import/no-unresolved */
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
// tối ưu kích thước cho vite
// import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [react()] as any,
  test: {
    environment: 'jsdom',
    setupFiles: path.resolve(__dirname, './vitest.setup.js')
  },
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})
