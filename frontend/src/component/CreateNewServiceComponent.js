import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CreateNewServiceComponent.css";

const CreateNewServiceComponent = () => {
  const [serviceData, setServiceData] = useState({
    customerId: 0,
    serviceDate: "",
    isServiceCompleted: false,
    productName: "",
    isFreeService: false,
  });

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
        window.location.href = "/";
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
    setServiceData({ ...serviceData, [e.target.name]: e.target.value });
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
          <label htmlFor="customerId">Customer ID:</label>
          <input
            type="number"
            id="customerId"
            name="customerId"
            value={serviceData.customerId}
            onChange={handleChange}
          />
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
          <input
            type="checkbox"
            id="isServiceCompleted"
            name="isServiceCompleted"
            checked={serviceData.isServiceCompleted}
            onChange={handleChange}
          />
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
          <input
            type="checkbox"
            id="isFreeService"
            name="isFreeService"
            checked={serviceData.isFreeService}
            onChange={handleChange}
          />
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
