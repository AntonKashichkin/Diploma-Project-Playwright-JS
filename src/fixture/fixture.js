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
 * @typedef {import('@playwright/test').TestType<{ webApp: AppType, api: ApiType, user: UserType, article: ArticleType, token: string }, {}>} TestWithWebApp
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

  user: async ({ webApp }, use) => {
    const helpers = new Helpers(webApp.page);
    const userData = helpers.user;
    await webApp.mainPage.clickOnSignUpButton();
    await webApp.signUp.fillRegistrationForm(userData);
    await use(userData);
  },

  article: async ({ webApp, user }, use) => {
    await webApp.mainPage.clickOnNewArticle();
    const articleData = await webApp.articlePage.fillArticleForm();
    await use(articleData);
  },

  token: async ({ api }, use, testInfo) => {
    const r = await api.challenger.post(testInfo);
    const headers = r.headers();
    const token = headers['x-challenger'];
    await use(token);
  },
});