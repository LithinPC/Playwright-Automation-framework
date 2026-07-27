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


test('Security testing example',async ({page})=>
{
await page.addInitScript(value => { //taking the token and setting the value in local storage
    window.localStorage.setItem("token",value)
}, response.token);
await page.goto("https://rahulshettyacademy.com/client/");
await page.locator("button[routerlink='/dashboard/myorders']").click();
//adding another id to the existng one--shd get unauthorized page error
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id*", 
    route=>route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=666e2e05e2b5443b1f2caf42'})
);
await page.locator("button:has-text('View')").first().click();
await expect(page.locator('p').last()).toHaveText('You are not authorize to view this order');


});