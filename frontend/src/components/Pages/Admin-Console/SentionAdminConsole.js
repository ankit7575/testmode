import React from "react";
import { useNavigate } from "react-router-dom";
import "./SentionAdminConsole.css"; // Ensure styles are included

const SentionAdminConsole = () => {
  const navigate = useNavigate(); // React Router's navigate hook

  // Category navigation mapping
  const categoryRoutes = {
    Sales: "",
    Stock: "",
    "Business Insights": "",
    Purchase: "",
  };

  const handleCategoryClick = (category) => {
    const route = categoryRoutes[category];
    if (route) {
      navigate(route); // Navigate to the selected category's route
    }
  };

  return (
    <div className="admin-console-container">
      <h2 className="admin-console-title">Admin Console</h2>
      <div className="admin-console-grid">
        {Object.keys(categoryRoutes).map((category) => (
          <div
            key={category}
            className="admin-console-card"
            onClick={() => handleCategoryClick(category)}
          >
            <p className="admin-console-text">{category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SentionAdminConsole;
