export class Base {
  constructor(page) {
    this.page = page;
  }
  async open() {
    await this.page.goto(`/`);
  }
}
