import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "tests/setup.js",
    exclude: [
      "**/node_modules/**",
      "**/e2e/**",
      "**/*.e2e.*",
      "**/*.spec.ts", // if your e2e tests use .spec.ts
    ],
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
