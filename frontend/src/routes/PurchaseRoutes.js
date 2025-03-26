import React from "react";
import { Routes, Route } from "react-router-dom";
import * as Purchase from "../pages/Purchase/Home";

const PurchaseRoutes = () => {
  return (
    <Routes>
     <Route path="/" element={<Purchase.PurchaseHome />} />

{/* Supplier Integration */}
<Route path="/suppliers/payment-status" element={<Purchase.SupplierPaymentStatus />} />
<Route path="/suppliers/product-returns" element={<Purchase.SupplierProductReturns />} />

{/* Invoice & Billing */}
<Route path="/invoices/generate" element={<Purchase.GeneratePurchaseInvoice />} />
<Route path="/invoices/pending" element={<Purchase.PendingInvoices />} />
<Route path="/invoices/history" element={<Purchase.InvoiceHistory />} />

{/* Payment Management */}
<Route path="/payments/record" element={<Purchase.RecordPayments />} />
<Route path="/payments/pending" element={<Purchase.PendingPayments />} />
<Route path="/payments/history" element={<Purchase.PaymentHistory />} />
<Route path="/payments/reminders" element={<Purchase.PaymentReminders />} />
<Route path="/payments/advance-payments" element={<Purchase.SupplierAdvancePayments />} />

{/* Reports & Analytics */}
<Route path="/reports/purchase" element={<Purchase.PurchaseReports />} />
<Route path="/reports/payment" element={<Purchase.PaymentReports />} />
    </Routes>
  );
};

export default PurchaseRoutes;
