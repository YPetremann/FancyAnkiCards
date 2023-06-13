import { defineConfig } from "vite";
import terser from "@rollup/plugin-terser";
import content from "@originjs/vite-plugin-content";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [terser(), content()],
  base: "https://ypetremann.github.io/FancyAnkiCards/",
  build: {
    target: "es2022",
    emptyOutDir: true,
    outDir: "lib",
    lib: {
      entry: "/src/index.js",
      formats: ["es"],
      name: "FancyAnkiCards",
      fileName: "FancyAnkiCards",
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const { source } = assetInfo;
          return `FancyAnkiCards[extname]`;
        },
      },
    },
  },
});
