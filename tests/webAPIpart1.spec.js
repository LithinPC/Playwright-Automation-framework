const {test,expect,request} = require('@playwright/test');
const loginPayload = {userEmail: "pc12@gmail.com", userPassword: "Test@123"};
const orderPayload = {orders: [{country: "Bahrain", productOrderedId: "6701364cae2afd4c0b90113c"}]}
let orderId;
let token;

test.beforeAll(async()=>
{
  //login API
  const apiContext=  await request.newContext();
  const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:loginPayload})
  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;
  console.log(token);
 
  //create order API
  const orderResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
  {
    data: orderPayload,
    headers : {
        'authorization' : token,
        'content-type'  : 'application/json'
              },
  })

const orderResponseJson = await orderResponse.json();
console.log(orderResponseJson);
orderId = orderResponseJson.orders[1];
});

test.beforeEach(()=>
{

});


test('@Web E2Eflow Practice',async ({page})=>
{
await page.addInitScript(value => {
    window.localStorage.setItem("token",value)
}, token);
await page.goto("https://rahulshettyacademy.com/client/");
await page.locator("button[routerlink='/dashboard/myorders']").click();
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

});