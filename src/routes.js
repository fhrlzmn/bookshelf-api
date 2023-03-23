const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
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
  {
    path: '/books/{id}',
    method: 'PUT',
    handler: updateBookByIdHandler,
  },
];

module.exports = routes;
