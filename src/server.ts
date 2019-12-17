import http from 'http';
import express from 'express';
import { applyMiddleware, applyRoutes } from './utils';
import middleware from './middleware';
import errorHandlers from './middleware/errorHandlers';
import routes from './services';
import { Logger } from 'winston';
import { createLogger } from './utils/logger';
import { createConnectionPool } from './utils/mysql';
import { criarTabela, criarTabelaPersonagem } from './utils/dynamo.client';

const logger: Logger = createLogger('server');

createConnectionPool();

Promise.all([criarTabela(), criarTabelaPersonagem()])
    .then(data => console.log('data :', data))
    .catch(err => console.error(err))

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const { PORT = 3000 } = process.env;
const server = http.createServer(router);

server.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
});

process.on('uncaughtException', e => {
    console.log(e);
    process.exit(1); 
});

process.on('unhandledRejection', e => {
    console.log(e);
    process.exit(1);
});
