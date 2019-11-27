import React from 'react';
import Books from './Books';
import PropTypes from 'prop-types';

const Booksshelf = (props) => {
    let { books, title, status } = props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <Books books={book} key={book.id} status={status} />
            ))}
          </ol>
        </div>
      </div>
    )
  }

Booksshelf.PropTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.func.isRequired
}
export default Booksshelf;