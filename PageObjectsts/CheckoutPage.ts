import {test, expect,Locator,Page} from'@playwright/test';

export class CheckoutPage
{
  page : Page;
  Checkoutpageload :Locator;
  Countryfield :Locator;
  dropdown : Locator;
  dropdownResult : Locator;
  couponField : Locator;
  couponSubmit :Locator;
  couponMessage :Locator;
  userLabel :Locator;
  CheckoutBtn :Locator;

    constructor(page:Page)
    {
        this.Checkoutpageload =  page.locator('.payment');
        this.Countryfield = page.locator("[placeholder*='Select Country']");
        this.dropdown = page.locator(".ta-results");
        this.dropdownResult = this.dropdown.locator(".ta-item");
        this.couponField = page.locator("[name='coupon']");
        this.couponSubmit = page.locator("[type='submit']");
        this.couponMessage= page.locator("p.mt-1");
        this.userLabel = page.locator(".user__name label");
        this.CheckoutBtn = page.locator('.action__submit');
    }

    async EnterCountry(countryCode: string ,countryName: string)
    {
        await this.Checkoutpageload.waitFor();
        //await this.Countryfield.pressSequentially(countryCode);
        await this.Countryfield.type(countryCode,{delay:100});//another way to select country from dropdown
//to fill letter by letter pressSequentially is used not fill
        await this.dropdown.waitFor();
        const resultcount = await this.dropdownResult.count();
        console.log(resultcount);
    for (let i=0; i<resultcount; ++i)
        {
    const text: any = await this.dropdownResult.nth(i).textContent();
            if (text.trim() === countryName)
              {
                 await  this.dropdownResult.nth(i).click();
                 break;
              }
         }
    }

    async ApplyCoupon()
    {
        await this.couponField.fill('rahulshettyacademy');
        await this.couponSubmit.click();
        await this.couponMessage.waitFor();
        const couponmessage= await this.couponMessage;
        expect(couponmessage).toHaveText("* Coupon Applied");
    }
   
    async UsernameCheck(username: any)
    {
        expect(this.userLabel).toHaveText(username);
    }

   async CheckoutOrder()
   {
      await this.CheckoutBtn.click();
   }

}

module.exports = {CheckoutPage};