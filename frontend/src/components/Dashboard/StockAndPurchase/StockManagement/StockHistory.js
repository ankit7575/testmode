import React, { useState, useEffect } from "react";

const StockHistory = () => {
  const [historyData, setHistoryData] = useState([]);

  // Fetch stock history data from /data.json
  useEffect(() => {
    fetch("/data.json") // Path to the data.json file (it should be in the public folder)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        // Set the stock history data from data.json
        if (data && data.stockHistory) {
          setHistoryData(data.stockHistory);
        } else {
          console.error("No stock history found in data.json");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Stock History</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Action</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {historyData.length > 0 ? (
            historyData.map((item, index) => (
              <tr key={index}>
                <td>{item.ProductID}</td>
                <td>{item.Action}</td>
                <td>{item.Quantity}</td>
                <td>{item.Date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No stock history available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockHistory;
