// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { permission } = require('node:process');

const config= {
  testDir: './tests',
  retries :1,//retry if failed 
  workers :3,

  timeout : 30 * 1000,
  expect : {
    timeout : 5000
  },
  reporter: 'html',
  projects : [
 {
    name : 'Safari',
    use: {
      browserName : 'webkit',// launch differnt browsers
      headless : false, //to execute without/with display
      screenshot : 'on', //off/on/only-on-failure
      trace : 'on', //off/on
      //viewport : {width: 720, height: 720},//change the window size
      //...devices['iPhone 11 Pro'],
     }
 },
 {
  name : 'Chrome',
  use: {
    browserName : 'chromium',// launch differnt browsers
    headless : false, //to execute without/with display
    screenshot : 'on',
    ignoreHttpsErrors : true, //to ignore SSL certificate errors
    permissions : ['geolocation'],//to accept permissions like location
    trace : 'on',
    //...devices['Galaxy S5'],//to play on device mode
    //video : 'retain-on-failure'// off/on/retain-on-failure/on-first-retry
   },
}
  ]
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

};
module.exports = config;
