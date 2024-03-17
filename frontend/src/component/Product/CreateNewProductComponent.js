import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../services/ProductService";
import { getCustomerByMobileNum } from "../../services/CustomerService";
import "./FormStyles.css";
import LoaderModal from "../Loader/LoaderModal";
import ErrorMessageModel from "../ErrorMessageModel/ErrorMessageModel"; // Assuming you have this component for showing error messages

const CreateNewProductComponent = () => {
  const navigate = useNavigate();
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
  const [isLoading, setIsLoading] = useState(false); // New loading state

  if (isLoading) {
    return <LoaderModal />; // Show loader when loading
  }

  const handleMobileNumSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const customerData = await getCustomerByMobileNum(mobileNum);
      setCustomer(customerData);
      setProductData({ ...productData, customerId: customerData.customerId });
    } catch (error) {
      setModalMessage(error.message);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const response = await createNewProduct(productData);
      console.log(response);
      navigate("/create-service");
      // Handle successful product creation, e.g., navigate to a confirmation page or reset form
    } catch (error) {
      setModalMessage(error.message);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };

  const isFormValid = () => {
    // Implement validation logic here based on your requirements
    return Object.values(productData).every((value) => value.trim() !== "");
  };

  return (
    <div className="form-container">
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
          <h2>Create New Product</h2>
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
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isFormValid()}
            >
              Create Product
            </button>
          </form>
        </>
      )}
      <ErrorMessageModel
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CreateNewProductComponent;
