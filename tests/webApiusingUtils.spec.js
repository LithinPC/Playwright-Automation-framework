const {test,expect,request} = require('@playwright/test');
const { ApiUtility } = require('../Utilities/ApiUtility');
const loginPayload = {userEmail: "pc12@gmail.com", userPassword: "Test@123"};
const orderPayload = {orders: [{country: "Bahrain", productOrderedId: "6701364cae2afd4c0b90113c"}]}
let orderId;
let token;
let response;
test.beforeAll(async()=>
{
    const apiContext=  await request.newContext();
    const apiUtility = new ApiUtility(apiContext,loginPayload);
    response =await apiUtility.createOrder(orderPayload);
});

test.beforeEach(()=>
{

});


test('E2Eflow Practice',async ({page})=>
{
await page.addInitScript(value => {
    window.localStorage.setItem("token",value)
}, response.token);
await page.goto("https://rahulshettyacademy.com/client/");
await page.locator("button[routerlink='/dashboard/myorders']").click();
await page.locator('tbody').first().waitFor();
const rowProduct = await page.locator("tbody tr")
for(let i= 0 ; i<await rowProduct.count(); ++i)
{
   const rowOrderId= await rowProduct.nth(i).locator("th").textContent();
    if(response.orderId.includes(rowOrderId)) 
    {
        rowProduct.nth(i).locator("button").first().click();
        break;
    }
}
const productdetailId = await page.locator(".col-text").textContent();
expect(response.orderId.includes(productdetailId)).toBeTruthy();

});