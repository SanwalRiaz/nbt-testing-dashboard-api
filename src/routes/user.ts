import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { NotFound } from 'http-errors';
import users from '../data/users.json';

import {
  userListSchema,
  userSchema,
  contentDeleteResponseSchema,
  contentIdSchema,
  genericFilterSchema,
  userUpdateSchema,
} from '../schemas';
import { getChunk, getNextId, getPagination } from '../utils';
import { ProjectPayload, User, UserPayload } from '../../index';

const listUsers = {
  schema: {
    description: 'Returns list of users',
    tags: ['user'],
    response: {
      200: userListSchema,
    },
    querystring: genericFilterSchema,
  },
  handler: async function (
    request: FastifyRequest<{
      Querystring: { page: number };
      Params: { company_id: string };
    }>
  ) {
    const { page = 1 } = request.query;
    // get company users
    const userList = users.filter(
      (user) => user.company_id === parseInt(request.params.company_id)
    );

    const data = getChunk(userList, 25);
    const { previousPage, nextPage, pages } = getPagination(data.length, page);

    if (page - 1 > data.length) {
      return {
        result: [],
        paging: null,
      };
    }

    return {
      results: data[page - 1] ?? [],
      paging: {
        nextPage,
        previousPage,
        pageSize: 25,
        currentPage: page,
        pages,
        count: userList.length,
      },
    };
  },
};

const getUser = {
  schema: {
    description: 'Returns a single user',
    tags: ['user'],
    response: {
      200: {
        result: userSchema,
      },
    },
    params: contentIdSchema,
  },
  handler: async function (
    request: FastifyRequest<{ Params: { id: string; company_id: string } }>
  ) {
    const { id } = request.params;
    // ^^
    const user = users.find((c: User) => c.id === parseInt(id));

    if (!user) {
      throw new NotFound('User not found');
    }

    return {
      result: user,
    };
  },
};

const updateUser = {
  schema: {
    description: 'Updates a user in place',
    tags: ['user'],
    response: {
      200: {
        result: userSchema,
      },
    },
    params: contentIdSchema,
    body: userUpdateSchema,
  },
  handler: async function (
    request: FastifyRequest<{
      Params: { id: string; company_id: string };
      Body: ProjectPayload;
    }>
  ) {
    const { id } = request.params;
    const user = users.find(
      (c: User) =>
        c.id === parseInt(id) &&
        c.company_id === parseInt(request.params.company_id)
    );

    if (!user) {
      throw new NotFound('User not found');
    }

    const updatedUser = {
      ...user,
      ...request.body,
    };
    // replace the company with the new one
    users.splice(users.indexOf(user), 1, updatedUser);

    return {
      result: updatedUser,
    };
  },
};

const createUser = {
  schema: {
    description: 'Creates a new user',
    tags: ['user'],
    response: {
      201: {
        result: userSchema,
      },
    },
    params: contentIdSchema,
    body: userUpdateSchema,
  },
  handler: async function (
    request: FastifyRequest<{
      Body: UserPayload;
      Params: { company_id: string };
    }>,
    reply: FastifyReply
  ) {
    const id = getNextId(users);

    const user: User = {
      id,
      ...request.body,
      company_id: parseInt(request.params.company_id),
    };

    users.unshift(user);

    return reply.code(201).send({ result: user });
  },
};

const deleteUser = {
  schema: {
    description: 'Updates a user in place',
    tags: ['user'],
    response: {
      204: contentDeleteResponseSchema,
    },
    params: contentIdSchema,
  },
  handler: async function (
    request: FastifyRequest<{
      Params: { id: string; company_id: string };
      Body: ProjectPayload;
    }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    // remove company from companies
    users.splice(
      users.findIndex(
        (c: User) =>
          c.id === parseInt(id) &&
          c.company_id === parseInt(request.params.company_id)
      ),
      1
    );

    return reply.code(204).send({ result: true });
  },
};

export default async function userRoutes(fastify: FastifyInstance) {
  // list companies
  fastify.get('/:company_id/user', listUsers);
  fastify.post('/:company_id/user', createUser);
  fastify.get('/:company_id/user/:id', getUser);
  fastify.put('/:company_id/user/:id', updateUser);
  fastify.delete('/:company_id/user/:id', deleteUser);
}
