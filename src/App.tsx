import React, { useState } from "react";
import { Book } from "./types/Book";
import Filter from "./components/Filter";
import BookList from "./components/BookList";
import AddBookForm from "./components/BookForm";
import { FaBook } from "react-icons/fa";
import "./App.css";

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      price: 10.99,
    },
    {
      id: "2",
      title: "Sapiens",
      author: "Yuval Noah Harari",
      genre: "Non-Fiction",
      price: 14.99,
    },
  ]);

  const [filters, setFilters] = useState({ genre: "All", author: "" });
  const [editingBook, setEditingBook] = useState<Book | null>(null); // Track the book being edited

  const handleFilterChange = (newFilters: {
    genre: string;
    author: string;
  }) => {
    setFilters(newFilters);
  };

  const handleAddBook = (book: Book) => {
    setBooks((prevBooks) => [
      ...prevBooks,
      { ...book, id: `${prevBooks.length + 1}` }, // Ensure the book has a unique ID
    ]);
  };

  const handleEditBook = (updatedBook: Book) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
    setEditingBook(null); // Reset editingBook after editing
  };

  const handleDeleteBook = (id: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const filteredBooks = books.filter(
    (book) =>
      (filters.genre === "All" || book.genre === filters.genre) &&
      (filters.author === "" || book.author === filters.author)
  );

  return (
    <div>
      <header style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <FaBook size={32} style={{ color: "#007bff" }} />
        <h1>Bookstore Inventory</h1>
        <div className="filter-container">
          <Filter
            books={books}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
      </header>

      <main style={{ padding: "20px" }}>
        <AddBookForm
          onSubmit={handleAddBook}
          editingBook={editingBook} // Pass the editingBook state here
          onEditBook={handleEditBook} // Pass onEditBook function here
        />
        <BookList
          books={filteredBooks}
          onEdit={(book) => setEditingBook(book)} // Set the book being edited
          onDelete={handleDeleteBook}
        />
      </main>
    </div>
  );
};

export default App;
