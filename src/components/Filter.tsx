import React from "react";
import { Book } from "../types/Book";

interface FilterProps {
  books: Book[];
  filters: { genre: string; author: string };
  onFilterChange: (filters: { genre: string; author: string }) => void;
}

const Filter: React.FC<FilterProps> = ({ books, filters, onFilterChange }) => {
  const predefinedGenres = [
    "All",
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Biography",
    "Romance",
    "Horror",
  ];

  const authors = Array.from(new Set(books.map((book) => book.author)));

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, genre: e.target.value });
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, author: e.target.value });
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <label>
        Genre:
        <select value={filters.genre || "All"} onChange={handleGenreChange}>
          {predefinedGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </label>
      <label style={{ marginLeft: "16px" }}>
        Author:
        <select value={filters.author} onChange={handleAuthorChange}>
          <option value="">All</option>
          {authors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Filter;
