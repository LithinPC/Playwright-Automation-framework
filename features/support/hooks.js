const { Before, After, AfterStep, Status, BeforeStep } = require('@cucumber/cucumber');
const { POmanager } = require('../../PageObjects/POmanager');
const playwright = require('@playwright/test');

Before(async function () {
    const browser = await playwright.chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.pomanager = new POmanager(this.page);
});

After(function () {
    console.log("The End");
})

BeforeStep(function(){

});

AfterStep(async function ({result}) {

    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screeenshotstep.png' });
    }
});