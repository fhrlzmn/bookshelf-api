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
  const finished = pageCount === readPage;
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

function getAllBooksHandler(request, h) {
  const { name, reading, finished } = request.query;

  if (name || reading || finished) {
    const filteredBooks = books.filter((book) => {
      if (name) {
        return book.name.toLowerCase().includes(name.toLowerCase());
      }

      if (reading) {
        if (reading === '1') {
          return book.reading === true;
        }
        if (reading === '0') {
          return book.reading === false;
        }
        return book.reading;
      }

      if (finished) {
        if (finished === '1') {
          return book.finished === true;
        }
        if (finished === '0') {
          return book.finished === false;
        }
        return book.finished;
      }

      return book;
    });

    const newBookLists = filteredBooks.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));

    const response = h.response({
      status: 'success',
      data: {
        books: newBookLists,
      },
    });

    response.code(200);
    return response;
  }

  const newBookLists = books.map((book) => {
    const newBookDetail = {
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    };

    return newBookDetail;
  });

  const response = h.response({
    status: 'success',
    data: {
      books: newBookLists,
    },
  });

  response.code(200);
  return response;
}

function getBookByIdHandler(request, h) {
  const { bookId } = request.params;

  const selectedBook = books.filter((book) => book.id === bookId)[0];

  if (!selectedBook) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      book: selectedBook,
    },
  });
  response.code(200);
  return response;
}

function updateBookByIdHandler(request, h) {
  const { bookId } = request.params;
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
  const updatedAt = new Date().toISOString();

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
  };

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  response.code(200);
  return response;
}

function deleteBookByIdHandler(request, h) {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  books.splice(index, 1);

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
  response.code(200);
  return response;
}

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
