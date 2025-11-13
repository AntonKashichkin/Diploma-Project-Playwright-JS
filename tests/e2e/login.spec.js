import { expect } from '@playwright/test';
import { test } from '../../src/fixture/index.js';

test.describe('Authorization test for realworld', () => {
    test('User authorization @e2e', async ({ registeredUser, webApp }) => {
        const { name, email, password } = registeredUser;
        await webApp.mainPage.clickLogoutButton();
        await webApp.mainPage.clickOnLoginButton();
        await webApp.loginPage.fillLoginForm(email, password);
        await expect(webApp.loginPage.getUserNameElement(name)).toBeVisible();
    });
});