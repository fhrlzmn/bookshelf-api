const { addBookHandler } = require('./handler');

const routes = [
  {
    path: '/books',
    method: 'POST',
    handler: addBookHandler,
  },
];

module.exports = routes;
