import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: './src/components/index.ts',
      hooks: './src/hooks/index.ts',
      types: './src/types/index.ts',
      providers: './src/providers/index.ts',
      utils: './src/utils/index.ts',
    },
  },
});
