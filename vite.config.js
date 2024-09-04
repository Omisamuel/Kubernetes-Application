import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 4000, // Change this to any port you prefer that is not in use
  },
  test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./vitest.setup.js", // Optional: If you need to set up global configurations
    },
});


/*import { fileURLToPath, URL } from "url";
import { expect } from 'vitest';
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 4000, // Change this to any port you prefer that is not in use
  },
  test: {
    environment: "jsdom", // Set testing environment to jsdom
    globals: true,        // Use global variables like describe, it, expect
    setupFiles: "vitest.setup.js", // Optional: if you need additional setup
  },
});*/
