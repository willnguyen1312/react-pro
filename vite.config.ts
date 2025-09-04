import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react"],
          "react-dom": ["react-dom"],
        },
      },
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [["module:@preact/signals-react-transform"]],
      },
    }),
    UnoCSS(),
  ],
  server: {
    port: 1312,
    host: true,
    open: true,
  },
});
