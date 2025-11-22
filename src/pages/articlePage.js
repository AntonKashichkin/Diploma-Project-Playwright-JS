import { test } from '@playwright/test';

export class Article {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.getByPlaceholder('Article Title');
    this.articleAbout = page.getByPlaceholder("What's this article about?");
    this.articleText = page.getByPlaceholder('Write your article (in markdown)');
    this.articleTags = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', { name: 'Publish Article' });
    this.errorMessage = page.getByText('Title already exists..');
    this.publishedTag = page.locator('.tag-default.tag-outline');
    this.publishedTitle = page.locator('.container');
    this.publishedText = page.locator('.col-md-12');
  }

  async fillArticleForm(article) {
    return test.step('Fill article form', async (step) => {
      await this.articleTitle.click();
      await this.articleTitle.fill(article.title);
      await this.articleAbout.click();
      await this.articleAbout.fill(article.about);
      await this.articleText.click();
      await this.articleText.fill(article.text);
      await this.articleTags.click();
      await this.articleTags.fill(article.tags);
      await this.publishArticleButton.click();
      return article;
    });
  }

  getArticleTextElement(text) {
    return this.publishedText.filter({ hasText: text });
  }

  getArticleTagsElement(tags) {
    return this.publishedTag.filter({ hasText: tags });
  }

  getArticleTitleElement(title) {
    return this.publishedTitle.filter({ hasText: title });
  }
}
