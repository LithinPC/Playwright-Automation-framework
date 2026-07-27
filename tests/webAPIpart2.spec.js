const {test,expect} = require('@playwright/test');
let webContext;

test.beforeAll(async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const email= 'pc12@gmail.com';
   await page.goto("https://rahulshettyacademy.com/client/");
    console.log(await page.title());
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill('Test@123');
    await page.locator("[name='login']").click();
    await page.locator(".card-body b").last().waitFor();
    await context.storageState({path:'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});

})

test('E2Eflow using webApi part2',async ()=>
{
const page = await webContext.newPage();
const products = page.locator(".card-body");
const productName = 'qwerty';
const email= 'pc12@gmail.com';
await page.goto("https://rahulshettyacademy.com/client/");
await page.locator(".card-body b").last().waitFor();
console.log(await products.locator('b').allTextContents());
console.log(await products.count());
for (let i=0; i<await products.count() ; ++i)
{
  if (await products.nth(i).locator('b').textContent() == productName)
  {
    await products.nth(i).locator('text= Add To Cart').click();
    break;
   }
}
await page.locator("[routerlink='/dashboard/cart']").click();
await page.locator('div li').first().waitFor();
const bool = await page.locator("h3:has-text('qwerty')").isVisible();
//has-text is a psedu class used for locating text
// output is boolean
expect(bool).toBeTruthy();
await page.locator('text=Checkout').click();
await page.locator('.payment').waitFor();
await page.locator("[placeholder='Select Country']").pressSequentially("ind");
//to fill letter by letter pressSequentially is used not fill
const dropdown = await page.locator(".ta-results");
await dropdown.waitFor();
const resultcount = await dropdown.locator(".ta-item").count();
console.log(resultcount);
for (let i=0; i<resultcount; ++i)
{
    const text = await dropdown.locator(".ta-item").nth(i).textContent();
    if (text ===' India')
    {
       await  dropdown.locator(".ta-item").nth(i).click();
       break;
    }
}
await page.locator("[name='coupon']").fill('rahulshettyacademy');
await page.locator("[type='submit']").click();
await page.locator("p.mt-1").waitFor();
const couponmessage= await page.locator("p.mt-1");
expect(couponmessage).toHaveText("* Coupon Applied");
expect(page.locator(".user__name label")).toHaveText(email);
await page.locator('.action__submit').click();
await page.locator('tbody').first().waitFor();
expect(page.locator('.hero-primary')).toContainText(" Thankyou for the order. ");
const orderId= await page.locator("label.ng-star-inserted").first().textContent();
console.log(orderId);
await page.locator("label[routerlink='/dashboard/myorders']").click();
await page.locator('tbody').first().waitFor();
const rowProduct = await page.locator("tbody tr")
for(let i= 0 ; i<await rowProduct.count(); ++i)
{
   const rowOrderId= await rowProduct.nth(i).locator("th").textContent();
    if(orderId.includes(rowOrderId)) 
    {
        rowProduct.nth(i).locator("button").first().click();
        break;
    }
}
const productdetailId = await page.locator(".col-text").textContent();
expect(orderId.includes(productdetailId)).toBeTruthy();
await page.pause();
});