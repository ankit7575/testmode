import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Navigation.css"; // Ensure your styles are included

// 📌 Dropdown Component for Categories
function Dropdown({ category, options, isOpen, onToggle }) {
  return (
    <li className="menu-category">
      <div
        className="category-wrapper"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onToggle()}
        aria-expanded={isOpen}
      >
        <div className={`category-inner-wrapper ${isOpen ? "category-selected" : ""}`}>
          <span className="category-title">
            {category} <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
          </span>
        </div>
      </div>
      {isOpen && (
        <ul className="subcategory-list">
          {options.map(({ name, link }, index) => (
            <li className="subcategory-item" key={index}>
              <Link to={link} className="subcategory-link">
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

// ✅ Prop Types for Dropdown Component
Dropdown.propTypes = {
  category: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

// 📌 Main Navigation Component
function StockNavigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState({});

  const toggleDropdown = (category) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // ✅ Well-structured Navigation Menu
  const menuItems = [
    {
      category: "Stock Management",
      options: [
        { name: "Add New Stock", link: "/stock/add" },
        { name: "Update Stock", link: "/stock/update" },
        { name: "View All Stock", link: "/stock/view" },
        { name: "Stock Categorization", link: "/stock/categories" },
      ],
    },
    {
      category: "Stock Alerts & Notifications",
      options: [
        { name: "Low Stock Alerts", link: "/stock/alerts/low" },
        { name: "Out of Stock Products", link: "/stock/alerts/out-of-stock" },
        { name: "Expiring Stock Alerts", link: "/stock/alerts/expiring" },
        { name: "Damaged Stock Alerts", link: "/stock/alerts/damaged" },
        { name: "Overstock Alerts", link: "/stock/alerts/overstock" },
      ],
    },
    {
      category: "Supplier Management",
      options: [
        { name: "Add New Supplier", link: "/stock/suppliers/add" },
        { name: "Supplier List", link: "/stock/suppliers/list" },
        { name: "Supplier Orders", link: "/stock/suppliers/orders" },
        { name: "Supplier Performance Review", link: "/stock/suppliers/performance" },
      ],
    },
    {
      category: "Stock Reports & Analytics",
      options: [
        { name: "Daily Stock Report", link: "/stock/reports/daily" },
        { name: "Weekly Stock Report", link: "/stock/reports/weekly" },
        { name: "Monthly Stock Report", link: "/stock/reports/monthly" },
        { name: "Annual Stock Report", link: "/stock/reports/annual" },
      ],
    },
    {
      category: "Return and Refund Management",
      options: [
        { name: "Return Product List", link: "/stock/returns/list" },
        { name: "Refund Product List", link: "/stock/refunds/list" },
        { name: "Process Returns", link: "/stock/returns/process" },
        { name: "Refund Requests", link: "/stock/refunds/requests" },
        { name: "Damaged Stock Returns", link: "/stock/returns/damaged" },
        { name: "Supplier Return Management", link: "/stock/returns/supplier" },
      ],
    },
  ];

  return (
    <nav className="navbar">
      <ul className="menu">
        {/* 🏠 Dashboard */}
        <h1 className="white pb-2 center">Haryana Electric Scooty</h1>
        <li>
          <Link className="menu-item" to="/Stock">
            Dashboard
          </Link>
        </li>

        {/* 🔽 Dropdown Menus */}
        {menuItems.map((menu, index) => (
          <Dropdown
            key={index}
            category={menu.category}
            options={menu.options}
            isOpen={isDropdownOpen[menu.category] || false}
            onToggle={() => toggleDropdown(menu.category)}
          />
        ))}

        {/* 🚪 Logout */}
        <li>
          <Link className="menu-item" to="/logout">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default StockNavigation;
