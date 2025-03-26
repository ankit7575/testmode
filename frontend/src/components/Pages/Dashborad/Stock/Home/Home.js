import React from "react";

import Homelayout from "./element/Homelayout";
import StockChart from "./element/StockChart";
import SupplierList from "./element/SupplierList";
import ReturnList from "./element/ReturnList";
const Home = () => {
  return (
   <>
   <div className="row" >
    <div className="col-lg-12" >
      <Homelayout/>
    </div>
    <div className="col-lg-12" >
    <StockChart/>
    
    </div>
    <div className="col-lg-6 pt-5" >
    <SupplierList/>
    </div>
    <div className="col-lg-6 pt-5" >
<ReturnList/>

    </div>

   </div>

   </>
  );
};

export default Home;
