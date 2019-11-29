import React from 'react';
import { Link } from 'react-router-dom';
import * as BookAPI from './BooksAPI';
import Books from './Books';
import { Debounce } from 'react-throttle';
import PropTypes from 'prop-types';

class Search extends React.Component {
  state = {
    query: '',
    books: []
  }

  searchBook = (book) => {
    this.setState({ query: book })
    if (this.state.query) {
      BookAPI.search(this.state.query).then(books => {
        if (!books.error) {
          books.map( book => (
            this.props.books.filter(b => b.id === book.id).map(b => book.shelf = b.shelf)
          ) )
          this.setState({ books })
        } else {
          this.setState({ books: [] })
        }
      }).catch(() => (
        console.log(`Error in search Books`)
      ))
      this.setState({ books: [] })
    }
  }

  render() {
    let { books } = this.state;
    let { status } = this.props;
    return (
      (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/" />
            <div className="search-books-input-wrapper">
              <Debounce time="400" handler="onChange">
                <input onChange={(e) => this.searchBook(e.target.value)} type="text" placeholder="Search by title or author" />
              </Debounce>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {books.length < 1 && (
                <p>
                  No data to display
                </p>
              )}

              {books.map(book => (
                <Books books={book} key={book.id} status={status} />
              ))}
            </ol>
          </div>
        </div>
      )
    )
  }
}

Search.propTypes = {
  books: PropTypes.array.isRequired,
  status: PropTypes.func.isRequired
}

export default Search;