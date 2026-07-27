const {test, expect} = require('@playwright/test');

class OrderdetailsPage
{

    constructor(page)
    {
        this.OrderPageload = page.locator('tbody').first();
        this.OrderMessage = page.locator('.hero-primary');
        this.orderId = page.locator("label.ng-star-inserted").first();
        this.myOrder = page.locator("label[routerlink='/dashboard/myorders']");
        this.myOrderpageLoad = page.locator('tbody').first();
        this.productRows = page.locator("tbody tr");
        this.productdetailId = page.locator(".col-text");


    }

    async OrderplacedConfirmation()
    {
        await this.OrderPageload.waitFor();
        expect(this.OrderMessage).toContainText(" Thankyou for the order. ");
    }
    async getOrderID()
    {
        const orderId= await this.orderId.textContent();
        return orderId;
    }
    
    async myOrderPageProductSearch(orderId)
    {
        await this.myOrder.click();
        await this.myOrderpageLoad.waitFor();
        const rowProduct = await this.productRows;
        for(let i= 0 ; i<await rowProduct.count(); ++i)
        {
           const rowOrderId= await rowProduct.nth(i).locator("th").textContent();
            if(orderId.includes(rowOrderId)) 
            {
                rowProduct.nth(i).locator("button").first().click();
                break;
            }
        }

    }
    
    async getProductID()
    {
        return await this.productdetailId.textContent();
    }
    
}

module.exports ={OrderdetailsPage};