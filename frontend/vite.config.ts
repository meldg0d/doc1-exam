import { defineConfig, mergeConfig } from 'vite'
import { defineConfig as defineVitestConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

const viteConfig = defineConfig({
  plugins: [react(), tailwindcss()],
})

const vitestConfig = defineVitestConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['src/setupTests.ts'],
    globals: true,
  },
})

export default mergeConfig(viteConfig, vitestConfig)