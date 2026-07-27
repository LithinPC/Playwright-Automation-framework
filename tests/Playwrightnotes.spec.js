
//Basic syntax
const {test, expect} = require('@playwright/test');

test ('Test case heading',async ({browser})=> // async to be added whenever there is await

{
// await to be used for each step to executed one after the other
//chrome -plugin/cookies 
// - First step is to import one annotation const {test} = require(‘@playwright/test’);
//    ---this is to install a launch a fresh page all the time and call all the annotations.
// - Javascript tries to execute all the lines at once causing async in the execution, 
//     hence use ‘await’ to wait for each step/line to execute and will be enabled only if use ‘async’ near the function.
//	- Function() can be replaced with ()=> as the function is anonymous.

});

test.only ('Test case ',async ({browser})=> //.only used to launch a specific test
{
    //creating new instance/window/session
    const context = await browser.newContext();  //creating new instance on chrome and adding the cookies and plugins at ease
   
    //creating new page
    const page =await context.newPage();// creating a new page to execute test cases
   
    //creating variables
   const userName = page.locator('#username');
   
   // launching a url
   await page.goto("https://rahulshettyacademy.com/loginpagePractise"); // going to the url

   // Getting the title of the page printed
   console.log( await page.title());
   
   // assertion to check the title is correct
   await expect(page).toHaveTitle("Google");

   // .fill is used to type anything in the field box also 
   // .type is not used anymore for the same purpose
   await page.locator("[type='password']").fill('learning');
  
   //.textcontent() is used to get the text displayed at that path/location
   console.log(await page.locator("[style*='block']").textcontent());

   //Clear the existing text
   await userName.fill("");
 
   //.nth used to grab the required index element
   console.log(await cardTitle.nth(2).textContent());

   //.first() used to grab first element
   console.log(await cardTitle.first().textContent())

   // waiting for the apis to load i.e. on network tab all page loads
   await page.waitForLoadState('networkidle');

   //another type of wait, waits for single element not multiple
   await cardTitle.first().waitFor();

   //used to grab whole list 
   const allTitles= await cardTitle.allTextContents();

   //Selecting from dropdown
   const dropdown =page.locator('select.form-control');//dropdown selector
   await dropdown.selectOption('Consultant');

   //Selecting a radio button
   await page.locator(".radiotextsty").last();//radio button selection
 
   //Checking if the radio button is checked using assertions
   await expect(page.locator(".radiotextsty").last()).toBeChecked();//assert to check the radio button
   console.log(await page.locator("d().radiotextsty").last().isChecked());//returns true or false

   //Checking and Unchecking a box 
   await page.locator('#terms').click();
   await expect(page.locator('#terms')).toBeChecked();
   await page.locator('#terms').uncheck();

   //assertion to check if the unchecked box is false as expected
   expect (await page.locator('#terms').isChecked()).toBeFalsy//assertion to check of false

   //Pause at a point
   await page.pause(); 

    //await is inside the locator if the action is performed in the assertion
    //checking for blinking text
    const DocLink = page.locator("[href*='documents-request']");
    await expect(DocLink).toHaveAttribute('class','blinkingText');//to check if the blinking text is present

    //How can i execute two steps parallely?
    //Using Promise to execute parallely
    //Handle child windows
    const [newPage]= await Promise.all( //passing the value to newPage
    [
    context.waitForEvent('page'),//listening for new page pending,rejected,fulfilled(a promise)
    DocLink.click(),// new page open
    ])
    const text = await newPage.locator('.red').textContent();

});


//Playwright config script
// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const config= {
  testDir: './tests',
  timeout : 30 * 1000,
  expect : {
    timeout : 5000
  },
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
   browserName : 'chromium',// launch differnt browsers
   headless : false, //to execute without/with display
   screenshot : 'on',//to take a screenshot
   trace : 'on' //for each and every step screenshot 
   // trace : 'retain on failure' will retain only failed test cases
  },


};
module.exports = config;

//to debug use command
// npx playright test --debug

//to Play and record
//npx playright codegen https://google.

//to check the report
//goto --> playwright-report-->index.html