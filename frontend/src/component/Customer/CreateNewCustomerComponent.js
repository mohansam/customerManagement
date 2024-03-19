import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessageModel from "../ErrorMessageModel/ErrorMessageModel";
import { createNewCustomer } from "../../services/CustomerService";
import LoaderModal from "../Loader/LoaderModal";

const CreateNewCustomerComponent = () => {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({
    customerName: "",
    customerAddress: "",
    customerMobileNum: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <LoaderModal />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    e.preventDefault();
    if (!isFormValid()) {
      setModalMessage("Please fill in all fields correctly.");
      setIsModalOpen(true);
      return;
    }

    try {
      await createNewCustomer(customerData);
      navigate("/create-product");
    } catch (error) {
      console.log(error);
      setModalMessage(error.message);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    const { customerName, customerAddress, customerMobileNum } = customerData;
    return (
      customerName.trim() !== "" &&
      customerAddress.trim() !== "" &&
      /^[0-9]{10}$/.test(customerMobileNum)
    );
  };

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2>Create New Customer</h2>
      <div className="form-container">
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
      <ErrorMessageModel
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CreateNewCustomerComponent;
