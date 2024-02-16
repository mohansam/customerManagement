import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateNewCustomerComponent.css";

const CreateNewCustomerComponent = () => {
  const hostName =
    "c5vivyjwsori5w5eenemb7yiuy0jzzek.lambda-url.ap-south-1.on.aws";
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({
    customerName: "",
    customerAddress: "",
    customerMobileNum: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://${hostName}/api/v1/customer/createNewCustomer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customerData),
        }
      );

      if (response.ok) {
        // Handle success or redirect to another page
        navigate("/create-service");
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
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    const { customerName, customerAddress, customerMobileNum } = customerData;
    return (
      customerName.trim() !== "" &&
      customerAddress.trim() !== "" &&
      customerMobileNum.trim() !== ""
    );
  };

  return (
    <div className="create-customer-container">
      <Link to="/" className="create-customer-back-link">
        &lt; Back to Home
      </Link>
      <h2>Create New Customer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customerName">Name:</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={customerData.customerName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="customerAddress">Address:</label>
          <input
            type="text"
            id="customerAddress"
            name="customerAddress"
            value={customerData.customerAddress}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="customerMobileNum">Mobile Number:</label>
          <input
            type="text"
            id="customerMobileNum"
            name="customerMobileNum"
            value={customerData.customerMobileNum}
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
            Create Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewCustomerComponent;
