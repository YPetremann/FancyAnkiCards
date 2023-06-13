import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    testIsolation: false,
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
