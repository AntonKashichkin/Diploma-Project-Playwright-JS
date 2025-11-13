import { test } from '@playwright/test';

export class Profile {
  constructor(page) {
    this.page = page;
    this.editProfileButton = page.getByRole('link', { name: 'Edit Profile Settings' });
    this.bioInput = page.getByPlaceholder('Short bio about you');
    this.updateButton = page.getByRole('button', { name: 'Update Settings' });
  }

  async editProfile() {
    return test.step('Edit profile', async (step) => {
      await this.editProfileButton.click();
    });
  }

  async updateProfile(userData) {
    return test.step('Update profile', async (step) => {
      await this.bioInput.fill(userData.bioText);
      await this.updateButton.click();
    });
  }

  getUserNameElement(name) {
    return this.page.getByText(name).nth(1);
  }

  get bioElement() {
    return this.bioInput;
  }
}
