## NBT Testing API

This projects includes a sample API application to utilize in technical challenges for hiring.

The API can be used with frontend applications to provide data sources, but it includes intentional 
bugs for candidates to challenge them.

### Prerequisites
Make sure you have up-to-date version of Node.js available.
This project has been tested on Node.js `v16.15.1`, but it should be working any major version
after `v12`.

### Setup

Please clone or take a copy of the repository and navigate to the `project` directory, and execute 
the following commands.

```shell
npm install
npm start


> dashboard-api@1.0.0 start
> TS_NODE_COMPILER_OPTIONS='{"module":"commonjs"}' ts-node server.ts

{"level":30,"time":1658836024017,"pid":28816,"hostname":"NBTs-MBP.localdomain","msg":"Server listening at http://127.0.0.1:3009"}

```

This should start the node.js server and you can access to the API from the address [http://localhost:3009](http://localhost:3009).

### API Docs

You can reach to the Swagger API documentation from the address [http://localhost:3009/api-docs/static/index.html](http://localhost:3009/api-docs/static/index.html).


### Entities
This projects includes CRUD operations for the following entities:
- Companies
- Company Projects
- Company Users
