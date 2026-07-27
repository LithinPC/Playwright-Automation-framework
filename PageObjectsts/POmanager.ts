

import {LoginPage} from '../PageObjectsts/LoginPage';
import {Dashboardpage} from '../PageObjectsts/Dashboardpage';
import {CartPage} from '../PageObjectsts/CartPage';
import {CheckoutPage} from '../PageObjectsts/CheckoutPage';
import {OrderdetailsPage} from '../PageObjectsts/OrderdetailsPage';
import {Page} from '@playwright/test';
export class POmanager
{ 
    LoginPage : LoginPage;
    Dashboardpage : Dashboardpage;
    CartPage : CartPage;
    CheckoutPage : CheckoutPage;
    OrderdetailsPage : OrderdetailsPage;
    page : Page;

    constructor(page: Page)
    {
        this.page =page;
        this.LoginPage = new LoginPage(this.page);
        this.Dashboardpage = new Dashboardpage(this.page);
        this.CartPage = new CartPage(this.page);
        this.CheckoutPage = new CheckoutPage(this.page);
        this.OrderdetailsPage = new OrderdetailsPage(this.page);
    }

    getLoginPage()
    {
        return this.LoginPage;
    }

    getDashboardPage()
    { 
        return this.Dashboardpage;
    }
    
    getCartPage()
    {
        return this.CartPage;
    }

 
    getCheckoutPage()
    {
        return this.CheckoutPage;
    }

    getOrderdetailsPage()
    {
        return this.OrderdetailsPage;
    }
}

module.exports ={POmanager};