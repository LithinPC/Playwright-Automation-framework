Feature: Ecommerce Validations
@Validations
  Scenario Outline: Error validation  
    Given Login to the Ecommerce2 application with "<username>" and "<password>"
    Then Error message is displayed
    
    Examples:
        | username     | password | 
        | rahulshetty  | Test@123 |
        | test@112     | Test@123 |