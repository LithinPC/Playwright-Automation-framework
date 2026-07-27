// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const config= {
  testDir: './tests',
  retries : 2,
  timeout : 30 * 1000,
  expect : {
    timeout : 5000
  },
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
   browserName : 'chromium',// launch differnt browsers
   headless : false, //to execute without/with display
   screenshot : 'on',
   trace : 'on',
  },


};
module.exports = config;
