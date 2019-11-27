import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link, Route } from 'react-router-dom';
import BookShelf from './BookShelf';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books})
    })
  }

  updateShelf = (book, shelf) => {
    if (this.state.books) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([book])

        }))
      })
    }
  }

  filterShelf = (param) => {
    return (this.state.books.filter(
      books => books.shelf === param))
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  books={this.filterShelf('currentlyReading')}
                  title='Current Reading'
                  status={this.updateShelf}
                />
                <BookShelf
                  books={this.filterShelf('wantToRead')}
                  title='Want to Read'
                  status={this.updateShelf}
                />
                <BookShelf
                  books={this.filterShelf('read')}
                  title='Read'
                  status={this.updateShelf}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Go to search page</Link>
            </div>
          </div>
        )} />

        <Route path="/search" render={() => (
          <Search books={this.state.books} status={this.updateShelf}/>
        )} />
      </div>
    )
  }
}

export default BooksApp