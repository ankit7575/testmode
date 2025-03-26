import React, { useEffect, useState } from "react";
import "./SupplierList.css";

const ReturnList = () => {
  const returnProducts = [
    { id: 1, product: "Laptop", category: "Electronics", reason: "Defective screen" },
    { id: 2, product: "T-Shirt", category: "Clothing", reason: "Wrong size" },
    { id: 3, product: "Headphones", category: "Accessories", reason: "Sound issues" },
    { id: 4, product: "Apples", category: "Groceries", reason: "Rotten" },
    { id: 5, product: "Smartwatch", category: "Gadgets", reason: "Battery not working" }
  ];

  const [visibleProducts, setVisibleProducts] = useState(returnProducts.slice(0, 3));
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);

      setTimeout(() => {
        const newIndex = (index + 1) % returnProducts.length;
        const newVisibleProducts = [
          returnProducts[newIndex],
          returnProducts[(newIndex + 1) % returnProducts.length],
          returnProducts[(newIndex + 2) % returnProducts.length]
        ];

        setIndex(newIndex);
        setVisibleProducts(newVisibleProducts);
        setAnimate(false);
      }, 500); // Animation duration
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="supplier-container">
      <div className="supplier-table-container">
        <table className="supplier-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody className={animate ? "scroll-up" : ""}>
            {visibleProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.product}</td>
                <td>{product.category}</td>
                <td>{product.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReturnList;
