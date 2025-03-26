import React from "react";
import { Routes, Route } from "react-router-dom";
import * as BusinessInsights from "../pages/BusinessInsights/Home";

const BusinessInsightsRoutes = () => {
  return (
    <Routes>
      {/* Business Insights */}
      <Route path="/" element={<BusinessInsights.BusinessInsightsHome />} />
      <Route path="/add-user" element={<BusinessInsights.AddUser />} />
      <Route path="/edit-user" element={<BusinessInsights.EditUser />} />
      <Route path="/users" element={<BusinessInsights.UserList />} />
      <Route path="/franchise/add" element={<BusinessInsights.AddFranchise />} />
      <Route path="/franchise/list" element={<BusinessInsights.FranchiseList />} />
      <Route path="/franchise/sales" element={<BusinessInsights.FranchiseSales />} />
      <Route path="/overview" element={<BusinessInsights.SalesOverview />} />
      <Route path="/franchise-sales" element={<BusinessInsights.FranchiseSalesReport />} />
      <Route path="/best-sellers" element={<BusinessInsights.BestSellers />} />
      <Route path="/customer-trends" element={<BusinessInsights.CustomerTrends />} />
      <Route path="/system-notifications" element={<BusinessInsights.SystemNotifications />} />
      <Route path="/user-logs" element={<BusinessInsights.UserLogs />} />
      <Route path="/transaction-logs" element={<BusinessInsights.TransactionLogs />} />
    </Routes>
  );
};

export default BusinessInsightsRoutes;
