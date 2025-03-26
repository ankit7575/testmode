import React, { useState, useEffect } from "react";
import "./Homelayout.css";

const Homelayout = () => {
  const [productData, setProductData] = useState([]); // Stores all product data
  const [totalStock, setTotalStock] = useState(0); // Stores total stock for all products
  const [loggedInUser] = useState("Jind"); // Auto-login with "Jind"

  // Sample product data
  const sampleData = [
    {
      id: 1,
      name: "Product A",
      PurchaseHistory: [
        { Quantity: 10 },
        { Quantity: 15 }
      ]
    },
    {
      id: 2,
      name: "Product B",
      PurchaseHistory: [
        { Quantity: 20 },
        { Quantity: 5 }
      ]
    }
  ];

  useEffect(() => {
    setProductData(sampleData);
  }, []);

  // Calculate total stock across all products
  useEffect(() => {
    let totalStockQuantity = 0;
    productData.forEach((product) => {
      product.PurchaseHistory.forEach((purchase) => {
        totalStockQuantity += purchase.Quantity;
      });
    });
    setTotalStock(totalStockQuantity);
  }, [productData]);

  return (
    <div className="home-layout">
      <h1 className="home-title">Welcome to the Stock Dashboard</h1>
      <div className="row">
        <div className="col-lg-6">
          <div className="franchise-card card-location">
            <h3 className="franchise-stock">Location: {loggedInUser}</h3>
          </div>
        </div>
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
