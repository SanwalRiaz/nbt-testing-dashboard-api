import { FastifyInstance } from 'fastify';
import companyRoutes from './company';

export default async function (fastify: FastifyInstance) {
  // register core modules
  fastify.get(
    '/',
    {
      schema: {
        description: 'NBT Testing API',
        summary: 'NBT Testing API',
        tags: ['core'],
        response: {
          200: {
            // description: 'Makinas API',
          },
        },
      },
    },
    async function () {
      return `NBT Testing API`;
    }
  );

  fastify.register(companyRoutes, { prefix: '/company' });
}
