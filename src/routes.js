const { addBookHandler, getAllBooks } = require('./handler');

const routes = [
  {
    path: '/books',
    method: 'POST',
    handler: addBookHandler,
  },
  {
    path: '/books',
    method: 'GET',
    handler: getAllBooks,
  },
];

module.exports = routes;
