import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
const UpdateStock = ({ onUpdatePurchase }) => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data from the data.json file and filter for Jind products
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

  const handleEditClick = (purchase) => setSelectedPurchase({ ...purchase });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedPurchase((prev) => ({
      ...prev,
      [name]: name.includes("PricingDetails")
        ? {
            ...prev.PricingDetails,
            [name.split(".")[1]]: parseFloat(value),
          }
        : value,
    }));
  };

  const handleSaveChanges = () => {
    setPurchaseHistory((prevHistory) =>
      prevHistory.map((purchase) =>
        purchase.PurchaseID === selectedPurchase.PurchaseID ? selectedPurchase : purchase
      )
    );

    if (onUpdatePurchase) {
      onUpdatePurchase(selectedPurchase);
    }

    setSelectedPurchase(null);
  };

  const filteredHistory = purchaseHistory.filter((purchase) => {
    return (
      purchase.productName.toLowerCase().includes(searchTerm) ||
      purchase.InvoiceNumber.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="update-purchase-container">
      <h2 className="form-title">Update Purchase - Jind</h2>

      {/* Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by product or invoice..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((purchase) => (
              <tr key={purchase.PurchaseID}>
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
                <td>
                  <button onClick={() => handleEditClick(purchase)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {selectedPurchase && (
        <div className="modal-overlay" onClick={() => setSelectedPurchase(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Purchase</h3>
            <label>
              Product Name:
              <input
                type="text"
                name="productName"
                value={selectedPurchase.productName}
                readOnly
              />
            </label>
            <label>
              Quantity:
              <input
                type="number"
                name="Quantity"
                value={selectedPurchase.Quantity}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Purchase Date:
              <input
                type="date"
                name="PurchaseDate"
                value={selectedPurchase.PurchaseDate}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Invoice Number:
              <input
                type="text"
                name="InvoiceNumber"
                value={selectedPurchase.InvoiceNumber}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Supplier Name:
              <input
                type="text"
                name="SupplierName"
                value={selectedPurchase.SupplierName}
                onChange={handleInputChange}
              />
            </label>
            {Object.entries(selectedPurchase.PricingDetails).map(([key, value]) => (
              <label key={key}>
                {key.replace(/([A-Z])/g, " $1")}:
                <input
                  type="number"
                  name={`PricingDetails.${key}`}
                  value={value}
                  onChange={handleInputChange}
                />
              </label>
            ))}
            <div className="modal-actions">
              <button onClick={handleSaveChanges}>Save Changes</button>
              <button onClick={() => setSelectedPurchase(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
UpdateStock.propTypes = {
  onUpdatePurchase: PropTypes.func.isRequired,
};
export default UpdateStock;
