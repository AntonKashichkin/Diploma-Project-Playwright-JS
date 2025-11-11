import { expect } from '@playwright/test';
import { test } from '../../src/fixture/index.js';

test.describe('Articles test for realworld', () => {
  test('Create new article - positive @e2e', async ({ createUser, webApp}) => {
    await webApp.mainPage.clickOnNewArticle();
    const articleDate = await webApp.articlePage.fillArticleForm();
    await expect(webApp.articlePage.getArticleTextElement(articleDate.text)).toBeVisible();
  });

  test('Create new article - negative @e2e', async ({ createUser, createArticle, webApp}) => {
    await webApp.page.waitForLoadState('networkidle');
    await webApp.mainPage.clickOnNewArticle();
    await webApp.articlePage.fillArticleForm(createArticle);
    await expect(webApp.articlePage.errorMessage).toBeVisible();
  });

  test('Popular tags should filter articles correctly @e2e', async ({ createUser, webApp }) => {
    await webApp.mainPage.clickAdvertising();
    await expect(webApp.mainPage.advertisingElement).toBeVisible();
    await webApp.mainPage.clickConscendo();
    await expect(webApp.mainPage.conscendoElement).toBeVisible();
  });
});