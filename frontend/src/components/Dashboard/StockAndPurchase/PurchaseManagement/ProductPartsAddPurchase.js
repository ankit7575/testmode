import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./AddPurchase.css"; // Link to the CSS file

const ProductPartsAddPurchase = ({ onAddPart }) => {
  const [productName, setProductName] = useState(""); // Product name
  const [partName, setPartName] = useState(""); // Part name
  const [quantity, setQuantity] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierContact, setSupplierContact] = useState("");
  const [franchiseLocation, setFranchiseLocation] = useState("");
  const [partImage, setPartImage] = useState(null);
  const [billingPDF, setBillingPDF] = useState(null);
  const [warranty, setWarranty] = useState(""); // Warranty field

  const [suppliers, setSuppliers] = useState([]);
  const [franchises, setFranchises] = useState([]);
  const [products, setProducts] = useState([]);

  const [pricingDetails, setPricingDetails] = useState({
    CostPerUnit: 0,
    TCS: 0.5,
    GST: 18,
    IGST: 5,
    FinalCost: 0,
  });

  // Fetch suppliers, franchises, and products from the data.json file
  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setSuppliers(data.suppliers);
        setFranchises(data.franchises);
        setProducts(data.products.filter((product) => product.Category === "Big Product")); // Only big products
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName || !partName || !quantity || !purchaseDate || !invoiceNumber || !supplierName || !supplierContact || !franchiseLocation || !warranty) {
      alert("Please fill in all fields");
      return;
    }

    const newPart = {
      PartID: Date.now(),
      ProductName: productName,
      PartName: partName,
      Quantity: parseInt(quantity),
      PurchaseDate: purchaseDate,
      InvoiceNumber: invoiceNumber,
      SupplierName: supplierName,
      SupplierContact: supplierContact,
      FranchiseLocation: franchiseLocation,
      PartImage: partImage,
      BillingPDF: billingPDF,
      Warranty: warranty, // Include warranty
      PricingDetails: pricingDetails,
    };

    onAddPart(newPart);
  };

  const handlePDFChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBillingPDF(file);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPartImage(file);
    }
  };

  const handlePricingChange = (e) => {
    const { name, value } = e.target;
    setPricingDetails({
      ...pricingDetails,
      [name]: parseFloat(value),
    });
  };

  return (
    <div className="add-purchase-container">
      <h2 className="form-title">Add New Product Part</h2>
      <form className="add-purchase-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <label>Product Name:</label>
            <select value={productName} onChange={(e) => setProductName(e.target.value)} required>
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.ProductID} value={product.ProductName}>
                  {product.ProductName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-6">
            <label>Part Name:</label>
            <input
              type="text"
              value={partName}
              onChange={(e) => setPartName(e.target.value)}
              required
              placeholder="Enter part name"
            />
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
            <label>Part Image:</label>
            <input type="file" onChange={handleImageChange} accept="image/*" required />
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
                onChange={handlePricingChange}
                required
              />
            </div>
          ))}
          <div className="col-lg-6">
            <label>Upload Billing PDF:</label>
            <input type="file" accept=".pdf" onChange={handlePDFChange} required />
          </div>
          <div className="col-lg-6">
            <label>Warranty (in months):</label>
            <input
              type="number"
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
              required
              placeholder="Enter warranty duration"
            />
          </div>
        </div>
        <div className="form-footer">
          <button type="submit" className="submit-button">
            Add Part
          </button>
        </div>
      </form>
    </div>
  );
};
ProductPartsAddPurchase.propTypes = {
  onAddPart: PropTypes.func.isRequired,
};
export default ProductPartsAddPurchase;
