import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // inspectReact({
    //   formatDataInspectId: (id) => {
    //     return id.substring(__dirname.length + 1);
    //   },
    // }),
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
