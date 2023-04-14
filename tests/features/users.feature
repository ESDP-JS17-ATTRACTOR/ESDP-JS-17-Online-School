Feature: Users

  In order to use this system, users must be logged-in.
  For this we have registration and login pages.

  Scenario: User login #5ticket
    Given I am on login page
    When I enter form fields
     | username | azamat |
     | password | 123 |
    And I click "Sign in" button
    Then I see "azamat" in user menu.




