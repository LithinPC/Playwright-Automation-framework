const {test, expect} = require('@playwright/test');


test.only('Network Abort test', async function({browser}) // async to be added whenever there is await
{
// await to be used for each step to executed one after the other
//chrome -plugin/cookies 
  const context = await browser.newContext();  //creating new instance on chrome and adding the cookies and plugins at ease
  const page =await context.newPage();// creating a new page to execute test cases
  page.route('**/*.{jpg,jpeg,png}',route=>route.abort());//'**/*.css or .{jpeg,jpg,png}
  const userName = page.locator('#username');
  const signIn = page.locator("[name='signin']");
  const cardTitle = page.locator(".card-body .card-title");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise"); // going to the url
  await page.on('request',request=>console.log(request.url()));//listening and printing all request
  await page.on('response',response=>console.log(response.url(),response.status()));
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

