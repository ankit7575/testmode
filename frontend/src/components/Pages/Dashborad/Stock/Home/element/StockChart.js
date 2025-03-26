import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./StockChart.css";

const StockChart = () => {
  // Sample stock data with dates
  const stockData = [
    { date: "2024-03-01", totalStock: 30 },
    { date: "2024-03-02", totalStock: 40 },
    { date: "2024-03-03", totalStock: 35 },
    { date: "2024-03-04", totalStock: 50 },
    { date: "2024-03-05", totalStock: 45 },
    { date: "2024-03-06", totalStock: 55 },
    { date: "2024-03-07", totalStock: 60 }
  ];

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={stockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="date" stroke="#333" tick={{ fontSize: 12 }} />
          <YAxis stroke="#333" tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "5px" }} />
          <Legend verticalAlign="top" height={36} />
          <Line type="monotone" dataKey="totalStock" stroke="#4CAF50" strokeWidth={3} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
