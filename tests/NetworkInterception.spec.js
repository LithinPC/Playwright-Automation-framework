const {test,expect,request} = require('@playwright/test');
const { ApiUtility } = require('../Utilities/ApiUtility');
const loginPayload = {userEmail: "pc12@gmail.com", userPassword: "Test@123"};
const orderPayload = {orders: [{country: "Bahrain", productOrderedId: "6701364cae2afd4c0b90113c"}]};
const fakeorderResponse = {data:[], message : "No Orders"};
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
await page.addInitScript(value => { //taking the token and setting the value in local storage
    window.localStorage.setItem("token",value)
}, response.token);
await page.goto("https://rahulshettyacademy.com/client/");
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route=>
    {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakeorderResponse);//Convert this java format to JSON
        route.fulfill
        (
            {
                response,
                body
            }
        );
    
    }
);
await page.locator("button[routerlink='/dashboard/myorders']").click();

await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");//waiting for response
console.log(await page.locator('.mt-4').textContent());

});