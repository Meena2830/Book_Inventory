import React from "react";
import { Book } from "../types/Book";
import "../styles/BookList.css";

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete }) => {
  if (books.length === 0) {
    return <p>No books available. Add some books to the inventory!</p>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {books.map((book) => (
        <div
          key={book.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            width: "250px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3>{book.title}</h3>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Genre:</strong> {book.genre}
          </p>
          <p>
            <strong>Price:</strong> ${book.price.toFixed(2)}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button className="button edit-button" onClick={() => onEdit(book)}>
              Edit
            </button>
            <button
              className="button delete-button"
              onClick={() => onDelete(book.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
