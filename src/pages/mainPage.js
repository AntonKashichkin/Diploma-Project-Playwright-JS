import { test } from '@playwright/test';

export class MainPage {
  constructor(page) {
    this.page = page;
    this.signUp = page.getByRole('link', { name: 'Sign up' });
    this.login = page.getByRole('link', { name: 'Login' });
    this.newArticle = page.getByRole('link', { name: 'New Article' });
    this.advertisingTag = page.getByRole('button', { name: 'реклама' });
    this.conscendoTag = page.getByRole('button', { name: 'conscendo' });
    this.dropdownMenu = page.locator('.nav-link.dropdown-toggle');
    this.profileButton = page.getByRole('link', { name: 'Profile' });
    this.advertisingElement = page.getByText('реклама').first();
    this.conscendoElement = page.getByText('conscendo').first();
    this.logoutButton = page.getByRole('link', { name: 'Logout' });
  }

  async clickOnSignUpButton() {
    return test.step('Go to the registration page', async (step) => {
      await this.signUp.click();
    });
  }

  async clickOnLoginButton() {
    return test.step('Go to the login page', async (step) => {
      await this.login.click();
    });
  }

  async clickOnNewArticle() {
    return test.step('Go to the new article', async (step) => {
      await this.newArticle.click();
    });
  }

  async clickAdvertising() {
    return test.step('Click advertising', async (step) => {
      await this.advertisingTag.click();
    });
  }
  async clickConscendo() {
    return test.step('Click conscendo', async (step) => {
      await this.conscendoTag.click();
    });
  }

  async profileDropdownMenu() {
    return test.step('Open profile page', async (step) => {
      await this.dropdownMenu.click();
      await this.profileButton.click();
    });
  }

  async clickLogoutButton() {
    return test.step('Click logout button', async (step) => {
      await this.dropdownMenu.click();
      await this.logoutButton.click();
    });
  }
}
