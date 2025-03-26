import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const SupplierDetails = ({ supplierId }) => {
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const foundSupplier = data.suppliers.find((sup) => sup.id === supplierId);
        setSupplier(foundSupplier);
      })
      .catch((error) => console.error("Error fetching supplier details:", error));
  }, [supplierId]);

  if (!supplier) {
    return <p>Loading supplier details...</p>;
  }

  return (
    <div className="supplier-details-container">
      <h2 className="supplier-name">{supplier.name}</h2>
      <p><strong>Contact:</strong> {supplier.contact}</p>
      <p><strong>Location:</strong> {supplier.location}</p>
      <p><strong>Total Stock:</strong> {supplier.totalStock}</p>
      <p><strong>Returns:</strong> {supplier.returns}</p>
      <p><strong>Refunds:</strong> {supplier.refunds}</p>
      <p><strong>Total Orders:</strong> {supplier.orders}</p>

      <h3>Products</h3>
      <ul className="supplier-products">
        {supplier.products.map((product) => (
          <li key={product.id}>
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
SupplierDetails.propTypes = {
  supplierId: PropTypes.func.isRequired,
};
export default SupplierDetails;