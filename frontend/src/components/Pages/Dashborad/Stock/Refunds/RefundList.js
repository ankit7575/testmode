import React from "react";

import Layout from "../../../components/Layout/Layout"; // Import your Layout component
import Home from "../../../components/Pages/Dashborad/Purchase/Home/Home"
const RefundList = () => {


  return (
    <Layout menuType="stock" userRole="admin"> {/* Pass menuType and userRole */}
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
        <Home/>
        </div>
      </div>
    </div>
  </Layout>
  );
};

export default RefundList;
