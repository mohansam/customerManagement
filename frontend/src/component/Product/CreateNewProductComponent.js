// components/CreateNewProductComponent.js

import React, { useState } from "react";
import { createNewProduct } from "../../services/ProductService";
import { getCustomerByMobileNum } from "../../services/CustomerService";
import SimpleModal from "./SimpleModal"; // Assuming you have this component for showing error messages

const CreateNewProductComponent = () => {
  const [mobileNum, setMobileNum] = useState("");
  const [customer, setCustomer] = useState(null);
  const [productData, setProductData] = useState({
    customerId: "",
    productName: "",
    dateOfInstallation: "",
    warranty: "",
    model: "",
    pump: "",
    membrane: "",
    powerSupply: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleMobileNumSubmit = async (e) => {
    e.preventDefault();
    try {
      const customerData = await getCustomerByMobileNum(mobileNum);
      setCustomer(customerData);
      setProductData({ ...productData, customerId: customerData.customerId });
    } catch (error) {
      setModalMessage(error.message);
      setIsModalOpen(true);
    }
  };

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createNewProduct(productData);
      console.log(response);
      // Handle successful product creation, e.g., navigate to a confirmation page or reset form
    } catch (error) {
      setModalMessage(error.message);
      setIsModalOpen(true);
    }
  };

  const isFormValid = () => {
    // Implement validation logic here based on your requirements
    return Object.values(productData).every((value) => value.trim() !== "");
  };

  return (
    <div>
      {!customer ? (
        <form onSubmit={handleMobileNumSubmit}>
          <label>
            Enter Customer's Mobile Number:
            <input
              type="text"
              value={mobileNum}
              onChange={(e) => setMobileNum(e.target.value)}
            />
          </label>
          <button type="submit">Fetch Customer</button>
        </form>
      ) : (
        <>
          <p>Customer Selected: {customer.customerName}</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="productName">Product Name:</label>
              <input
                id="productName"
                name="productName"
                type="text"
                value={productData.productName}
                onChange={handleInputChange}
                required
                maxLength={100} // Enforce the max length
              />
            </div>
            <div>
              <label htmlFor="dateOfInstallation">Date of Installation:</label>
              <input
                id="dateOfInstallation"
                name="dateOfInstallation"
                type="date"
                value={productData.dateOfInstallation}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="warranty">Warranty:</label>
              <input
                id="warranty"
                name="warranty"
                type="text"
                value={productData.warranty}
                onChange={handleInputChange}
                required
                maxLength={100}
              />
            </div>
            <div>
              <label htmlFor="model">Model:</label>
              <input
                id="model"
                name="model"
                type="text"
                value={productData.model}
                onChange={handleInputChange}
                required
                maxLength={100}
              />
            </div>
            <div>
              <label htmlFor="pump">Pump:</label>
              <input
                id="pump"
                name="pump"
                type="text"
                value={productData.pump}
                onChange={handleInputChange}
                required
                maxLength={100}
              />
            </div>
            <div>
              <label htmlFor="membrane">Membrane:</label>
              <input
                id="membrane"
                name="membrane"
                type="text"
                value={productData.membrane}
                onChange={handleInputChange}
                required
                maxLength={100}
              />
            </div>
            <div>
              <label htmlFor="powerSupply">Power Supply:</label>
              <input
                id="powerSupply"
                name="powerSupply"
                type="text"
                value={productData.powerSupply}
                onChange={handleInputChange}
                required
                maxLength={100}
              />
            </div>
            <button type="submit" disabled={!isFormValid()}>
              Create Product
            </button>
          </form>
        </>
      )}
      <SimpleModal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CreateNewProductComponent;
