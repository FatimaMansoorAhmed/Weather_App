import React from "react";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import  Weather  from "../components/Weather";

const AppRoutes = () => {
  return (
   <>
<Router>
  <Routes>
    <Route path="/" element={<Weather/>}/>
  </Routes>
</Router>
   </>
    );
};

export default AppRoutes;
