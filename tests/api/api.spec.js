import { expect } from '@playwright/test';
import { test } from '../../src/fixture/index.js';
import { faker } from '@faker-js/faker';

test.describe('API testing', () => {
  test('2. Challenges @get @api', async ({ api, token }, testinfo) => {
    let body = await api.challenges.get(token, testinfo);
    expect(body.challenges.length).toBe(59);
  });

  test('3. Todos  @get @api', async ({ api, token }, testinfo) => {
    let body = await api.todos.get(token, testinfo);
    expect(body.todos.length).toBe(10);
  });

  test('4. Todo  @get @api', async ({ api, token }, testinfo) => {
    let respTodo = await api.todo.get(token, testinfo);
    expect(respTodo.status()).toBe(404);
  });

  test('5. Todos ID positive @get @api', async ({ api, token }, testinfo) => {
    let respTodoId = await api.todos.getPositive(token, testinfo);
    expect(respTodoId.status()).toBe(200);
    const responseBody = await respTodoId.json();
    const todo = responseBody.todos[0];
    expect(todo.id).toBe(5);
    expect(todo.title).toBe('pay invoices');
    expect(todo.doneStatus).toBe(false);
    expect(todo.description).toBe('');
  });

  test('6. Todos ID negative @get @api', async ({ api, token }, testinfo) => {
    let respTodoId = await api.todos.getNegative(token, testinfo);
    const response = await respTodoId.json();
    expect(response.errorMessages.some((msg) => msg.includes('Could not find an instance with todos/'))).toBe(true);
    expect(respTodoId.status()).toBe(404);
  });

  test('7. Todos filter @get @api', async ({ api, token }, testinfo) => {
    const todoData = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      doneStatus: true,
    };
    const NotDoneTodoData = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      doneStatus: false,
    };
    await api.todos.createDoneTodo(token, testinfo, todoData);
    await api.todos.createNotDoneTodo(token, testinfo, NotDoneTodoData);
    let respTodosFilter = await api.todos.getFilter(token, testinfo);
    const response = await respTodosFilter.json();
    const todos = response.todos[0];
    expect(respTodosFilter.status()).toBe(200);
    expect(todos.doneStatus).toBe(true);
  });

  test('8. Todos  @head @api', async ({ api, token }, testinfo) => {
    let response = await api.todos.head(token, testinfo);
    expect(response.status()).toBe(200);
  });

  test('9. Todos  @post @api', async ({ api, token }, testinfo) => {
    const todoData = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      doneStatus: true,
    };
    let response = await api.todos.createDoneTodo(token, testinfo, todoData);
    const r = await response.json();
    expect(response.status()).toBe(201);
    expect(r.title).toBe(todoData.title);
    expect(r.description).toBe(todoData.description);
    expect(r.doneStatus).toBe(todoData.doneStatus);
  });

  test('10. Todos doneStatus  @post @api', async ({ api, token }, testinfo) => {
    const todoData = {
      doneStatus: 'invalid',
    };
    let response = await api.todos.doneStatus(token, testinfo, todoData);
    const r = await response.json();
    expect(response.status()).toBe(400);
    expect(r.errorMessages).toContain('Failed Validation: doneStatus should be BOOLEAN but was STRING');
  });

  test('11. Todos title too long  @post @api', async ({ api, token }, testinfo) => {
    const todoData = {
      title: faker.lorem.words(51),
      description: faker.lorem.sentence(),
      doneStatus: true,
    };
    let response = await api.todos.titleLonger(token, testinfo, todoData);
    const r = await response.json();
    expect(response.status()).toBe(400);
    expect(r.errorMessages).toContain(
      'Failed Validation: Maximum allowable length exceeded for title - maximum allowed is 50'
    );
  });

  test('12. Todos description too long  @post @api', async ({ api, token }, testinfo) => {
    const todoData = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(201),
      doneStatus: true,
    };
    let response = await api.todos.descriptionLonger(token, testinfo, todoData);
    const r = await response.json();
    expect(response.status()).toBe(400);
    expect(r.errorMessages).toContain(
      'Failed Validation: Maximum allowable length exceeded for description - maximum allowed is 200'
    );
  });

  test('13. Todos max size content  @post @api', async ({ api, token }, testinfo) => {
    let response = await api.todos.maxSizeContent(token, testinfo);
    const r = await response.json();
    expect(response.status()).toBe(201);
    expect(r.title.length).toBe(50);
    expect(r.description.length).toBe(200);
  });

  test('14. Todos Content too long  @post @api', async ({ api, token }, testinfo) => {
    const todoData = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(5001),
      doneStatus: true,
    };
    let response = await api.todos.contentTooLong(token, testinfo, todoData);
    const r = await response.json();
    expect(response.status()).toBe(413);
    expect(r.errorMessages).toContain('Error: Request body too large, max allowed is 5000 bytes');
  });

  test('15. Todos priority @post @api', async ({ api, token }, testinfo) => {
    const todoData = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      doneStatus: true,
      priority: 'extra',
    };
    let response = await api.todos.priority(token, testinfo, todoData);
    const r = await response.json();
    expect(response.status()).toBe(400);
    expect(r.errorMessages).toContain('Could not find field: priority');
  });

  test('16. Todos put @put @api', async ({ api, token }, testinfo) => {
    const todoData = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(0),
    };
    let response = await api.todos.put(token, testinfo, todoData);
    const r = await response.json();
    expect(response.status()).toBe(400);
    expect(r.errorMessages).toContain('Cannot create todo with PUT due to Auto fields id');
  });

  test('17. Update title @post @api', async ({ api, token }, testinfo) => {
    const todoData = {
      title: faker.lorem.words(3),
    };
    let response = await api.todos.updatingTask(token, testinfo, todoData);
    const r = await response.json();
    expect(response.status()).toBe(200);
    expect(r.title).toBe(todoData.title);
  });

  test('18. Updating a task of a non-existent task @post @api', async ({ api, token }, testinfo) => {
    const todoData = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(0),
    };
    let response = await api.todos.updatingTaskOfANonExistentTask(token, testinfo, todoData);
    const r = await response.json();
    expect(response.status()).toBe(404);
    expect(r.errorMessages).toContain('No such todo entity instance with id == 15 found');
  });

  test('19. Fill change task @put @api', async ({ api, token }, testinfo) => {
    const todoData = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(0),
      doneStatus: false,
    };
    let response = await api.todos.fullChangeTask(token, testinfo, todoData);
    const r = await response.json();
    expect(response.status()).toBe(200);
    expect(r.title).toBe(todoData.title);
    expect(r.description).toBe(todoData.description);
    expect(r.doneStatus).toBe(false);
  });

  test('20. Partial update @put @api', async ({ api, token }, testinfo) => {
    const todoData = {
      title: faker.lorem.words(3),
      doneStatus: false,
    };
    let response = await api.todos.partialUpdate(token, testinfo, todoData);
    const r = await response.json();
    expect(response.status()).toBe(200);
    expect(r.title).toBe(todoData.title);
    expect(r.description).toBe('');
    expect(r.doneStatus).toBe(todoData.doneStatus);
  });

  test('21. No title @put @api', async ({ api, token }, testinfo) => {
    const todoData = {
      description: faker.lorem.words(3),
    };
    let response = await api.todos.noTitle(token, testinfo, todoData);
    const r = await response.json();
    expect(response.status()).toBe(400);
    expect(r.errorMessages).toContain('title : field is mandatory');
  });

  test('22. No amend id @put @api', async ({ api, token }, testinfo) => {
    const todoData = {
      id: 4,
      title: faker.lorem.words(3),
    };
    let response = await api.todos.noAmendId(token, testinfo, todoData);
    const r = await response.json();
    expect(response.status()).toBe(400);
    expect(r.errorMessages).toContain('Can not amend id from 3 to 4');
  });

  test('23. Delete todo @delete @api', async ({ api, token }, testinfo) => {
    let response = await api.todos.deleteTodo(token, testinfo);
    expect(response.status()).toBe(200);
    let r = await api.todos.headSearch(token, testinfo);
    expect(r.status()).toBe(404);
  });

  test('24. Options @options @api', async ({ api, token }, testinfo) => {
    let response = await api.todos.options(token, testinfo);
    expect(response.status()).toBe(200);
    const headers = response.headers();
    expect(headers.allow).toContain('GET');
    expect(headers.allow).toContain('POST');
    expect(headers.allow).toContain('HEAD');
    expect(headers.allow).toContain('OPTIONS');
  });

  test('25. Todos XML  @get @api', async ({ api, token }, testinfo) => {
    let xml = await api.todos.getXML(token, testinfo);
    expect(xml).toContain('<doneStatus>false</doneStatus>');
  });

  test('26. Todos JSON  @get @api', async ({ api, token }, testinfo) => {
    const response = await api.todos.getJSON(token, testinfo);
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

  test('27. Todos ANY @get @api', async ({ api, token }, testinfo) => {
    const response = await api.todos.getANY(token, testinfo);
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
    const body = await response.json();
    expect(body.todos.length).toBeGreaterThan(0);
  });

  test('28. Todos XMLandJSON  @get @api', async ({ api, token }, testinfo) => {
    let xml = await api.todos.getXMLandJSON(token, testinfo);
    expect(xml).toContain('<doneStatus>false</doneStatus>');
  });

  test('29. Todos no accept @get @api', async ({ api, token }, testinfo) => {
    const response = await api.todos.getNoAccept(token, testinfo);
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

  test('30. Todos gzip @get @api', async ({ api, token }, testinfo) => {
    const response = await api.todos.getAcceptGzip(token, testinfo);
    expect(response.status()).toBe(406);
    const body = await response.json();
    expect(body.errorMessages).toContain('Unrecognised Accept Type');
  });

  test('31. Create todos XML @post @api', async ({ api, token }, testinfo) => {
    let { response, body } = await api.todos.createTodoXML(token, testinfo);
    expect(response.headers()['content-type']).toContain('application/xml');
    expect(body).toContain('<description>This task is completed</description>');
    expect(response.status()).toBe(201);
  });

  test('32. Create todos JSON @post @api', async ({ api, token }, testinfo) => {
    const todoData = {
      title: faker.lorem.words(3),
    };
    let { response, body } = await api.todos.createTodoJSON(token, testinfo, todoData);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(body.title).toContain(todoData.title);
    expect(response.status()).toBe(201);
  });

  test('33. Create todos unsupported Content-Type @post @api', async ({ api, token }, testinfo) => {
    const todoData = {
      title: faker.lorem.words(3),
    };
    let { response, body } = await api.todos.createTodoUnsupportedContentType(token, testinfo, todoData);
    expect(body.errorMessages).toContain('Unsupported Content Type - unsupported');
    expect(response.status()).toBe(415);
  });

  test('34. Return the progress data @get @api', async ({ api, token }, testInfo) => {
    let response = await api.challenger.getExistingXchallenger(testInfo, token);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('xChallenger');
  });

  test('35. Restore that challengers progress into memory @put @api', async ({ api, token }, testInfo) => {
    const data = await api.challenger.getExistingXchallenger(testInfo, token);
    const bodyData = await data.json();
    expect(bodyData).toHaveProperty('xChallenger');
    let response = await api.challenger.putRestoreProgress(testInfo, token, bodyData);
    expect(response.status()).toBe(200);
  });
});