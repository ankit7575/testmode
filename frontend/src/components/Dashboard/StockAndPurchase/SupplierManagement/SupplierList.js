import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Replace useHistory with useNavigate

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();  // Replace useHistory with useNavigate

  // Fetch suppliers data from /data.json
  useEffect(() => {
    fetch("/data.json") // Path to data.json file (it should be in the public folder)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        // Set the suppliers data from data.json
        if (data && data.suppliers) {
          setSuppliers(data.suppliers);
        } else {
          console.error("No suppliers found in data.json");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSupplierClick = (supplierId) => {
    // Navigate to the SupplierDetails component with supplier ID using navigate
    navigate(`/supplier/${supplierId}`);  // Use navigate instead of history.push
  };

  return (
    <div>
      <h2>Supplier Management</h2>
      <ul>
        {suppliers.length > 0 ? (
          suppliers.map((supplier) => (
            <li
              key={supplier.id}
              onClick={() => handleSupplierClick(supplier.id)}
            >
              {supplier.name}
            </li>
          ))
        ) : (
          <li>No suppliers available</li>
        )}
      </ul>
    </div>
  );
};

export default SupplierList;
