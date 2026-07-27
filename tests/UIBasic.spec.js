const {test, expect} = require('@playwright/test');


test('Browser PW test', async function({browser}) // async to be added whenever there is await
{
// await to be used for each step to executed one after the other
//chrome -plugin/cookies 
  const context = await browser.newContext();  //creating new instance on chrome and adding the cookies and plugins at ease
  const page =await context.newPage();// creating a new page to execute test cases
  const userName = page.locator('#username');
  const signIn = page.locator("[name='signin']");
  const cardTitle = page.locator(".card-body .card-title");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise"); // going to the url
  console.log( await page.title());
  await userName.fill('rahulshetty');
  await page.locator("[type='password']").fill('learning');
  await signIn.click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
  await userName.fill("");// used to clear the existing text
  await userName.fill("rahulshettyacademy");
  await signIn.click();
  console.log(await cardTitle.nth(2).textContent());//.nth used to grab the required index element
  console.log(await cardTitle.first().textContent())//.first() used to grab first element
  await page.waitForLoadState('networkidle');// waiting for the apis to load i.e. on network tab all page loads
  await cardTitle.first().waitFor();//another type of wait, waits for single element not multiple
  const allTitles= await cardTitle.allTextContents();//used to grab whole list 
  console.log(allTitles);
});

test('Page PW test', async ({page})=> // execute directly the page and have instance and new page as default
{

  await page.goto("https://google.com/"); // going to the url

  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
  
});

test('UI control test', async function({browser}) // async to be added whenever there is await
{
// await to be used for each step to executed one after the other
//chrome -plugin/cookies 
  const context = await browser.newContext();  //creating new instance on chrome and adding the cookies and plugins at ease
  const page =await context.newPage();// creating a new page to execute test cases
  const userName = page.locator('#username');
  const signIn = page.locator("[name='signin']");
  const dropdown =page.locator('select.form-control');//dropdown selector
  await page.goto("https://rahulshettyacademy.com/loginpagePractise"); // going to the url
  console.log( await page.title());
  await dropdown.selectOption('Consultant');//select an option
  await page.locator(".radiotextsty").last();//radio button selection
  await expect(page.locator(".radiotextsty").last()).toBeChecked();//assert to check the radio button
  console.log(await page.locator("d().radiotextsty").last().isChecked());//returns true or false
  await page.locator('#terms').click();
  await expect(page.locator('#terms')).toBeChecked();
  await page.locator('#terms').uncheck();
  expect (await page.locator('#terms').isChecked()).toBeFalsy//assertion to check of false
  await page.pause(); //to pause at a point
   //await is inside the locator if the action is performed in the assertion
//checking for blinking text
const DocLink = page.locator("[href*='documents-request']");
await expect(DocLink).toHaveAttribute('class','blinkingText');//to check if the blinking text is present
});

test.only('Child Window Handle', async({browser})=>
{
const context = await page.newContext();//open new window/session
const page = await context.newPage();//open new page
const DocLink = page.locator("[href*='documents-request']");
await page.goto("https://rahulshettyacademy.com/loginpagePractise"); // going to the url

//How can i execute two steps parallely?
//Using Promise to execute parallely
const [newPage]= await Promise.all( //passing the value to newPage
[
context.waitForEvent('page'),//listening for new page pending,rejected,fulfilled(a promise)
DocLink.click(),// new page open
])
const text = await newPage.locator('.red').textcontent();
const arrayText = text.split("@");
const domain = arrayText[1].split("")[0];
console.log(domain);
console.log(text);

//Filling details from another window
await page.locator('#userName').fill(domain);
console.log(await page.locator('#userName').textContent());
});
