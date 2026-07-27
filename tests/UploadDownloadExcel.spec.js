const ExcelJs= require('exceljs');
const {test,expect} = require('@playwright/test');
async function writeExcelTest(searchText,filePath,replaceText,change)//Step 2- calling the value to the variable of main method
{
  
const workbook = new ExcelJs.Workbook();
await workbook.xlsx.readFile(filePath) //handlng with promises

const worksheet = workbook.getWorksheet('Sheet1');
/////read values from Excel
const output = await readFile(worksheet,searchText)//Step 3- Adding the value to the supporting method variable
//Writing a code to replace the price of the fruit like apple
const cell = worksheet.getCell(output.row,output.column+change.columnChange);
cell.value = replaceText;
workbook.xlsx.writeFile(filePath);
console.log(cell.value) ;//each value
}

async function readFile(worksheet,searchText)//Step 4- Calling the variable here
{
    let output = {row:-1, column:-1};
    worksheet.eachRow((row, rowNumber)=>//each row
    { 
        row.eachCell((cell, colNumber)=>//each cell
        {
            if(cell.value == searchText)//Step 5- Passing the final value here
            {
               output.row = rowNumber;
               output.column = colNumber;
            }
            
        })
    })
return output;
}

test('Upload download test',async ({page})=>
{
const searchText = 'Mango';
const updateValue = '690';
await page.goto("https://rahulshettyacademy.com/upload-download-test/");
const downloadPromise = page.waitForEvent('download');
await page.getByRole('button',{name:'Download'}).click();
await downloadPromise;
writeExcelTest(searchText,"C:/Users/EOIN/Downloads/download.xlsx",updateValue,
    {rowChange:0,columnChange:2});//Step 1--adding the values here
await page.locator('#fileinput').click();
await page.locator('#fileinput').setInputFiles("C:/Users/EOIN/Downloads/download.xlsx");
//type=file should be present to use this playwright upload method to web
const textLocator = page.getByText(searchText);
const desiredRow= await page.getByRole('row').filter({has: textLocator});
expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
});