import { expect } from '@playwright/test';
import { test } from '../../src/fixture/index.js';

test.describe('Authorization test for realworld', () => {
    test('User authorization @e2e', async ({ createUser, webApp }) => {
        await webApp.mainPage.clickLogoutButton();
        await webApp.mainPage.clickOnLoginButton();
        await webApp.loginPage.fillLoginForm(createUser.email, createUser.password);
        await expect(webApp.loginPage.getUserNameElement(createUser.name)).toBeVisible();
    });
});