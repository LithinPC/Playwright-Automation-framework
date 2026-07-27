
import {test as testBase} from '@playwright/test';
interface  TestDataForOrder {
    username: string;
    password: string;
    productName: string;
};

export const customtest =testBase.extend<{testDataForOrder: TestDataForOrder}>(
{
    testDataForOrder: {

        username: "pc12@gmail.com",
        password: "Test@123",
        productName: "qwerty"
    
        }
}

)