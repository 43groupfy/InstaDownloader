import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // "/api": "http://localhost:8080/",
      '/api': 'https://safe-dusk-18400-bc6e0d3dfe3f.herokuapp.com/'
    },
  },
});
