import React, { useState, useEffect } from "react";

import ExportStock from "./ExportStock";
import ImportStock from "./ImportStock";

const ViewAllStock = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for product name or invoice search
  const [selectedSupplier, setSelectedSupplier] = useState(""); // State for supplier dropdown
  const [selectedProduct, setSelectedProduct] = useState("");
  const [modalData, setModalData] = useState(null);

  // Fetch data from the data.json file
  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const jindPurchases = data.products.reduce((acc, product) => {
          const productPurchases = product.PurchaseHistory.filter(
            (purchase) => purchase.FranchiseLocation === "Jind"
          ).map((purchase) => ({
            ...purchase,
            productName: product.ProductName,
            productId: product.ProductID,
            productImage: product.Image,
            billingPDF: product.BillingPDF,
          }));

          const subProductPurchases = product.SubProducts.flatMap((subProduct) =>
            subProduct.PurchaseHistory.filter(
              (purchase) => purchase.FranchiseLocation === "Jind"
            ).map((purchase) => ({
              ...purchase,
              productName: `${product.ProductName} - ${subProduct.SubProductName}`,
              productId: subProduct.SubProductID,
              productImage: subProduct.Image,
              billingPDF: subProduct.BillingPDF,
            }))
          );

          return [...acc, ...productPurchases, ...subProductPurchases];
        }, []);

        setPurchaseHistory(jindPurchases);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  const handleSupplierSelect = (e) => setSelectedSupplier(e.target.value);

  const handleProductSelect = (e) => setSelectedProduct(e.target.value);

  const handleRowClick = (purchase) => setModalData(purchase);

  const closeModal = () => setModalData(null);

  const filteredHistory = purchaseHistory.filter((purchase) => {
    if (selectedProduct && purchase.productId !== parseInt(selectedProduct)) return false;
    if (selectedSupplier && purchase.SupplierName !== selectedSupplier) return false;
    if (
      searchTerm &&
      !(
        purchase.productName.toLowerCase().includes(searchTerm) ||
        purchase.InvoiceNumber.toLowerCase().includes(searchTerm)
      )
    )
      return false;

    return true;
  });

  return (
    <div className="purchase-history">
      <h2 className="form-title">Purchase History - Jind</h2>

      {/* Filters */}
      <div className="filter-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by product or invoice..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="filter-controls">
          <label>Filter by Supplier:</label>
          <select onChange={handleSupplierSelect} defaultValue="">
            <option value="">All Suppliers</option>
            {Array.from(new Set(purchaseHistory.map((p) => p.SupplierName))).map((supplier) => (
              <option key={supplier} value={supplier}>
                {supplier}
              </option>
            ))}
          </select>
        </div>
        <div className="select-product">
          <label>Filter by Product:</label>
          <select onChange={handleProductSelect} defaultValue="">
            <option value="">All Products</option>
            {Array.from(new Set(purchaseHistory.map((p) => p.productId))).map((id) => (
              <option key={id} value={id}>
                {purchaseHistory.find((p) => p.productId === id)?.productName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Purchase History */}
      <div className="purchase-history-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Purchase Date</th>
              <th>Invoice Number</th>
              <th>Supplier Name</th>
              <th>Final Cost</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((purchase) => (
              <tr key={purchase.PurchaseID} onClick={() => handleRowClick(purchase)}>
                <td>
                  <img
                    src={purchase.productImage}
                    alt={purchase.productName}
                    className="product-image"
                  />
                </td>
                <td>{purchase.productName}</td>
                <td>{purchase.Quantity}</td>
                <td>{purchase.PurchaseDate}</td>
                <td>{purchase.InvoiceNumber}</td>
                <td>{purchase.SupplierName}</td>
                <td>{purchase.PricingDetails.FinalCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Details */}
      {modalData && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              ×
            </button>
            <h3>Product Details</h3>
            <p>
              <strong>Product Name:</strong> {modalData.productName}
            </p>
            <p>
              <strong>Quantity:</strong> {modalData.Quantity}
            </p>
            <p>
              <strong>Purchase Date:</strong> {modalData.PurchaseDate}
            </p>
            <p>
              <strong>Invoice Number:</strong> {modalData.InvoiceNumber}
            </p>
            <p>
              <strong>Supplier Name:</strong> {modalData.SupplierName}
            </p>
            <p>
              <strong>Franchise Location:</strong> {modalData.FranchiseLocation}
            </p>
            <p>
              <strong>Cost Per Unit:</strong> {modalData.PricingDetails.CostPerUnit}
            </p>
            <p>
              <strong>Final Cost:</strong> {modalData.PricingDetails.FinalCost}
            </p>
            <p>
              <strong>Billing PDF:</strong>{" "}
              <a href={modalData.billingPDF} target="_blank" rel="noopener noreferrer">
                View Invoice
              </a>
            </p>
          </div>
       
        </div>
      )}
         <div className="row" >
            <div className="col-lg-6" >
              <ExportStock/>
            </div>
            <div className="col-lg-6">
            <ImportStock/>           
            </div>
          </div>
    </div>
  );
};

export default ViewAllStock;
