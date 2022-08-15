import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { NotFound } from 'http-errors';
import companies from '../data/companies.json';
import {
  companyListSchema,
  companySchema,
  companyUpdateSchema,
  contentDeleteResponseSchema,
  contentIdSchema,
  genericFilterSchema,
} from '../schemas';
import { getChunk, getNextId, getPagination } from '../utils';
import { Company, CompanyPayload } from '../../index';
import projectRoutes from './project';
import userRoutes from './user';

const listCompanies = {
  schema: {
    description: 'Returns list of companies',
    tags: ['company'],
    response: {
      200: companyListSchema,
    },
    querystring: genericFilterSchema,
  },
  handler: async function (
    request: FastifyRequest<{ Querystring: { page: number } }>
  ) {
    const { page = 1 } = request.query;
    const data = getChunk(companies, 25);
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
        pages,
        currentPage: page,
        count: companies.length,
      },
    };
  },
};

const getCompany = {
  schema: {
    description: 'Returns a single company',
    tags: ['company'],
    response: {
      200: {
        result: companySchema,
      },
    },
    params: contentIdSchema,
  },
  handler: async function (
    request: FastifyRequest<{ Params: { id: string } }>
  ) {
    const { id } = request.params;
    const company = companies.find((c: Company) => c.id === parseInt(id));

    if (!company) {
      throw new NotFound('Company not found');
    }

    return {
      result: company,
    };
  },
};

const updateCompany = {
  schema: {
    description: 'Updates a company in place',
    tags: ['company'],
    response: {
      200: {
        result: companySchema,
      },
    },
    params: contentIdSchema,
    body: companyUpdateSchema,
  },
  handler: async function (
    request: FastifyRequest<{ Params: { id: string }; Body: CompanyPayload }>
  ) {
    const { id } = request.params;
    const company = companies.find((c: Company) => c.id === parseInt(id));

    if (!company) {
      throw new NotFound('Company not found');
    }

    const updatedCompany = {
      ...company,
      ...request.body,
    };
    // replace the company with the new one
    companies.splice(companies.indexOf(company), 1, updatedCompany);

    return {
      result: updatedCompany,
    };
  },
};

const createCompany = {
  schema: {
    description: 'Creates a new company',
    tags: ['company'],
    response: {
      201: {
        result: companySchema,
      },
    },
    params: contentIdSchema,
    body: companyUpdateSchema,
  },
  handler: async function (
    request: FastifyRequest<{ Body: CompanyPayload }>,
    reply: FastifyReply
  ) {
    const id = getNextId(companies);

    const company: Company = {
      id,
      ...request.body,
    };

    companies.unshift(company);

    return reply.code(201).send({ result: company });
  },
};

const deleteCompany = {
  schema: {
    description: 'Updates a company in place',
    tags: ['company'],
    response: {
      204: contentDeleteResponseSchema,
    },
    params: contentIdSchema,
  },
  handler: async function (
    request: FastifyRequest<{ Params: { id: string }; Body: CompanyPayload }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    // remove company from companies
    companies.splice(
      companies.findIndex((c: Company) => c.id === parseInt(id)),
      1
    );

    return reply.code(204).send({ result: true });
  },
};

export default async function companyRoutes(fastify: FastifyInstance) {
  // list companies
  fastify.get('', listCompanies);
  fastify.post('', createCompany);
  fastify.get('/:id', getCompany);
  fastify.put('/:id', updateCompany);
  fastify.delete('/:id', deleteCompany);

  fastify.register(projectRoutes);
  fastify.register(userRoutes);
}
