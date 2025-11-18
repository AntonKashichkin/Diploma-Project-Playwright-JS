import { Helpers } from '../helpers/helpers.js';
import { test } from '@playwright/test';

export class SignUp {
  constructor(page) {
    this.page = page;
    this.nameInput = page.getByPlaceholder('Your Name');
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
  }

  async fillRegistrationForm(user) {
    return test.step('Fill registration form', async (step) => {
      await this.nameInput.click();
      await this.nameInput.fill(user.name);
      await this.emailInput.click();
      await this.emailInput.fill(user.email);
      await this.passwordInput.click();
      await this.passwordInput.fill(user.password);
      await this.signUpButton.click();
      return user;
    });
  }

  getUserNameElement(name) {
    return this.page.getByText(name);
  }
}
