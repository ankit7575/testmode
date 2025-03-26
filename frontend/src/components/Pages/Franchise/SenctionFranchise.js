import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./SenctionFranchise.css"; // Importing CSS for styling

const SenctionFranchise = () => {
  const navigate = useNavigate();
  const [selectedFranchise, setSelectedFranchise] = useState(""); // State for selected franchise

  // Static franchise list
  const franchiseList = useMemo(
    () => [
      { id: 1, location: "Narwana" },
      { id: 2, location: "Danoda" },
      { id: 3, location: "Uchana" },
      { id: 4, location: "Jind" },
    ],
    []
  );

  // Handle franchise selection
  const handleFranchiseChange = (e) => {
    setSelectedFranchise(e.target.value);
  };

  // Check if the selected franchise is valid
  const isFranchiseValid = franchiseList.some(
    (franchise) => franchise.location === selectedFranchise
  );

  // Handle the Select button action
  const handleSelectFranchise = () => {
    if (isFranchiseValid) {
      alert(`Logged in to the ${selectedFranchise} Franchise.`);
      navigate("/admin-console"); // ✅ Using navigate instead of window.location.href
    } else {
      alert("Invalid franchise selected.");
    }
  };

  return (
    <div className="franchise-form-container">
      <div className="franchise-form">
        <h2>Select Franchise</h2>
        <select
          className="franchise-dropdown"
          value={selectedFranchise}
          onChange={handleFranchiseChange}
          aria-label="Franchise Selection"
        >
          <option value="">-- Select Franchise --</option>
          {franchiseList.map((franchise) => (
            <option key={franchise.id} value={franchise.location}>
              {franchise.location}
            </option>
          ))}
        </select>

        {/* Select Button */}
        <button
          onClick={handleSelectFranchise}
          className="button"
          aria-label="Select franchise"
          disabled={!selectedFranchise}
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default SenctionFranchise;
