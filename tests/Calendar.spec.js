const {test,expect} = require('@playwright/test')

test('E2Eflow Practice',async ({browser})=>
{
const context = await browser.newContext();
const page = await context.newPage();

const month ='7';
const date ='25';
const year ='2028';
const expectedList = [month, date, year];

await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
await page.locator('.react-date-picker__inputGroup').click();
await page.locator('.react-calendar__navigation__label__labelText').click();
await page.locator('.react-calendar__navigation__label__labelText').click();
//await page.locator('.react-calendar__decade-view__years__year').nth(Number(year)).click();
await page.getByText(year).click();
await page.locator('.react-calendar__year-view__months__month').nth(Number(month)-1).click();
await page.locator('//abbr[text()='+date+']').click();
const inputs = await page.locator('.react-date-picker__inputGroup__input');
for (let i=0;i<inputs.length;++i)
{
    const value= inputs(i).getAttribute('value');
    expect(value).toEqual(expectedList);
}
});