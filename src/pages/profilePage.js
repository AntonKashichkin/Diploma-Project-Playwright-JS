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

  async updateProfile() {
    return test.step('Update profile', async (step) => {
      await this.bioInput.fill('I am QA.GURU student');
      await this.updateButton.click();
    });
  }

  getUserNameElement(name) {
    return this.page.getByText(name).nth(1);
  }

  getBioElement(bioText = 'I am QA.GURU student') {
    return this.page.getByText(bioText);
  }
}
