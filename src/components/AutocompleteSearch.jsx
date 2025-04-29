// AutocompleteSearch.js
import React, { useState } from "react";

const AutocompleteSearch = ({ value, onChange, doctors }) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    onChange(query);

    if (query.length > 0) {
      const matches = doctors
        .filter((doctor) =>
          doctor.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 3);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="search-container w-full text-sm z-50 relative">
      <input
        className="w-full h-8 rounded-md px-5"
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Search doctors..."
        data-testid="autocomplete-input"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list z-50 rounded-md">
          {suggestions.map((doctor) => (
            <li
              className="bg-white cursor-pointer ml-3 border border-solid border-gray-200"
              key={doctor.id}
              onClick={() => onChange(doctor.name)}
              data-testid="suggestion-item"
            >
              <div className="flex">
              <div className="mt-1 ml-2">
                <img
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-100"
                  src={doctor.photo}
                  alt={doctor.name || "Doctor image"}
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
              <div>
                {doctor.name}
                <p className="text-gray-600 ml-1 text-xs">
                  {doctor.specialities[0].name}
                </p>
              </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteSearch;
