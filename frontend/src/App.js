import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import CreateNewCustomerComponent from "./component/Customer/CreateNewCustomerComponent";
import CreateNewProductComponent from "./component/Product/CreateNewProductComponent";
import ProductToServiceWorkflow from "./pages/ProductToServiceWorkflow";
import PendingServicesComponent from "./component/Service/PendingServicesComponent/PendingServicesComponent";
import UpcomingServicesComponent from "./component/Service/UpcomingServicesComponent/UpcomingServicesComponent";
import CheckCustomerDetails from "./pages/CheckCustomerDetails";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/create-customer"
            element={<CreateNewCustomerComponent />}
          />
          <Route
            path="/create-product"
            element={<CreateNewProductComponent />}
          />
          <Route
            path="/create-service"
            element={<ProductToServiceWorkflow />}
          />
          <Route
            path="/pending-services"
            element={<PendingServicesComponent />}
          />
          <Route
            path="/upcoming-services"
            element={<UpcomingServicesComponent />}
          />
          <Route
            path="/check-customer-details"
            element={<CheckCustomerDetails />}
          />
          <Route path="/" element={<PendingServicesComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
