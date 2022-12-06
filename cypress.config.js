const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '1af6c7',
  e2e: {
    baseUrl: "http://qamid.tmweb.ru",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
