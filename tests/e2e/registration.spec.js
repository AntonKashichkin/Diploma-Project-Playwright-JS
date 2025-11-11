import { expect } from '@playwright/test';
import { test } from '../../src/fixture/index.js';


test.describe('Registration test for realworld', () => {
  test('User registration @e2e', async ({ createUser, webApp }) => {
    await webApp.mainPage.clickOnSignUpButton();
    await webApp.signUp.fillRegistrationForm(createUser);
    await expect(webApp.signUp.getUserNameElement(createUser.name)).toBeVisible();
  });
});