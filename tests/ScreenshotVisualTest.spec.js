const { test, expect } = require('@playwright/test')

//test.describe.configure({mode:"parallel"});//run tests parallely
test.describe.configure({mode:"serial"});//run tests serailly, if one fails other tests are skipped
test('Visual', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing1.png');

});

test('Screenshot validations', async ({ page }) => {
    //Hide and show test
    await page.goto("https://rahulshettyacademy.com/AutomationPractice");
    //await page.goto("https://www.google.com");
    // await page.goBack();
    // await page.goForward();
    // await page.goBack();
    await expect(page.locator('#displayed-text')).toBeVisible();
    //take a screenshot on a particular element
    await page.locator('#displayed-text').screenshot({ path: 'screenshot.png' });
    await page.locator("[value='Hide']").click();
    //await page.screenshot({path:'screenshot.png'}); //take a screenshot of page 
    await expect(page.locator('#displayed-text')).toBeHidden();
});