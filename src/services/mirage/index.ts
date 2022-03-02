import { createServer, Factory, Model } from 'miragejs';
import { faker } from '@faker-js/faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name() {
          return faker.name.findName();
        },
        email() {
          return faker.internet.email();
        },
        createdAt() {
          return faker.date.recent(faker.datatype.number({ min:1,max: 30 }));
        },
      }),
    },

    seeds(server) {
      server.createList('user', 125);
    },

    routes() {
      this.namespace = 'api'; // Routes namespace. E.g /api/users
      this.timing = 750; // 👈 Request delay

      this.get('/users');
      this.post('/users');

      this.namespace = '';
      this.passthrough();
    },
  });

  return server;
}
