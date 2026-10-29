const { defineConfig } = require('cypress');

module.exports = defineConfig({
  video: false,
  screenshotOnRunFailure: true,
  defaultCommandTimeout: 8000,
  requestTimeout: 15000,
  responseTimeout: 20000,
  retries: {
    runMode: 0,
    openMode: 0,
  },
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    testIsolation: true,
    expose: {
      ONEPIECE_API_URL: 'https://api.api-onepiece.com/v2/characters/en',
    },

    setupNodeEvents(on, config) {
      
      const webpackPreprocessor = require('@cypress/webpack-preprocessor');
      const path = require('path')

      const options = webpackPreprocessor.defaultOptions;

      options.webpackOptions.resolve = {
        ...options.webpackOptions.resolve,
        alias: {
          '@pages/*': path.resolve(__dirname, 'cypress/support/pages/*'),
          '@utils/*': path.resolve(__dirname, 'cypress/support/utils/*')
        },
      };

      on('file:preprocessor', webpackPreprocessor(options));

      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.preferences ??= {};
          launchOptions.preferences.default ??= {};

          Object.assign(launchOptions.preferences.default, {
            credentials_enable_service: false,
            'profile.password_manager_enabled': false,
            'profile.password_manager_leak_detection': false,
          });
        }

        return launchOptions;
      });


      return config;
    },
  },
});