const {When, Then, Given} = require('@cucumber/cucumber');
const {POmanager} = require('../../PageObjects/POmanager');
const {expect} = require('@playwright/test');
const playwright = require('@playwright/test');

Given('Login to the Ecommerce application with {string} and {string}', {timeout :100*1000},async function(username,password){
    
   
    const loginPage = this.pomanager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username,password);
});

When ('Add {string} to Cart', async function (productName){
    const dashboardpage = this.pomanager.getDashboardPage();
    await dashboardpage.ProductAddToCart(productName);
    await dashboardpage.Cartnaviagation();
});


Then ('Verify {string} is displayed on the Cart', async function(productName){
    const cartpage = this.pomanager.getCartPage();
    await cartpage.cartValidation(productName);
 
});

When ('Enter Valid details for {string} and place the order',async function(username1){
    const checkoutpage = this.pomanager.getCheckoutPage();
    await checkoutpage.EnterCountry("ind","India");
    await checkoutpage.ApplyCoupon();
    await checkoutpage.UsernameCheck(username1);
    await checkoutpage.CheckoutOrder();

});
Then ('Verify order ID is present in the Order history page',async function(){
    const orderdetailpage = this.pomanager.getOrderdetailsPage();
    await orderdetailpage.OrderplacedConfirmation();
    const orderId = await orderdetailpage.getOrderID();
    await orderdetailpage.myOrderPageProductSearch(orderId);
    expect(orderId.includes(await orderdetailpage.getProductID())).toBeTruthy();
});

Given('Login to the Ecommerce2 application with {string} and {string}',async function(username2,password2){
  const userName = this.page.locator('#username');
  const signIn = this.page.locator("[name='signin']");
  const cardTitle = this.page.locator(".card-body .card-title");
  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise"); // going to the url
  await this.page.on('request',request=>console.log(request.url()));//listening and printing all request
  await this.page.on('response',response=>console.log(response.url(),response.status()));
  console.log( await this.page.title());
  await userName.fill(username2);
  await this.page.locator("[type='password']").fill(password2);
  await signIn.click();
});

Then ('Error message is displayed',async function(){
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
  
});

