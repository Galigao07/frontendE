import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';


// https://vitejs.dev/config/
export default defineConfig({
    // Other Vite config options
  plugins: [
    react(),
    tsconfigPaths(), 
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
        onstart({ startup }) {
          startup([
            '.',
            '--no-sandbox',
            '--sourcemap',
            // For Chrome devtools
            '--remote-debugging-port=9222',
          ])
        },
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      // Ployfill the Electron and Node.js built-in modules for Renderer process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: {},
    }),
  ],
  base: './', // 👈 crucial for file:// protocol in Electron portable

    build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        extended: path.resolve(__dirname, 'extended.html'), // 👈 if you have another window
      },
    },
  },
  resolve: {
    alias: {
      // 'pdfjs-dist': path.resolve(__dirname, 'node_modules/pdfjs-dist/legacy/build/pdf.js'),
       'pdfjs-dist': path.resolve(__dirname, 'node_modules/pdfjs-dist'),
    },
  },



  server: {
    // host: '0.0.0.0',
    // host: '192.168.68.112',
    host: '0.0.0.0',
  },

})
