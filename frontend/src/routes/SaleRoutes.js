import React from "react";
import { Routes, Route } from "react-router-dom";
import * as Sale from "../pages/Sale"; // Import Sale from the correct path

const SaleRoutes = () => {
  return (
    <Routes>
      {/* Sale */}
      <Route path="/" element={<Sale.SaleHome />} />
      <Route path="/new" element={<Sale.NewSale />} />
      <Route path="/orders" element={<Sale.CustomerOrders />} />
      <Route path="/returns" element={<Sale.SalesReturns />} />

      {/* Invoices & Billing */}
      <Route path="/invoices/generate" element={<Sale.GenerateInvoice />} />
      <Route path="/invoices/history" element={<Sale.InvoiceHistory />} />
      <Route path="/invoices/pending-payments" element={<Sale.PendingPayments />} />
      <Route path="/invoices/payment-receipts" element={<Sale.PaymentReceipts />} />
      <Route path="/invoices/tax-calculation" element={<Sale.TaxCalculation />} />
      <Route path="/invoices/recurring" element={<Sale.RecurringInvoices />} />

      {/* Customer Management */}
      <Route path="/customers/list" element={<Sale.CustomerList />} />
      <Route path="/customers/profiles" element={<Sale.CustomerProfiles />} />
      <Route path="/customers/support" element={<Sale.CustomerSupport />} />

      {/* Sales Analytics & Reports */}
      <Route path="/reports/dashboard" element={<Sale.SalesDashboard />} />
      <Route path="/reports-product" element={<Sale.SalesByProduct />} />
      <Route path="/reports/growth-trends" element={<Sale.SalesGrowthTrends />} />

      {/* Payment Management */}
      <Route path="/payments/methods" element={<Sale.PaymentMethods />} />
      <Route path="/payments/partial" element={<Sale.PartialPayments />} />
      <Route path="/payments/refunds" element={<Sale.RefundProcessing />} />
      <Route path="/payments/reminders" element={<Sale.PaymentReminders />} />

      {/* Returns & Refunds */}
      <Route path="/returns/requests" element={<Sale.ReturnRequests />} />
      <Route path="/returns/status" element={<Sale.RefundStatus />} />
      <Route path="/returns/damaged-goods" element={<Sale.DamagedGoodsReturns />} />
      <Route path="/returns/customer-approvals" element={<Sale.CustomerRefundApprovals />} />
      <Route path="/returns/supplier-management" element={<Sale.SupplierReturnManagementSale />} />
      <Route path="/returns/warranty" element={<Sale.WarrantyBasedReturns />} />
    </Routes>
  );
};

export default SaleRoutes;
