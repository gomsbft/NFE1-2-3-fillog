import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('swiper')
        }
      }
    })
  ],
  proxy: {
    '/posts': {
      target: 'http://localhost:3000', 
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/posts/, '/posts'), 
    },
  },
});