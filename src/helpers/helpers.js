import { faker } from '@faker-js/faker';

export class Helpers {
  static generateUser() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }

  static generateArticle() {
    return {
      title: faker.lorem.words(3),
      about: faker.lorem.sentence(),
      text: faker.lorem.paragraph(),
      tags: faker.lorem.words(2),
    };
  }
}