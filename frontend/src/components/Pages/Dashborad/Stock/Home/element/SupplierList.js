import React, { useEffect, useState } from "react";
import "./SupplierList.css";

const SupplierList = () => {
  const suppliers = [
      {  name: "ABC Supplies", address: "123 Main St, New York, NY" },
      {  name: "XYZ Distributors", address: "456 Market Ave, Los Angeles, CA" },
    {  name: "Best Parts Co.", address: "789 Industrial Rd, Chicago, IL" },
    {  name: "Fresh Farms", address: "101 Greenway Blvd, Miami, FL" },
    {  name: "Tech Gear", address: "202 Silicon St, San Francisco, CA" }
  ];

  const [visibleSuppliers, setVisibleSuppliers] = useState(suppliers.slice(0, 3));
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);

      setTimeout(() => {
        const newIndex = (index + 1) % suppliers.length;
        const newVisibleSuppliers = [
          suppliers[newIndex],
          suppliers[(newIndex + 1) % suppliers.length],
          suppliers[(newIndex + 2) % suppliers.length]
        ];

        setIndex(newIndex);
        setVisibleSuppliers(newVisibleSuppliers);
        setAnimate(false);
      }, 500); // Animation duration
    }, 3000);

    return () => clearInterval(interval);
  }, [index, suppliers]);

  return (
    <div className="supplier-container">
      <div className="supplier-table-container">
        <table className="supplier-table">
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody className={animate ? "scroll-up" : ""}>
            {visibleSuppliers.map((supplier) => (
              <tr key={supplier.id}>
             
                <td>{supplier.name}</td>
                <td>{supplier.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierList;
