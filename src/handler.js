const { nanoid } = require('nanoid');
const books = require('./books');

function addBookHandler(request, h) {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const id = nanoid(16);
  const finished = pageCount === readPage ? true : false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  };

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  books.push(newBook);

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
  response.code(201);
  return response;
}

function getAllBooks(request, h) {
  const filteredBooks = books.map((book) => {
    const filteredBookDetails = {
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    };

    return filteredBookDetails;
  });

  const response = h.response({
    status: 'success',
    data: {
      books: filteredBooks,
    },
  });

  response.code(200);
  return response;
}

module.exports = { addBookHandler, getAllBooks };
