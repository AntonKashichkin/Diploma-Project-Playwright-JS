import { expect } from '@playwright/test';
import { test } from '../../src/fixture/index.js';


test.describe('Registration test for realworld', () => {
  test('User registration @e2e', async ({ webApp, user }) => {
    await webApp.mainPage.clickOnSignUpButton();
    await webApp.signUp.fillRegistrationForm(user);
    await expect(webApp.signUp.getUserNameElement(user.name)).toBeVisible();
  });
});