import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Lazy Load Components
const LoginPage = lazy(() => import("./pages/Login"));
const FranchisePage = lazy(() => import("./pages/Franchise"));
const AdminConsole = lazy(() => import("./pages/AdminConsole"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Import Route Components
const StockRoutes = lazy(() => import("./routes/StockRoutes"));
const SaleRoutes = lazy(() => import("./routes/SaleRoutes"));
const BusinessInsightsRoutes = lazy(() => import("./routes/BusinessInsightsRoutes"));
const PurchaseRoutes = lazy(() => import("./routes/PurchaseRoutes"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/franchise" element={<FranchisePage />} />
          <Route path="/admin-console" element={<AdminConsole />} />

          {/* Feature Routes */}
          <Route path="/stock/*" element={<StockRoutes />} />
          <Route path="/sales/*" element={<SaleRoutes />} />
          <Route path="/business-insights/*" element={<BusinessInsightsRoutes />} />
          <Route path="/purchase/*" element={<PurchaseRoutes />} />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
