"use client";
import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle search logic
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-sm">
      <div className="relative">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full bg-blue-500 text-white py-2 px-4 rounded-r hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </form>
  );
}
