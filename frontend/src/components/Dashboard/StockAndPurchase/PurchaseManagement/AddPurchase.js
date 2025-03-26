import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./AddPurchase.css";

const AddPurchase = ({ onAddPurchase }) => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierContact, setSupplierContact] = useState("");
  const [franchiseLocation, setFranchiseLocation] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [billingPDF, setBillingPDF] = useState(null);

  const [suppliers, setSuppliers] = useState([]);
  const [franchises, setFranchises] = useState([]);
  const [productTypes] = useState(["Scooter", "Scooty"]);

  const [pricingDetails, setPricingDetails] = useState({
    CostPerUnit: 0,
    TCS: 0.5,
    GST: 18,
    IGST: 5,
    FinalCost: 0,
  });

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setSuppliers(data.suppliers);
        setFranchises(data.franchises);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName || !quantity || !purchaseDate || !invoiceNumber || !supplierName || !supplierContact || !franchiseLocation) {
      alert("Please fill in all fields");
      return;
    }

    const newPurchase = {
      PurchaseID: Date.now(),
      ProductName: productName,
      Quantity: parseInt(quantity),
      PurchaseDate: purchaseDate,
      InvoiceNumber: invoiceNumber,
      SupplierName: supplierName,
      SupplierContact: supplierContact,
      FranchiseLocation: franchiseLocation,
      ProductImage: productImage,
      BillingPDF: billingPDF,
      PricingDetails: pricingDetails,
    };

    onAddPurchase(newPurchase);
  };

  return (
    <div className="add-purchase-container">
      <h2 className="form-title">Add New Scooter/Scooty Purchase</h2>
      <form className="add-purchase-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <label>Product Name (Scooter/Scooty):</label>
            <select value={productName} onChange={(e) => setProductName(e.target.value)} required>
              <option value="">Select Product</option>
              {productTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-6">
            <label>Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="col-lg-6">
            <label>Purchase Date:</label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              required
            />
          </div>
          <div className="col-lg-6">
            <label>Invoice Number:</label>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              required
            />
          </div>
          <div className="col-lg-6">
            <label>Supplier:</label>
            <select value={supplierName} onChange={(e) => setSupplierName(e.target.value)} required>
              <option value="">Select Supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.name}>
                  {supplier.name}
                </option>
              ))}
            </select>
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
            <label>Franchise Location:</label>
            <select
              value={franchiseLocation}
              onChange={(e) => setFranchiseLocation(e.target.value)}
              required
            >
              <option value="">Select Franchise Location</option>
              {franchises.map((franchise) => (
                <option key={franchise.location} value={franchise.location}>
                  {franchise.location}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-6">
            <label>Product Image:</label>
            <input type="file" onChange={(e) => setProductImage(e.target.files[0])} accept="image/*" required />
          </div>
          <div className="col-lg-12">
            <h3 className="pricing-header">Pricing Details</h3>
          </div>
          {Object.entries(pricingDetails).map(([key, value]) => (
            <div className="col-lg-6" key={key}>
              <label>{key.replace(/([A-Z])/g, " $1")}: </label>
              <input
                type="number"
                name={key}
                value={value}
                onChange={(e) => setPricingDetails({ ...pricingDetails, [key]: parseFloat(e.target.value) })}
                required
              />
            </div>
          ))}
          <div className="col-lg-6">
            <label>Upload Billing PDF:</label>
            <input type="file" accept=".pdf" onChange={(e) => setBillingPDF(e.target.files[0])} required />
          </div>
        </div>
        <div className="form-footer">
          <button type="submit" className="submit-button">
            Add Purchase
          </button>
        </div>
      </form>
    </div>
  );
};

AddPurchase.propTypes = {
  onAddPurchase: PropTypes.func.isRequired,
};

export default AddPurchase;