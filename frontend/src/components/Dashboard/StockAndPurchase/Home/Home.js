import React from "react";
import Totalstockgraph from "./element/Totalstockgraph";
import Homelayout from "./element/Homelayout"

const Home = () => {
  return (
   <>
   <div className="row" >
    <div className="col-lg-12" >
      <Homelayout/>
    </div>
    <div className="col-lg-12" >
    <Totalstockgraph/>
    </div>
    <div className="col-lg-6" >

    </div>
    <div>

    </div>

   </div>

   </>
  );
};

export default Home;
