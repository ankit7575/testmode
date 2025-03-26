import React from "react";
import { Routes, Route } from "react-router-dom";
import * as Stock from "../pages/Stock/Home";

const StockRoutes = () => {
  return (
    <Routes>
      {/* Stock Management */}
      <Route path="/" element={<Stock.StockHome />} />
      <Route path="/add" element={<Stock.AddStock />} />
      <Route path="/update" element={<Stock.UpdateStock />} />
      <Route path="/view" element={<Stock.ViewStock />} />
      <Route path="/categories" element={<Stock.StockCategories />} />
      
      {/* Stock Alerts & Notifications */}
      <Route path="/alerts/low" element={<Stock.LowStockAlerts />} />
      <Route path="/alerts/out-of-stock" element={<Stock.OutOfStockAlerts />} />
      <Route path="/alerts/expiring" element={<Stock.ExpiringStockAlerts />} />
      <Route path="/alerts/damaged" element={<Stock.DamagedStockAlerts />} />
      <Route path="/alerts/overstock" element={<Stock.OverstockAlerts />} />
      
      {/* Supplier Management */}
      <Route path="/suppliers/add" element={<Stock.AddSupplier />} />
      <Route path="/suppliers/list" element={<Stock.SupplierList />} />
      <Route path="/suppliers/orders" element={<Stock.SupplierOrders />} />
      <Route path="/suppliers/performance" element={<Stock.SupplierPerformance />} />
      
      {/* Stock Reports & Analytics */}
      <Route path="/reports/daily" element={<Stock.DailyStockReport />} />
      <Route path="/reports/weekly" element={<Stock.WeeklyStockReport />} />
      <Route path="/reports/monthly" element={<Stock.MonthlyStockReport />} />
      <Route path="/reports/annual" element={<Stock.AnnualStockReport />} />
      
      {/* Return and Refund Management */}
      <Route path="/returns/list" element={<Stock.ReturnList />} />
      <Route path="/refunds/list" element={<Stock.RefundList />} />
      <Route path="/returns/process" element={<Stock.ProcessReturns />} />
      <Route path="/refunds/requests" element={<Stock.RefundRequests />} />
      <Route path="/returns/damaged" element={<Stock.DamagedStockReturns />} />
      <Route path="/returns/supplier" element={<Stock.SupplierReturnManagement />} />
    </Routes>
  );
};

export default StockRoutes;
