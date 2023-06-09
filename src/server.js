const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const PORT = 9000;
const HOST = 'localhost';

async function init() {
  const server = Hapi.server({
    host: HOST,
    port: PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
}

init();
