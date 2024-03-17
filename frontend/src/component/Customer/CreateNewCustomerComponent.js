import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SimpleModal from "./SimpleModal";
import { createNewCustomer } from "../../services/CustomerService";
import "./CreateNewCustomerComponent.css";

const CreateNewCustomerComponent = () => {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({
    customerName: "",
    customerAddress: "",
    customerMobileNum: "",
  });
  // States for handling modal visibility and message
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    e.preventDefault();
    if (!isFormValid()) {
      setModalMessage("Please fill in all fields correctly.");
      setIsModalOpen(true);
      return;
    }

    try {
      await createNewCustomer(customerData); // Use the service function
      navigate("/create-product");
    } catch (error) {
      console.log(error);
      setModalMessage(error.message);
      setIsModalOpen(true);
    }
  };

  const isFormValid = () => {
    const { customerName, customerAddress, customerMobileNum } = customerData;
    return (
      customerName.trim() !== "" &&
      customerAddress.trim() !== "" &&
      /^[0-9]{10}$/.test(customerMobileNum) // Ensuring mobile number is 10 digits
    );
  };

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
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
      <SimpleModal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CreateNewCustomerComponent;
