import { expect } from '@playwright/test';
import { test } from '../../src/fixture/index.js';

test.describe('Profile test for realworld', () => {
    test('User profile should display correct username after login @e2e', async ({ createUser, webApp }) => {
        await webApp.mainPage.clickLogoutButton();
        await webApp.mainPage.clickOnLoginButton();
        await webApp.loginPage.fillLoginForm(createUser.email, createUser.password);
        await webApp.mainPage.profileDropdownMenu();
        await expect(webApp.profilePage.getUserNameElement(createUser.name)).toBeVisible();
  });

    test('Edit profile @e2e', async ({ createUser, webApp }) => {
        await webApp.mainPage.profileDropdownMenu();
        await webApp.profilePage.editProfile();
        await webApp.profilePage.updateProfile();
        await expect(webApp.profilePage.getBioElement()).toBeVisible();
    });
});