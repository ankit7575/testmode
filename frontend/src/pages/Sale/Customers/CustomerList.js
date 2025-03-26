import React from "react";

import Layout from "../../../components/Layout/Layout"; // Import your Layout component
import Home from "../../../components/Pages/Dashborad/Sale/Home/Home"
const CustomerList = () => {


  return (
    <Layout menuType="sales" userRole="admin"> {/* Pass menuType and userRole */}
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

export default CustomerList;
