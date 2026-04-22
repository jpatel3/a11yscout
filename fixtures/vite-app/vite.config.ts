import { a11yscout } from "@a11yscout/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    a11yscout({ injectInProduction: true }),
    react(),
  ],
  build: {
    minify: false,
    sourcemap: true,
    rollupOptions: {
      output: {
        // keep attrs readable after build
      },
    },
  },
});
