import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Navigation.css"; // Ensure styles are included

// 📌 Dropdown Component
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

// ✅ PropTypes Validation
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
function BusinessInsightsNavigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState({});

  const toggleDropdown = useCallback((category) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  }, []);

  // ✅ Structured & Scalable Navigation Menu
  const menuItems = [
    {
      category: "Financial Insights",
      options: [
        { name: "Profit & Loss Report", link: "/business-insights/profit-loss" },
        { name: "Revenue Breakdown", link: "/business-insights/revenue-breakdown" },
        { name: "Expense Analysis", link: "/business-insights/expenses" },
        { name: "Tax Reports", link: "/business-insights/tax-reports" },
      ],
    },
    {
      category: "User & Franchise Management",
      options: [
        { name: "Add New User", link: "/business-insights/add-user" },
        { name: "Edit User", link: "/business-insights/edit-user" },
        { name: "User List & Roles", link: "/business-insights/users" },
        { name: "Add New Franchise", link: "/business-insights/franchise/add" },
        { name: "Franchise List", link: "/business-insights/franchise/list" },
        { name: "Franchise Sales Tracking", link: "/business-insights/franchise/sales" },
      ],
    },
    {
      category: "Sales & Performance",
      options: [
        { name: "Total Sales Overview", link: "/business-insights/overview" },
        { name: "Franchise Sales Report", link: "/business-insights/franchise-sales" },
        { name: "Best Selling Products", link: "/business-insights/best-sellers-products" },
        { name: "Customer Purchase Trends", link: "/business-insights/customer-trends" },
      ],
    },
    {
      category: "Notifications & Logs",
      options: [
        { name: "System Notifications", link: "/business-insights/System/notifications" },
        { name: "User Activity Logs", link: "/business-insights/user-logs" },
        { name: "Transaction Logs", link: "/business-insights/transaction-logs" },
      ],
    },
  ];

  return (
    <nav className="navbar">
      <ul className="menu">
        {/* 🏠 Dashboard */}
        <h1 className="white pb-2 center">Haryana Electric Scooty</h1>
        <li>
          <Link className="menu-item" to="/business-insights">
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

export default BusinessInsightsNavigation;
