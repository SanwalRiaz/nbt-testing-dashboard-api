import fastify from 'fastify';
import routes from './routes';

// create server config
export function createServer() {
  const server = fastify({ logger: true });

  server.register(require('@fastify/cors'), {
    origin: ['http://localhost:3000'],
    credentials: true,
    allowedHeaders: [
      'Authorization',
      'Origin',
      'xsrfCookieName',
      'xsrfHeaderName',
      'X-Requested-With',
      'X-CSRFTOKEN',
      'Content-Type',
    ],
  });

  server.register(require('@fastify/swagger'), {
    routePrefix: '/api-docs',
    openapi: {
      info: {
        title: 'NBT Testing API',
        description: 'NBT Testing API Swagger docs',
        version: '0.0.1',
        contact: {
          email: 'engineering@nbt.ag',
        },
      },
      externalDocs: {
        url: 'https://nbt.ag',
        description: 'Find more info here',
      },
      servers: [
        {
          url: 'http://localhost:3009',
          description: 'API Host',
        },
      ],
    },
    uiConfig: {
      // docExpansion: 'full',
      deepLinking: false,
      // defaultModelsExpandDepth: 0,
    },
    staticCSP: true,
    // transformStaticCSP: (header: any) => header,
    exposeRoute: true,
  });

  // register router handlers to handler requests
  server.register(routes);

  return server;
}

export async function initServer() {
  const server = createServer();

  await server.ready();

  return server;
}

export async function startServer() {
  process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
  });

  const server = await initServer();

  await server.listen({
    port: 3009,
    host: process.env.API_HOST || '127.0.0.1',
  });

  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, () =>
      server.close().then((err) => {
        console.log(`close application on ${signal}`);
        process.exit(err ? 1 : 0);
      })
    );
  }
}
