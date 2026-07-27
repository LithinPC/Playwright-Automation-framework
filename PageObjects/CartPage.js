const {test,expect} = require('@playwright/test');

class CartPage

{

    constructor(page)
    {   
        this.page =page;
        this.CartLoad =page.locator('div li').first();
        this.checkoutLink = page.locator('text=Checkout');

    }

    async cartValidation(productName)
    {
        await this.CartLoad.waitFor();
        const bool = await this.ProductLocator(productName).isVisible();
        //has-text is a psedu class used for locating text
        // output is boolean
        expect(bool).toBeTruthy();
        await this.checkoutLink.click();

    }
   
   ProductLocator(productName)
   {
    return this.page.locator("h3:has-text('"+productName+"')");
   }

}

module.exports ={CartPage};