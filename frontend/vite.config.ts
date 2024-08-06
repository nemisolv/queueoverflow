import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/assets': '/src/assets',
      '@/components': '/src/components',
      '@/lib': '/src/lib',
      '@/styles': '/src/styles',
      '@/pages': '/src/pages',
      '@/layouts': '/src/layouts',
      '@/utils': '/src/utils',
      '@/services': '/src/services',
      '@/context': '/src/context',
      '@/routes': '/src/routes',
      '@/constants': '/src/constants',
      '@/configs': '/src/configs',
      '@/stores': '/src/stores',
      '@/data': '/src/data',
      '@/helpers': '/src/helpers',
      '@/hooks': '/src/hooks',
    },
    
  },
  server: {
    port: 3000
  },
});