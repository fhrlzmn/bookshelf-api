const Hapi = require('@hapi/hapi');

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

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
}

init();
