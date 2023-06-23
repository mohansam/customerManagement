import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import CreateNewCustomerComponent from "./component/CreateNewCustomerComponent";
import CreateNewServiceComponent from "./component/CreateNewServiceComponent";
import PendingServicesComponent from "./component/PendingServicesComponent";
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
            path="/create-service"
            element={<CreateNewServiceComponent />}
          />
          <Route
            path="/pending-services"
            element={<PendingServicesComponent />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
