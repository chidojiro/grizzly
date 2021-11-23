import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
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
  },
  plugins: [reactRefresh(), macrosPlugin(), tsconfigPaths()],
  define: {
    'process.env': {},
  },
  build: { sourcemap: true },
});
