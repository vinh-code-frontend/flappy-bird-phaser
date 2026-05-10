import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  server: {
    port: 3000,
  },
  esbuild: {
    legalComments: "none",
  },
  build: {
    chunkSizeWarningLimit: 1400,
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ["phaser"],
        },
      },
    },
  },
});
