Feature: Ecommerce Validations
 @Regression
  Scenario: Placing the order
    Given Login to the Ecommerce application with "pc15@gmail.com" and "Test@123"
    When Add "qwerty" to Cart
    Then Verify "qwerty" is displayed on the Cart
    When Enter Valid details for "pc15@gmail.com" and place the order
    Then Verify order ID is present in the Order history page


    @Validations
  Scenario Outline: Error validation  
    Given Login to the Ecommerce2 application with "<username>" and "<password>"
    Then Error message is displayed
    
    Examples:
        | username     | password | 
        | rahulshetty  | Test@123 |
        | test@112     | Test@123 |
    