import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/ISteamUser": {
        target: "https://api.steampowered.com",
        changeOrigin: true,
      },
      "/inventory": {
        target: "https://steamcommunity.com",
        changeOrigin: true,
      },
      "/market": {
        target: "https://steamcommunity.com",
        changeOrigin: true,
      },
    }
  },
  plugins: [react()],
})
