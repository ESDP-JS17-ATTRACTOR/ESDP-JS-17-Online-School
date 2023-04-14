const { I } = inject();

Given('I am on login page', () => {
  I.amOnPage('/login');
  I.wait(30);
});

When('I enter form fields', () => {
  // From "features/users.feature" {"line":8,"column":5}
  throw new Error('Not implemented yet');
});

When('I click {string} button', () => {
  // From "features/users.feature" {"line":11,"column":5}
  throw new Error('Not implemented yet');
});

Then('I see {string} in user menu.', () => {
  // From "features/users.feature" {"line":12,"column":5}
  throw new Error('Not implemented yet');
});
