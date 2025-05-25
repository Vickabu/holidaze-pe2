import React, { useState } from "react";

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
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <input
        type="text"
        name="input"
        value={input}
        onChange={handleInputChange}
        placeholder="Søk etter venue..."
        className="border p-2 rounded w-full"
      />

      
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Søk
      </button>
    </form>
  );
}
{/* <div className="flex gap-4 flex-wrap">
        {["wifi", "pets", "parking", "breakfast"].map((feature) => (
          <label key={feature} className="flex items-center gap-1">
            <input
              type="checkbox"
              name={feature}
              checked={filters[feature]}
              onChange={handleCheckboxChange}
            />
            {feature.charAt(0).toUpperCase() + feature.slice(1)}
          </label>
        ))}
      </div>

      <div className="flex gap-4 items-center flex-wrap">
        <label>
          Gjester:
          <input
            type="number"
            name="guests"
            min="1"
            value={filters.guests}
            onChange={handleInputChange}
            className="w-20 ml-2 p-1 border rounded"
          />
        </label>

        <label>
          Fra:
          <input
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleInputChange}
            className="ml-2 p-1 border rounded"
          />
        </label>

        <label>
          Til:
          <input
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={handleInputChange}
            className="ml-2 p-1 border rounded"
          />
        </label>
      </div> */}

      
 // const handleCheckboxChange = (e) => {
  //   const { name, checked } = e.target;
  //   setFilters((prev) => ({ ...prev, [name]: checked }));
  // };