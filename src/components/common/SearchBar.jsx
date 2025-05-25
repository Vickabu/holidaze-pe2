import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");
  const [filters, setFilters] = useState({
    wifi: false,
    pets: false,
    parking: false,
    breakfast: false,
    guests: 1,
    dateFrom: "",
    dateTo: "",
  });

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "input") {
      setInput(value);
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      q: input.trim(),
      ...filters,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-[#F4E9DC] dark:bg-[#1F3B3C] rounded-lg p-6 shadow-lg max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
          <input
            type="text"
            name="input"
            value={input}
            onChange={handleInputChange}
            placeholder="Søk etter venue..."
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 pl-10 p-3 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-500 transition"
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 transition-transform transform hover:scale-105 active:scale-95 text-white font-semibold py-3 px-8 rounded-md shadow-lg"
        >
          Søk
        </button>
      </div>
    </form>

  );
}
