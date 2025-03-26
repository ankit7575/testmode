import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Totalstockgraph = () => {
  const [stockData, setStockData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Stock Added for All Locations",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill color
        tension: 0.4, // Curved line
        pointRadius: 5, // Size of points
      },
    ],
  });

  const [, setTotalStock] = useState(0); // State to store the total stock added for all locations

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Position of the legend
      },
      title: {
        display: true,
        text: "Total Stock Added Over Time", // Fixed the title text
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Stock Quantity",
          font: {
            size: 14,
          },
        },
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    // Fetch the data from the data.json file
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);

        // Check if the data structure is correct
        if (data && data.products) {
          let filteredData = [];
          let totalStockAdded = 0; // Variable to calculate total stock added across all locations

          // Loop through all products and their PurchaseHistory
          data.products.forEach((product) => {
            product.PurchaseHistory.forEach((purchase) => {
              filteredData.push({
                Date: purchase.PurchaseDate,
                Quantity: purchase.Quantity,
              });
              totalStockAdded += purchase.Quantity; // Add the quantity to total stock
            });
          });

          // Group data by month
          const monthData = filteredData.reduce((acc, entry) => {
            const month = new Date(entry.Date).toLocaleString("default", {
              month: "short",
            }); // Get the month name
            if (acc[month]) {
              acc[month] += entry.Quantity; // Add quantity to the existing month's total
            } else {
              acc[month] = entry.Quantity; // Initialize for the month
            }
            return acc;
          }, {});

          // Prepare the labels and stock data for the chart
          const labels = Object.keys(monthData);
          const stockAddedData = Object.values(monthData);

          // Update state with the filtered data for all locations
          setStockData({
            labels: labels,
            datasets: [
              {
                label: "Total Stock Added for All Locations",
                data: stockAddedData,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
                pointRadius: 5,
              },
            ],
          });

          // Set the total stock added for all locations
          setTotalStock(totalStockAdded);
        } else {
          console.error("No stock history found in the data");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div style={{ width: "80%", margin: "0 auto", padding: "20px" }}>
      <Line data={stockData} options={options} />
      {/* Display the total stock added for all locations */}
    
    </div>
  );
};

export default Totalstockgraph;
