import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import CreateNewCustomerComponent from "./component/Customer/CreateNewCustomerComponent";
import ProductToServiceWorkflow from "./pages/ProductToServiceWorkflow";
import CustomerToProductWorkflow from "./pages/CustomerToProductWorkflow";
import PendingServicesComponent from "./component/Service/PendingServicesComponent";
import UpcomingServicesComponent from "./component/Service/UpcomingServicesComponent";
import CheckCustomerDetails from "./pages/CheckCustomerDetails";
import PendingRemindersComponent from "./component/Product/PendingRemindersComponent";
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
            element={<CustomerToProductWorkflow />}
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
          <Route
            path="/get-reminders"
            element={<PendingRemindersComponent />}
          />
          <Route path="/" element={<PendingServicesComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
