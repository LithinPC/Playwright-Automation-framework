const base =require('@playwright/test');

exports.customtest =base.test.extend(
{
    testDataForOrder: {

        username: "pc12@gmail.com",
        password: "Test@123",
        productName: "qwerty"
    
        }
}

)