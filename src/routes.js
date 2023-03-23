const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
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
    path: '/books/{bookId}',
    method: 'GET',
    handler: getBookByIdHandler,
  },
  {
    path: '/books/{bookId}',
    method: 'PUT',
    handler: updateBookByIdHandler,
  },
  {
    path: '/books/{bookId}',
    method: 'DELETE',
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
