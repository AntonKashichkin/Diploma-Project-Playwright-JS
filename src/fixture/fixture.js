import { test as base } from '@playwright/test';
import { App } from '../pages/appFacade.js';
import { Api } from '../services/api.service.js';
import { Helpers } from '../helpers/helpers.js';

/**
 * Declare the custom Playwright fixture typings for JS with @ts-check.
 * @typedef {import('../pages/appFacade.js').App} AppType
 * @typedef {import('../services/api.service.js').Api} ApiType
 * @typedef {{name: string, email: string, password: string}} UserType
 * @typedef {{title: string, about: string, text: string, tags: string}} ArticleType
 * @typedef {import('@playwright/test').TestType<{ webApp: AppType, api: ApiType, userData: UserType, registeredUser: UserType, articleData: ArticleType, createdArticle: ArticleType, token: string }, {}>} TestWithWebApp
 */

/** @type {TestWithWebApp} */

export const test = base.extend({
  webApp: async ({ page }, use) => {
    const app = new App(page);
    await app.base.open();
    await use(app);
  },

  api: async ({ request }, use) => {
    let api = new Api(request);
    await use(api);
  },

  userData: async ({}, use) => {
    const userData = Helpers.generateUser();
    await use(userData);
  },

  registeredUser: async ({ webApp, userData }, use) => {
    await webApp.mainPage.clickOnSignUpButton();
    await webApp.signUp.fillRegistrationForm(userData);
    await use(userData);
  },

  articleData: async ({}, use) => {
    const articleData = Helpers.generateArticle();
    await use(articleData);
  },

  createdArticle: async ({ webApp, articleData }, use) => {
    await webApp.mainPage.clickOnNewArticle();
    await webApp.articlePage.fillArticleForm(articleData);
    await webApp.base.open();
    await use(articleData);
  },

  token: async ({ api }, use, testInfo) => {
    const r = await api.challenger.post(testInfo);
    const headers = r.headers();
    const token = headers['x-challenger'];
    await use(token);
  },
});