import {test,expect} from '@playwright/test';
import {customtest} from '../Utilities_ts/base-test';
import {POmanager} from'../PageObjectsts/POmanager';

//Convert from JSON-->String-->javascript object
const dataset = JSON.parse(JSON.stringify(require('../Utilities/PracticeTestData.json')));
//driving data from json files

for(const data of dataset)//to run all the datasets
{
 test(`@Web E2Eflow Practice Paramaterization for ${data.username}`,async ({page})=>   //to identify different set run
{
const pomanager = new POmanager(page);
const loginPage = pomanager.getLoginPage();
await loginPage.goTo();
await loginPage.validLogin(data.username,data.password);
const dashboardpage = pomanager.getDashboardPage();
await dashboardpage.ProductAddToCart(data.productName);
await dashboardpage.Cartnaviagation();
const cartpage = pomanager.getCartPage();
await cartpage.cartValidation(data.productName);
const checkoutpage = pomanager.getCheckoutPage();
await checkoutpage.EnterCountry("ind","India");
await checkoutpage.ApplyCoupon();
await checkoutpage.UsernameCheck(data.username);
await checkoutpage.CheckoutOrder();
const orderdetailpage = pomanager.getOrderdetailsPage();
await orderdetailpage.OrderplacedConfirmation();
let orderId :any;
orderId= await orderdetailpage.getOrderID();
await orderdetailpage.myOrderPageProductSearch(orderId);
expect(orderId.includes(await orderdetailpage.getProductID())).toBeTruthy();
//await page.pause();
});
}

customtest('E2Eflow Practice Fixture',async ({page, testDataForOrder})=>   
{

const pomanager = new POmanager(page);
const loginPage = pomanager.getLoginPage();
await loginPage.goTo();
await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
const dashboardpage = pomanager.getDashboardPage();
await dashboardpage.ProductAddToCart(testDataForOrder.productName);
await dashboardpage.Cartnaviagation();
const cartpage = pomanager.getCartPage();
await cartpage.cartValidation(testDataForOrder.productName);
const checkoutpage = pomanager.getCheckoutPage();
await checkoutpage.EnterCountry("ind","India");
await checkoutpage.ApplyCoupon();
await checkoutpage.UsernameCheck(testDataForOrder.username);
await checkoutpage.CheckoutOrder();
const orderdetailpage = pomanager.getOrderdetailsPage();
await orderdetailpage.OrderplacedConfirmation();
let orderId :any;
orderId = await orderdetailpage.getOrderID();
await orderdetailpage.myOrderPageProductSearch(orderId);
expect(orderId.includes(await orderdetailpage.getProductID())).toBeTruthy();
//await page.pause();
});