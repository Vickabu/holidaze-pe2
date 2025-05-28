import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

/**
 * SearchBar component for filtering locations based on user input and criteria.
 *
 * @component
 * @param {Object} props
 * @param {(params: Object) => void} props.onSearch - Callback triggered on search submit with all filter parameters.
 */

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

  /**
   * Handles changes to both the main search input and filter fields.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e
   */

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "input") {
      setInput(value);
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  /**
   * Handles the form submission by passing the current input and filters to `onSearch`.
   * @param {React.FormEvent<HTMLFormElement>} e
   */

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      q: input.trim(),
      ...filters,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 bg-[#1F3B3C] rounded p-6 shadow-lg max-w-4xl mx-auto border border-gray-200"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            name="input"
            value={input}
            onChange={handleInputChange}
            placeholder="Search for destinations, accommodations..."
            className="w-full rounded border border-gray-300  bg-white text-gray-900 pl-10 p-3 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500 transition"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-700 hover:bg-purple-800 transition-transform transform hover:scale-105 text-white font-semibold py-3 px-8 rounded shadow-lg"
        >
          Search
        </button>
      </div>
    </form>
  );
}
