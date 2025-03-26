import React, { useState, useEffect } from "react";
import "./Homelayout.css";

const Homelayout = () => {
  const [productData, setProductData] = useState([]); // Stores all product data
  const [totalStock, setTotalStock] = useState(0); // Stores total stock for all products
  const [loggedInUser] = useState("Jind"); // Auto-login with "Jind"


  // Fetch data from the JSON file
  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setProductData(data.products)) // Fetch product data from the JSON file
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  // Calculate total stock across all products
  useEffect(() => {
    if (productData.length > 0) {
      let totalStockQuantity = 0; // Variable to store total stock

      // Loop through all products and their PurchaseHistory
      productData.forEach((product) => {
        product.PurchaseHistory.forEach((purchase) => {
          totalStockQuantity += purchase.Quantity; // Sum the quantities
        });
      });

      // Update state with the total stock
      setTotalStock(totalStockQuantity);
    }
  }, [productData]);

  return (
    <div className="home-layout">
      <h1 className="home-title">Welcome to the Stock Dashboard</h1>

      <div className="row">
        {/* Franchise Location */}
        <div className="col-lg-6">
          <div className="franchise-card card-location">
            <h3 className="franchise-stock">Location: {loggedInUser}</h3>
          </div>
        </div>

        {/* Total Stock */}
        <div className="col-lg-6">
          <div className="franchise-card card-stock">
            <h3 className="franchise-stock">Total Stock: {totalStock}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homelayout;
