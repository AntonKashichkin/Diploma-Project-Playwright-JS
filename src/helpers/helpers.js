import { faker } from '@faker-js/faker';

export class Helpers {
  constructor(page) {
    this.page = page;
    this.user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      };
      
     this.article = {
      title: faker.lorem.words(3),
      about: faker.lorem.sentence(),
      text: faker.lorem.paragraph(),
      tags: faker.lorem.words(2),
    };
  }
}