import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const ImportStock = () => {
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
          setStockData(data.products);
        } else {
          console.error("No products found in data.json");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const abuf = event.target.result;
        const wb = XLSX.read(abuf, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const importedData = XLSX.utils.sheet_to_json(ws);

        // Log the imported data (you can process this data further as needed)
        console.log("Imported Excel Data:", importedData);

        // Example: Add imported data to the existing stock data
        const updatedStockData = [...stockData, ...importedData];
        setStockData(updatedStockData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <h2>Import Stock via Excel</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleImport} />

      
    </div>
  );
};

export default ImportStock;
