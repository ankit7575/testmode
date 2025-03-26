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

// ✅ Prop Types Validation
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
function SaleNavigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState({});

  const toggleDropdown = useCallback((category) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  }, []);

  // ✅ Well-structured Navigation Menu
  const menuItems = [
    {
      category: "Sales Management",
      options: [
        { name: "New Sales", link: "/sales/new" },
        { name: "Customer Orders", link: "/sales/orders" },
        { name: "Sales Returns", link: "/sales/returns" },
      ],
    },
    {
      category: "Invoices & Billing",
      options: [
        { name: "Generate Invoice", link: "/sales/invoices/generate" },
        { name: "Invoice History", link: "/sales/invoices/history" },
        { name: "Pending Payments", link: "/sales/invoices/pending-payments" },
        { name: "Payment Receipts", link: "/sales/invoices/payment-receipts" },
        { name: "Tax Calculation", link: "/sales/invoices/tax-calculation" },
        { name: "Recurring Invoices", link: "/sales/invoices/recurring" },
      ],
    },
    {
      category: "Customer Management",
      options: [
        { name: "Customer List", link: "/sales/customers/list" },
        { name: "Customer Profiles", link: "/sales/customers/profiles" },
        { name: "Customer Support Tickets", link: "/sales/customers/support" },
      ],
    },
    {
      category: "Sales Analytics & Reports",
      options: [
        { name: "Sales Dashboard", link: "/sales/reports/dashboard" },
        { name: "Sales by Product", link: "/sales/reports/sales-product" },
        { name: "Sales Growth Trends", link: "/sales/reports/growth-trends" },
      ],
    },
    {
      category: "Payment Management",
      options: [
        { name: "Payment Methods", link: "/sales/payments/methods" },
        { name: "Partial Payments", link: "/sales/payments/partial" },
        { name: "Refund Processing", link: "/sales/payments/refunds" },
        { name: "Payment Reminders", link: "/sales/payments/reminders" },
      ],
    },
    {
      category: "Returns & Refunds",
      options: [
        { name: "Return Requests", link: "/sales/returns/requests" },
        { name: "Refund Status", link: "/sales/returns/status" },
        { name: "Damaged Goods Returns", link: "/sales/returns/damaged-goods" },
        { name: "Customer Refund Approvals", link: "/sales/returns/customer-approvals" },
        { name: "Supplier Return Management", link: "/sales/returns/supplier-management" },
        { name: "Warranty-Based Returns", link: "/sales/returns/warranty" },
      ],
    },
  ];

  return (
    <nav className="navbar">
      <ul className="menu">
        {/* 🏠 Dashboard */}
        <h1 className="white pb-2 center">Haryana Electric Scooty</h1>
        <li>
          <Link className="menu-item" to="/sales">
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

export default SaleNavigation;
