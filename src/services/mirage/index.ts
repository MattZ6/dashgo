import { createServer, Factory, Model, Response } from 'miragejs';
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
          return faker.date.recent(faker.datatype.number({ min:1, max: 30 }));
        },
      }),
    },

    seeds(server) {
      server.createList('user', 125);
    },

    routes() {
      this.namespace = 'api'; // Routes namespace. E.g /api/users
      this.timing = 750; // 👈 Request delay

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all('user').length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user'))
          .users
          .sort((prev, next) => next.createdAt.getTime() > prev.createdAt.getTime() ? 1 : -1)
          .slice(pageStart, pageEnd);

        return new Response(
          200,
          { 'X-Total-Count': String(total) },
          { users }
        );
      });

      this.get('/users/:id');

      this.post('/users');

      this.namespace = '';
      this.passthrough();
    },
  });

  return server;
}
