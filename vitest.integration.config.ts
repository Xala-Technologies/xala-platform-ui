import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/integration/setup.ts'],
    include: ['**/*.integration.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.storybook', 'storybook-static'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './packages/platform-ui/src'),
    },
  },
});
