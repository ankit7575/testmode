import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Navigation.css"; // Ensure your styles are included

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
function PurchasesNavigation() {
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
      category: "Supplier Integration",
      options: [
        { name: "Supplier Payment Status", link: "/purchases/suppliers/payment-status" },
        { name: "Supplier Product Returns", link: "/purchases/suppliers/product-returns" },
      ],
    },
    {
      category: "Invoice & Billing",
      options: [
        { name: "Generate Purchase Invoice", link: "/purchases/invoices/generate" },
        { name: "Pending Invoices", link: "/purchases/invoices/pending" },
        { name: "Invoice History", link: "/purchases/invoices/history" },
      ],
    },
    {
      category: "Payment Management",
      options: [
        { name: "Record Payments", link: "/purchases/payments/record" },
        { name: "Pending Payments", link: "/purchases/payments/pending" },
        { name: "Payment History", link: "/purchases/payments/history" },
        { name: "Payment Reminders", link: "/purchases/payments/reminders" },
        { name: "Supplier Advance Payments", link: "/purchases/payments/advance-payments" },
      ],
    },
    {
      category: "Reports & Analytics",
      options: [
        { name: "Purchase Reports", link: "/purchases/reports/purchase" },
        { name: "Payment Reports", link: "/purchases/reports/payment" },
      ],
    },
  ];

  return (
    <nav className="navbar">
      <ul className="menu">
        {/* 🏠 Dashboard */}
        <h1 className="white pb-2 center">Haryana Electric Scooty</h1>
        <li>
          <Link className="menu-item" to="/purchases">
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

export default PurchasesNavigation;
