import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { NotFound } from 'http-errors';
import projects from '../data/projects.json';

import {
  projectListSchema,
  projectSchema,
  projectUpdateSchema,
  contentDeleteResponseSchema,
  contentIdSchema,
  genericFilterSchema,
} from '../schemas';
import { getChunk, getNextId, getPagination } from '../utils';
import { Project, ProjectPayload } from '../../index';

const listProjects = {
  schema: {
    description: 'Returns list of projects',
    tags: ['project'],
    response: {
      200: projectListSchema,
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
    // get company projects
    const projectList = projects.filter(
      (project) => project.company_id === parseInt(request.params.company_id)
    );

    const data = getChunk(projectList, 25);
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
        count: projectList.length,
      },
    };
  },
};

const getProject = {
  schema: {
    description: 'Returns a single project',
    tags: ['project'],
    response: {
      200: {
        result: projectSchema,
      },
    },
    params: contentIdSchema,
  },
  handler: async function (
    request: FastifyRequest<{ Params: { id: string; company_id: string } }>
  ) {
    const { id } = request.params;
    const project = projects.find(
      (c: Project) =>
        c.id === parseInt(id) &&
        c.company_id === parseInt(request.params.company_id)
    );

    if (!project) {
      throw new NotFound('Project not found');
    }

    return {
      result: project,
    };
  },
};

const updateProject = {
  schema: {
    description: 'Updates a Project in place',
    tags: ['project'],
    response: {
      200: {
        result: projectSchema,
      },
    },
    params: contentIdSchema,
    body: projectUpdateSchema,
  },
  handler: async function (
    request: FastifyRequest<{
      Params: { id: string; company_id: string };
      Body: ProjectPayload;
    }>
  ) {
    const { id } = request.params;
    const project = projects.find(
      (c: Project) =>
        c.id === parseInt(id) &&
        c.company_id === parseInt(request.params.company_id)
    );

    if (!project) {
      throw new NotFound('Project not found');
    }

    const updatedProject = {
      ...project,
      ...request.body,
    };

    // replace the company with the new one
    projects.splice(projects.indexOf(project), 1, updatedProject);

    return {
      result: updatedProject,
    };
  },
};

const createProject = {
  schema: {
    description: 'Creates a new project',
    tags: ['project'],
    response: {
      201: {
        result: projectSchema,
      },
    },
    params: contentIdSchema,
    body: projectUpdateSchema,
  },
  handler: async function (
    request: FastifyRequest<{
      Body: ProjectPayload;
      Params: { company_id: string };
    }>,
    reply: FastifyReply
  ) {
    const id = getNextId(projects);

    const project: Project = {
      id,
      ...request.body,
      company_id: parseInt(request.params.company_id),
    };

    projects.unshift(project);

    return reply.code(201).send({ result: project });
  },
};

const deleteProject = {
  schema: {
    description: 'Updates a project in place',
    tags: ['project'],
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
    projects.splice(
      projects.findIndex(
        (c: Project) =>
          c.id === parseInt(id) &&
          c.company_id === parseInt(request.params.company_id)
      ),
      1
    );

    return reply.code(204).send({ result: true });
  },
};

export default async function projectRoutes(fastify: FastifyInstance) {
  // list companies
  fastify.get('/:company_id/project', listProjects);
  fastify.post('/:company_id/project', createProject);
  fastify.get('/:company_id/project/:id', getProject);
  fastify.put('/:company_id/project/:id', updateProject);
  fastify.delete('/:company_id/project/:id', deleteProject);
}
