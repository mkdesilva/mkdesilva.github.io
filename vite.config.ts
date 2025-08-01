import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        nomis_main: resolve(__dirname, "nomis/index.html"),
        nomis_support: resolve(__dirname, "nomis/support/index.html"),
        nomis_terms: resolve(__dirname, "nomis/terms/index.html"),
        nomis_privacy: resolve(__dirname, "nomis/privacy/index.html"),
      },
    },
  },
});
