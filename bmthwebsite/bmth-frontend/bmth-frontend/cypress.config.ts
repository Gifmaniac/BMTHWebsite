const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://i567108.luna.fhict.nl/",
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});