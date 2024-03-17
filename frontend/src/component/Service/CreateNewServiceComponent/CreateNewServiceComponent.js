// Assuming CreateNewServiceComponent is located under src/services/CreateNewServiceComponent.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createNewService } from "../../../services/ServiceService"; // Update the import path based on your project structure
import LoaderModal from "../../Loader/LoaderModal";
import "./CreateNewServiceComponent.css";

const CreateNewServiceComponent = ({ selectedProduct }) => {
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState({
    customerId: selectedProduct.customerId, // Assuming selectedProduct is passed as prop from parent
    productId: selectedProduct.productId,
    serviceDate: "",
    serviceType: "",
    isServiceCompleted: false,
    partsReplaced: "",
    amountCharged: "",
    customerRemarks: "",
  });

  const [isLoading, setIsLoading] = useState(false); // New loading state

  if (isLoading) {
    return <LoaderModal />; // Show loader when loading
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createNewService(serviceData);
      navigate("/pending-services"); // Adjust navigation as needed
    } catch (error) {
      console.error("Failed to create service:", error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    // Check that all required text fields are not empty
    const allTextFieldsFilled = Object.entries(serviceData).every(
      ([key, value]) => {
        // Assuming that 'amountCharged' is optional and can be null or a number, and 'isServiceCompleted' is a boolean
        if (key === "amountCharged") return true; // Skip validation for 'amountCharged'
        if (typeof value === "string") return value.trim() !== ""; // Check non-empty for strings
        return true; // Assume non-string fields are valid (like booleans or numbers)
      }
    );

    // Implement other validation logic as necessary, for example, checking if the date is in the correct format or if the number fields have valid numbers

    return allTextFieldsFilled;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Convert to float if it's the 'amountCharged' field, but only if it's not empty
    let newValue = value;
    if (name === "amountCharged") {
      newValue = parseFloat(value);
      // You may also want to handle potential NaN values if parseFloat fails
      if (isNaN(newValue)) {
        newValue = "";
      }
    } else if (type === "checkbox") {
      newValue = checked;
    }
    setServiceData({ ...serviceData, [name]: newValue });
  };

  return (
    <div className="create-service-container">
      <h2>Create New Service</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="serviceDate">Service Date:</label>
          <input
            id="serviceDate"
            name="serviceDate"
            type="date"
            value={serviceData.serviceDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="serviceType">Service Type:</label>
          <select
            id="serviceType"
            name="serviceType"
            value={serviceData.serviceType}
            onChange={handleChange}
            required
          >
            {/* Enum options for serviceType */}
            <option value="">Select a Service Type</option>
            <option value="installation">Installation</option>
            <option value="service request">Service Request</option>
            <option value="mandatory service">Mandatory Service</option>
            <option value="contract service">Contract Service</option>
            <option value="free service">Free Service</option>
          </select>
        </div>
        <div>
          <label htmlFor="isServiceCompleted">IsServiceCompleted:</label>
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
          <label htmlFor="partsReplaced">Parts Replaced:</label>
          <input
            type="text"
            id="partsReplaced"
            name="partsReplaced"
            value={serviceData.partsReplaced}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="customerRemarks">Customer Remarks:</label>
          <input
            type="text"
            id="customerRemarks"
            name="customerRemarks"
            value={serviceData.customerRemarks}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="amountCharged">Amount Charged:</label>
          <input
            type="text" // Keep as 'text' to allow empty values, but handle as number in handleChange
            id="amountCharged"
            name="amountCharged"
            value={serviceData.amountCharged.toString()} // Convert to string for input value
            onChange={handleChange}
            placeholder="Enter amount or leave blank"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isFormValid()}
        >
          Create Service
        </button>
      </form>
    </div>
  );
};

export default CreateNewServiceComponent;
