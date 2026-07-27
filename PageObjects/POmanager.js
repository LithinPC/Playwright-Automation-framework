const {LoginPage} = require('../PageObjects/LoginPage');
const {Dashboardpage} = require('../PageObjects/Dashboardpage');
const {CartPage} = require('../PageObjects/CartPage');
const {CheckoutPage} = require('../PageObjects/CheckoutPage');
const {OrderdetailsPage} = require('../PageObjects/OrderdetailsPage');


class POmanager
{

    constructor(page)
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