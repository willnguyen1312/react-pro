/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import UnoCSS from "unocss/vite";
import Inspect from "vite-plugin-inspect";

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
    Inspect(),
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
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
    css: false,
  },
});
