import { inspectReact } from "@namnode/vite-plugin-inspect-react";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [inspectReact(), react(), UnoCSS()],
    server: {
        port: 1312,
        host: true,
        open: true,
    },
});
