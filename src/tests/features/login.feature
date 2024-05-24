Feature: Login

  Scenario: Successful login with valid credentials
    Given I navigate to the login page
    When I enter valid credentials
    Then I should see the dashboard
