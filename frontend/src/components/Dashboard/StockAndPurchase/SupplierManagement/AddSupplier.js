import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AddSupplier.css";

const AddSupplier = ({ onAddSupplier }) => {
  const [supplierName, setSupplierName] = useState("");
  const [supplierContact, setSupplierContact] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!supplierName || !supplierContact || !location) {
      alert("Please fill in all fields.");
      return;
    }

    const newSupplier = {
      id: Date.now(),
      name: supplierName,
      contact: supplierContact,
      location: location,
    };

    onAddSupplier(newSupplier);
  };

  return (
    <div className="add-supplier-container">
      <h2 className="form-title">Add New Supplier</h2>
      <form className="add-supplier-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <label>Supplier Name:</label>
            <input
              type="text"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              required
            />
          </div>
          <div className="col-lg-6">
            <label>Supplier Contact:</label>
            <input
              type="text"
              value={supplierContact}
              onChange={(e) => setSupplierContact(e.target.value)}
              required
            />
          </div>
          <div className="col-lg-6">
            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-footer">
          <button type="submit" className="submit-button">
            Add Supplier
          </button>
        </div>
      </form>
    </div>
  );
};
AddSupplier.propTypes = {
  onAddSupplier: PropTypes.func.isRequired,
};
export default AddSupplier;
