import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  base: "https://ypetremann.github.io/FancyAnkiCards/",
  build: {
    target: "es2022",
    emptyOutDir: true,
    outDir: "lib",
    lib: {entry: "/src/index.js", formats: ["es"]},
  },
});
