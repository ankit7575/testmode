import React, { useState, useEffect } from "react";
import { utils, writeFile } from "xlsx";

const ExportStock = () => {
  const [stockData, setStockData] = useState([]);

  // Fetch stock data from /data.json
  useEffect(() => {
    fetch("/data.json") // Path to the data.json file (it should be in the public folder)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        // Set the stock data from data.json
        if (data && data.products) {
          // Create stock data in the desired format
          const formattedStockData = data.products.map((product) => ({
            ProductID: product.ProductID,
            ProductName: product.ProductName,
            Stock: product.Stock,
          }));
          setStockData(formattedStockData);
        } else {
          console.error("No products found in data.json");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleExport = () => {
    const ws = utils.json_to_sheet(stockData); // Convert stockData to Excel sheet
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Stock Data");
    writeFile(wb, "StockData.xlsx"); // Export the sheet as Excel file
  };

  return (
    <div>
      <h2>Export Stock to Excel</h2>
      <button onClick={handleExport} disabled={stockData.length === 0}>
        Export to Excel
      </button>
    </div>
  );
};

export default ExportStock;
