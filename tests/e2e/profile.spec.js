import { expect } from '@playwright/test';
import { test } from '../../src/fixture/index.js';
import { faker } from '@faker-js/faker';

test.describe('Profile test for realworld', () => {
    test('User profile should display correct username after login @e2e', async ({ registeredUser, webApp }) => {
        const { name, email, password } = registeredUser;
        await webApp.mainPage.clickLogoutButton();
        await webApp.mainPage.clickOnLoginButton();
        await webApp.loginPage.fillLoginForm(email, password);
        await webApp.mainPage.profileDropdownMenu();
        await expect(webApp.profilePage.getUserNameElement(name)).toBeVisible();
    });

    test('Edit profile @e2e', async ({ registeredUser, webApp }) => {
        const userData = {
            bioText: faker.lorem.sentence(),
        };
        await webApp.mainPage.profileDropdownMenu();
        await webApp.profilePage.editProfile();
        await webApp.profilePage.updateProfile(userData);
        await expect(webApp.profilePage.bioElement).toHaveValue(userData.bioText);
    });
});