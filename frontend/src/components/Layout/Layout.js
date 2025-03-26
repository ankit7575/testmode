import React, { useState } from "react";
import PropTypes from "prop-types";
import SaleNavigation from "../Menu/SaleNavigation"; // Sales Menu
import PurchasesNavigation from "../Menu/PurchasesNavigation"; // Purchases Menu
import StockNavigation from "../Menu/StockNavigation"; // Stock Menu
import BusinessInsightsNavigation from "../Menu/BusinessInsightsNavigation"; // Business Insights Menu
import "./Layout.css"; // Import layout styles

const Layout = ({ children, userRole, menuType }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // ✅ Determine which navigation menu to render based on `menuType` and `userRole`
  const renderNavigationMenu = () => {
    switch (menuType) {
      case "sales":
        return <SaleNavigation />;
      case "purchases":
        return userRole === "admin" ? <PurchasesNavigation /> : null;
      case "stock":
        return userRole === "admin" ? <StockNavigation /> : null;
      case "business-insights":
        return userRole === "admin" ? <BusinessInsightsNavigation /> : null;
      default:
        return <StockNavigation />; // Default to Stock Navigation
    }
  };

  return (
    <div className="layout">
      {/* Sidebar toggle button for mobile */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar containing the navigation menu */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        {renderNavigationMenu()}
      </aside>

      {/* Main Content Area */}
      <main className="main-content">{children}</main>
    </div>
  );
};

// ✅ Add PropTypes validation for Layout component
Layout.propTypes = {
  children: PropTypes.node.isRequired, // `children` must be a valid React node
  userRole: PropTypes.string, // `userRole` is optional but should be a string
  menuType: PropTypes.string, // `menuType` is optional but should be a string
};

export default Layout;
