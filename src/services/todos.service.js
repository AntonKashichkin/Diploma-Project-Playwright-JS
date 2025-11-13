import { test } from '@playwright/test';

export class ToDos {
  constructor(request) {
    this.request = request;
  }

  async get(token, testinfo) {
    return test.step('GET /todos', async () => {
      const response = await this.request.get(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token },
      });
      const body = await response.json();
      return body;
    });
  }

  async createNotDoneTodo(token, testinfo, NotDoneTodoData) {
    return test.step('Create todo with doneStatus: false', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: NotDoneTodoData.title,
          description: NotDoneTodoData.description,
          doneStatus: NotDoneTodoData.doneStatus,
        },
      });
      return response;
    });
  }

  async createDoneTodo(token, testinfo, todoData) {
    return test.step('Create todo with doneStatus: true', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: todoData.title,
          description: todoData.description,
          doneStatus: todoData.doneStatus,
        },
      });
      return response;
    });
  }

  async doneStatus(token, testinfo, todoData) {
    return test.step('Create todo with doneStatus: invalid', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          doneStatus: todoData.doneStatus,
        },
      });
      return response;
    });
  }

  async titleLonger(token, testinfo, todoData) {
    return test.step('Create todo with title longer', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: todoData.title,
          description: todoData.description,
          doneStatus: todoData.doneStatus,
        },
      });
      return response;
    });
  }

  async descriptionLonger(token, testinfo, todoData) {
    return test.step('Create todo with description longer', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: todoData.title,
          description: todoData.description,
          doneStatus: todoData.doneStatus,
        },
      });
      return response;
    });
  }

  async maxSizeContent(token, testinfo) {
  return test.step('Create todo with max size content', async () => {
    const title = '5'.repeat(50); // 50 символов
    const description = 'x'.repeat(200); // 200 символов точно

    const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
      headers: { 'X-CHALLENGER': token },
      data: {
        title,
        description,
        doneStatus: true,
      },
    });
    return response;
  });
}

  async contentTooLong(token, testinfo, todoData) {
    return test.step('Create todo with content too long', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: todoData.title,
          description: todoData.description,
          doneStatus: todoData.doneStatus,
        },
      });
      return response;
    });
  }

  async priority(token, testinfo, todoData) {
    return test.step('Create a task with an unsupported parameter', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: todoData.title,
          description: todoData.description,
          doneStatus: todoData.doneStatus,
          priority: todoData.priority,
        },
      });
      return response;
    });
  }

  async put(token, testinfo, todoData) {
    return test.step('Put /todos/{id}', async () => {
      const response = await this.request.put(`${testinfo.project.use.api}/todos/15`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: todoData.title,
          description: todoData.description,
          doneStatus: todoData.doneStatus,
        },
      });
      return response;
    });
  }

  async updatingTask(token, testinfo, todoData) {
    return test.step('Updating a task)', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos/10`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: todoData.title,
          description: todoData.description,
        },
      });
      return response;
    });
  }

  async updatingTaskOfANonExistentTask(token, testinfo, todoData) {
    return test.step('Updating task of a non-existent task)', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos/15`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: todoData.title,
          description: todoData.description,
        },
      });
      return response;
    });
  }

  async fullChangeTask(token, testinfo, todoData) {
    return test.step('Full change task)', async () => {
      const response = await this.request.put(`${testinfo.project.use.api}/todos/1`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: todoData.title,
          description: todoData.description,
          doneStatus: todoData.doneStatus,
        },
      });
      return response;
    });
  }

  async partialUpdate(token, testinfo, todoData) {
    return test.step('Partial update)', async () => {
      const response = await this.request.put(`${testinfo.project.use.api}/todos/3`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          title: todoData.title,
        },
      });
      return response;
    });
  }

  async noTitle(token, testinfo, todoData) {
    return test.step('No title)', async () => {
      const response = await this.request.put(`${testinfo.project.use.api}/todos/3`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          description: todoData.description,
        },
      });
      return response;
    });
  }

  async noAmendId(token, testinfo, todoData) {
    return test.step('No amend id)', async () => {
      const response = await this.request.put(`${testinfo.project.use.api}/todos/3`, {
        headers: { 'X-CHALLENGER': token },
        data: {
          id: todoData.id,
          title: todoData.title,
        },
      });
      return response;
    });
  }

  async deleteTodo(token, testinfo) {
    return test.step('Delete todo)', async () => {
      const response = await this.request.delete(`${testinfo.project.use.api}/todos/5`, {
        headers: { 'X-CHALLENGER': token },
      });
      return response;
    });
  }

  async options(token, testinfo) {
    return test.step('Options)', async () => {
      const response = await fetch(`${testinfo.project.use.api}/todos`, {
        method: 'OPTIONS',
        headers: { 'X-CHALLENGER': token },
      });
      return {
        status: () => response.status,
        statusText: () => response.statusText,
        headers: () => Object.fromEntries(response.headers.entries()),
        text: async () => response.text(),
        ok: () => response.ok,
      };
    });
  }

  async getXML(token, testinfo) {
    return test.step('GET /todos XML', async () => {
      const response = await this.request.get(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token, Accept: 'application/xml' },
      });
      const body = await response.text();
      return body;
    });
  }

  async getJSON(token, testinfo) {
    return test.step('GET /todos JSON', async () => {
      const response = await this.request.get(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token, Accept: 'application/json' },
      });
      return response;
    });
  }

  async getANY(token, testinfo) {
    return test.step('GET /todos ANY', async () => {
      const response = await this.request.get(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token, Accept: '*/*' },
      });
      return response;
    });
  }

  async getXMLandJSON(token, testinfo) {
    return test.step('GET /todos XMLandJSON', async () => {
      const response = await this.request.get(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token, Accept: 'application/xml, application/json' },
      });
      const body = await response.text();
      return body;
    });
  }

  async getNoAccept(token, testinfo) {
    return test.step('GET /todos NoAccept', async () => {
      const response = await this.request.get(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token, Accept: '' },
      });
      return response;
    });
  }

  async getAcceptGzip(token, testinfo) {
    return test.step('GET /todos application/gzip', async () => {
      const response = await this.request.get(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token, Accept: 'application/gzip' },
      });
      return response;
    });
  }

  async createTodoXML(token, testinfo) {
    return test.step('Create todo application/xml', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token, 'Content-Type': 'application/xml', Accept: 'application/xml' },
        data: `
          <todo>
          <title>Completed task</title>
          <description>This task is completed</description>
          <doneStatus>true</doneStatus>
          </todo>
        `,
      });
      const body = await response.text();
       return { response, body };
    });
  }

  async createTodoJSON(token, testinfo, todoData) {
    return test.step('Create todo application/json', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token, 'Content-Type': 'application/json', Accept: 'application/json' },
        data: {
        "title": todoData.title,
        "doneStatus": todoData.doneStatus,
        "description": todoData.description
      },
      });
      const body = await response.json();
      return { response, body };
    });
  }

  async createTodoUnsupportedContentType(token, testinfo, todoData) {
    return test.step('Create todo unsupported content type', async () => {
      const response = await this.request.post(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token, 'Content-Type': 'unsupported', Accept: '*/*' },
        data: {
        "title": todoData.title,
        "doneStatus": todoData.doneStatus,
        "description": todoData.description
      },
      });
      const body = await response.json();
      return { response, body };
    });
  }

  async getFilter(token, testinfo) {
    return test.step('GET /todos?doneStatus=true', async () => {
      const response = await this.request.get(`${testinfo.project.use.api}/todos?doneStatus=true`, {
        headers: { 'X-CHALLENGER': token },
      });
      return response;
    });
  }

  async head(token, testinfo) {
    return test.step('HEAD /todos', async () => {
      const response = await this.request.head(`${testinfo.project.use.api}/todos`, {
        headers: { 'X-CHALLENGER': token },
      });
      return response;
    });
  }

   async headSearch(token, testinfo) {
    return test.step('HEAD /todos', async () => {
      const response = await this.request.head(`${testinfo.project.use.api}/todos/5`, {
        headers: { 'X-CHALLENGER': token },
      });
      return response;
    });
  }

  async getNegative(token, testinfo) {
    return test.step('GET /todos/id negative', async () => {
      const response = await this.request.get(`${testinfo.project.use.api}/todos/15`, {
        headers: { 'X-CHALLENGER': token },
      });
      return response;
    });
  }
  
  async getPositive(token, testinfo) {
    return test.step('GET /todos/id positive', async () => {
      const response = await this.request.get(`${testinfo.project.use.api}/todos/5`, {
        headers: { 'X-CHALLENGER': token },
      });
      return response;
    });
  } 
}
