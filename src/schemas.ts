export const paginationSchema = {
  description: 'Pagination',
  properties: {
    count: {
      type: 'number',
    },
    currentPage: {
      type: 'number',
    },
    enabled: {
      type: 'boolean',
    },
    lastPage: {
      type: 'number',
    },
    nextPage: {
      type: ['number', 'null'],
    },
    pageSize: {
      type: 'number',
    },
    pages: {
      items: {
        type: 'number',
      },
      type: 'array',
    },
    previousPage: {
      type: ['number', 'null'],
    },
  },
  type: 'object',
};

export const genericFilterSchema = {
  description: 'Generic filter',
  properties: {
    page: {
      type: 'number',
    },
  },
  type: 'object',
};

export const contentIdSchema = {
  description: 'Generic content Id',
  properties: {
    id: {
      type: 'number',
    },
  },
  type: 'object',
};

// Company
export const companySchema = {
  description: 'Single Company',
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
    name: {
      type: 'string',
    },
    company_address: {
      type: 'string',
    },
    company_phone: {
      type: 'string',
    },
    company_email: {
      type: 'string',
    },
    company_website: {
      type: 'string',
    },
  },
};

export const contentDeleteResponseSchema = {
  description: 'Content delete response',
  type: 'object',
  properties: {
    result: {
      type: 'boolean',
    },
  },
};

export const companyUpdateSchema = {
  description: 'Update  Company',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    company_address: {
      type: 'string',
    },
    company_phone: {
      type: 'string',
    },
    company_email: {
      type: 'string',
    },
    company_website: {
      type: 'string',
    },
  },
};

export const companyListSchema = {
  description: 'List of companies',
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: companySchema,
    },
    paging: paginationSchema,
  },
};
// # Company

// Project
export const projectSchema = {
  description: 'Single Project',
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
    name: {
      type: 'string',
    },
    project_description: {
      type: 'string',
    },
    start_date: {
      type: 'string',
    },
    end_date: {
      type: 'string',
    },
  },
};

export const projectUpdateSchema = {
  description: 'Update Project',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    project_description: {
      type: 'string',
    },
    start_date: {
      type: 'string',
    },
    end_date: {
      type: 'string',
    },
  },
};

export const projectListSchema = {
  description: 'List of companies',
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: projectSchema,
    },
    paging: paginationSchema,
  },
};

// # Project

// User
export const userSchema = {
  description: 'Single User',
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
    username: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
    mail: {
      type: 'string',
    },
    birthdate: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    company_id: {
      type: 'number',
    },
  },
};

export const userUpdateSchema = {
  description: 'Update Project',
  type: 'object',
  properties: {
    username: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
    mail: {
      type: 'string',
    },
    birthdate: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
  },
};

export const userListSchema = {
  description: 'List of users',
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: userSchema,
    },
    paging: paginationSchema,
  },
};

// # User
