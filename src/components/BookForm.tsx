import React, { useState, useEffect } from "react";
import { Book } from "../types/Book";
import "../styles/BookForm.css";

interface BookFormProps {
  onSubmit: (book: Book) => void;
  editingBook: Book | null;
  onEditBook: (book: Book) => void; // Added this prop for editing a book
}

const BookForm: React.FC<BookFormProps> = ({
  onSubmit,
  editingBook,
  onEditBook,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState(0);

  // Update form fields when editingBook changes
  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setGenre(editingBook.genre);
      setPrice(editingBook.price);
    }
  }, [editingBook]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook: Book = {
      id: editingBook ? editingBook.id : "", // Handle existing books or new books
      title,
      author,
      genre,
      price,
    };

    if (editingBook) {
      onEditBook(newBook); // If editing, update the book
    } else {
      onSubmit(newBook); // If adding, submit a new book
    }

    // Reset form fields after submitting
    setTitle("");
    setAuthor("");
    setGenre("");
    setPrice(0);
  };

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Biography",
    "Romance",
    "Horror",
  ];

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "16px" }}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="genre-style">
        <label>Genre:</label>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        >
          <option value="">Select Genre</option>
          {genres.map((gen) => (
            <option key={gen} value={gen}>
              {gen}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </div>
      <button type="submit">{editingBook ? "Update Book" : "Add Book"}</button>
    </form>
  );
};

export default BookForm;
