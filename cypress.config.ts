import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    viewportHeight: 1920,
    viewportWidth: 1500,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
