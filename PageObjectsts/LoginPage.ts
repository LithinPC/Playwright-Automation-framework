import { Locator,Page } from "@playwright/test";

export class LoginPage
{
    page: Page;
    username: Locator;
    password: Locator;
    loginSubmit: Locator;

    constructor(page:Page)
    {
      this.page =page;
      this.username = page.locator('#userEmail');
      this.password = page.locator('#userPassword');
      this.loginSubmit= page.locator("[name='login']");
    }

 async goTo()
 {
    await this.page.goto("https://rahulshettyacademy.com/client/");
 }

async validLogin(username:string,password:string)
{
await this.username.fill(username);
await this.password.fill(password);
await this.loginSubmit.click();
await this.page.waitForLoadState('networkidle');
}

}

module.exports ={LoginPage};