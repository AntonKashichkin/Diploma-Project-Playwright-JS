import { expect } from '@playwright/test';
import { test } from '../../src/fixture/index.js';

test.describe('Authorization test for realworld', () => {
    test('User authorization @e2e', async ({ webApp, user }) => {
        await webApp.mainPage.clickLogoutButton();
        await webApp.mainPage.clickOnLoginButton();
        await webApp.loginPage.fillLoginForm(user.email, user.password);
        await expect(webApp.loginPage.getUserNameElement(user.name)).toBeVisible();
    });
});