class Dashboardpage {

    constructor(page) 
    {
      this.homePageload = page.locator(".card-body b").last();
      this.products = page.locator(".card-body");
      this.gotoCart= page.locator("[routerlink='/dashboard/cart']");
      
    }
        
    async ProductAddToCart(productName)
    {
        await this.homePageload.waitFor();
        for (let i = 0; i < await this.products.count(); ++i) 
            {
            if (await this.products.nth(i).locator('b').textContent() === productName)
            {
                await this.products.nth(i).locator('text= Add To Cart').click();
                break;
            }

            }
    }
    
    async Cartnaviagation()
    {
        await this.gotoCart.click();
    }


}

module.exports = {Dashboardpage};