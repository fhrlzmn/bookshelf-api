const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
} = require('./handler');

const routes = [
  {
    path: '/books',
    method: 'POST',
    handler: addBookHandler,
  },
  {
    path: '/books',
    method: 'GET',
    handler: getAllBooksHandler,
  },
  {
    path: '/books/{id}',
    method: 'GET',
    handler: getBookByIdHandler,
  },
];

module.exports = routes;
