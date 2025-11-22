import { expect } from '@playwright/test';
import { test } from '../../src/fixture/index.js';

test.describe('Articles test for realworld', () => {
  test('Create new article - positive @e2e', async ({ registeredUser, webApp, articleData}) => {
    await webApp.mainPage.clickOnNewArticle();
    await webApp.articlePage.fillArticleForm(articleData);
    await expect(webApp.articlePage.getArticleTextElement(articleData.text)).toBeVisible();
    await expect(webApp.articlePage.getArticleTitleElement(articleData.title)).toBeVisible();
    await expect(webApp.articlePage.getArticleTagsElement(articleData.tags)).toBeVisible();
  });

  test('Create new article - negative @e2e', async ({ registeredUser, webApp, createdArticle, }) => {
    await webApp.mainPage.clickOnNewArticle();
    await webApp.articlePage.fillArticleForm(createdArticle);
    await expect(webApp.articlePage.errorMessage).toBeVisible();
  });

  test('Popular tags should filter articles correctly @e2e', async ({ registeredUser, webApp }) => {
    await webApp.mainPage.clickAdvertising();
    await expect(webApp.mainPage.advertisingElement).toBeVisible();
    await webApp.mainPage.clickConscendo();
    await expect(webApp.mainPage.conscendoElement).toBeVisible();
  });
});