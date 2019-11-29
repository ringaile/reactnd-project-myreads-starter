import React from 'react';
import PropTypes from 'prop-types';

const Books = (props) => {
        let { books, status } = props;
        let thumbnail = ''
        if (books.imageLinks) thumbnail = books.imageLinks.thumbnail
        let shelf = books.shelf || 'none'
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                            <select value={shelf} onChange={(e) => status(books, e.target.value)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">Remove</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{books.title}</div>
                    <div className="book-authors" >{books.authors}</div>
                </div>
            </li>
        )
}

Books.propTypes = {
    books: PropTypes.array.isRequired,
    status: PropTypes.func.isRequired
  }
export default Books;