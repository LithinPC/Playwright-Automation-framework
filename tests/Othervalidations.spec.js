const {test,expect} = require('@playwright/test');

test('Other validations',async({page})=>

{
    //Hide and show test
 await page.goto("https://rahulshettyacademy.com/AutomationPractice");
 //await page.goto("https://www.google.com");
// await page.goBack();
// await page.goForward();
// await page.goBack();
 await expect(page.locator('#displayed-text')).toBeVisible();
 //take a screenshot on a particular element
 await page.locator('#displayed-text').screenshot({path:'screenshot.png'});
 await page.locator("[value='Hide']").click();
 //await page.screenshot({path:'screenshot.png'}); //take a screenshot of page 
 await expect(page.locator('#displayed-text')).toBeHidden();

//Popup box handling or dialog handling
page.on('dialog',dialog =>dialog.accept());
await page.locator('#confirmbtn').click();

//hover
await page.locator('#mousehover').hover();

//switching to new frame
const framesPage = page.frameLocator('#courses-iframe');
await framesPage.locator("a[href*='lifetime-access']:visible").click();
const textContent = await framesPage.locator('.text h2').textContent();
console.log(textContent.split(" ")[1]);

});