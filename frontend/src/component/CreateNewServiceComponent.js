import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateNewServiceComponent.css";

const CreateNewServiceComponent = () => {
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState({
    customerId: 0,
    serviceDate: "",
    isServiceCompleted: false,
    productName: "",
    isFreeService: false,
    customerName: "",
  });

  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    if (serviceData.customerName.trim() !== "") {
      fetchCustomersByName();
    }
  }, [serviceData.customerName]);

  const fetchCustomersByName = async () => {
    try {
      const response = await fetch(
        `/api/v1/customer/getCustomerByName?customerName=${serviceData.customerName}`
      );
      const customers = await response.json();
      setCustomerList(customers);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/v1/service/createNewService", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      if (response.ok) {
        // Handle success or redirect to another page
        navigate("/pending-services");
      } else {
        console.error("Request failed");
        // Handle error
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setServiceData({ ...serviceData, [name]: newValue });
  };

  const handleCustomerSelect = (customerId) => {
    setServiceData({ ...serviceData, customerId });
  };

  const isFormValid = () => {
    const { customerId, serviceDate, productName } = serviceData;
    return (
      customerId !== 0 && serviceDate.trim() !== "" && productName.trim() !== ""
    );
  };

  return (
    <div className="create-service-container">
      <Link to="/" className="create-service-back-link">
        &lt; Back to Home
      </Link>
      <h2>Create New Service</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customerName">Customer Name:</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={serviceData.customerName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="customerId">Customer ID:</label>
          <select
            id="customerId"
            name="customerId"
            value={serviceData.customerId}
            onChange={(e) => handleCustomerSelect(e.target.value)}
          >
            <option value={0}>Select Customer</option>
            {customerList.map((customer) => (
              <option key={customer.customerId} value={customer.customerId}>
                {customer.customerName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="serviceDate">Service Date:</label>
          <input
            type="date"
            id="serviceDate"
            name="serviceDate"
            value={serviceData.serviceDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="isServiceCompleted">Service Completed:</label>
          <select
            id="isServiceCompleted"
            name="isServiceCompleted"
            value={serviceData.isServiceCompleted}
            onChange={handleChange}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={serviceData.productName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="isFreeService">Free Service:</label>
          <select
            id="isFreeService"
            name="isFreeService"
            value={serviceData.isFreeService}
            onChange={handleChange}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>
        <div>
          <Link to="/" className="btn btn-secondary">
            Cancel
          </Link>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isFormValid()}
          >
            Create Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewServiceComponent;
