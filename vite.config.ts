import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import reactRefresh from '@vitejs/plugin-react-refresh';
import macrosPlugin from 'vite-plugin-babel-macros';

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxFactory: 'jsx',
    jsxInject: `
      import { jsx } from '@emotion/react';
    `,
    target: 'es2015',
  },
  plugins: [reactRefresh(), macrosPlugin(), tsconfigPaths()],
  define: {
    'process.env': {},
  },
  build: { sourcemap: false, rollupOptions: { output: { manualChunks: undefined } } },
});
