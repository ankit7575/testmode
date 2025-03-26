import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SupplierProductDetails = () => {
  const { supplierId } = useParams();
  const [products, setProducts] = useState([]);

  // Fetch product data from /data.json
  useEffect(() => {
    fetch("/data.json") // Path to the data.json file (it should be in the public folder)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        // Filter products based on the supplierId from the URL
        if (data && data.suppliers) {
          const supplier = data.suppliers.find(
            (s) => s.id === parseInt(supplierId)
          );
          if (supplier && supplier.products) {
            setProducts(supplier.products); // Set the filtered products for the supplier
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [supplierId]);

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Supplier Product Details</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h4>{product.name}</h4>
            <p>{product.details}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierProductDetails;
