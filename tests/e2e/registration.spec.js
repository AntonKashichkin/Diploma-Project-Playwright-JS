import { expect } from '@playwright/test';
import { test } from '../../src/fixture/index.js';
import { Helpers } from '../../src/helpers/helpers.js';

test.describe('Registration test for realworld', () => {
  test('User registration @e2e', async ({ webApp }) => {
    const user = Helpers.generateUser();
    await webApp.mainPage.clickOnSignUpButton();
    await webApp.signUp.fillRegistrationForm(user);
    await expect(webApp.signUp.getUserNameElement(user.name)).toBeVisible();
  });
});