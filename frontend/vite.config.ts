import { defineConfig, mergeConfig } from 'vite'
import { defineConfig as defineVitestConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const viteConfig = defineConfig({
  plugins: [react()],
})

const vitestConfig = defineVitestConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['src/setupTests.ts'],
    globals: true,
  },
})

export default mergeConfig(viteConfig, vitestConfig)