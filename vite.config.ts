import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// RNF-02: o Three.js vai para um chunk próprio, carregado depois do conteúdo.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // O chunk do Three.js é grande por natureza — o que importa é que ele
    // seja baixado só depois do conteúdo (HeroScene entra por React.lazy).
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'three', test: /node_modules[\\/]three[\\/]/ },
            { name: 'r3f', test: /node_modules[\\/]@react-three[\\/]/ },
          ],
        },
      },
    },
  },
})
