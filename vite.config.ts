import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  preview: {
    allowedHosts: ['wallet.johndevstudio.com'],
  },	
  resolve: {
    alias: {
      '@pages': '/src/pages',
      '@assets': '/src/assets',
      '@context': '/src/context',
      '@components': '/src/components',
      '@router': '/src/router',
      '@services': '/src/services',
      '@utils': '/src/utils',
    }
  }
});
