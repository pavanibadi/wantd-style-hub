
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

const srcPath = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": srcPath,
    },
  },
  plugins: [
    tanstackStart({
      server: {
        entry: "server",
      },
    }),
    react(),
    tailwindcss(),
  ],
});
