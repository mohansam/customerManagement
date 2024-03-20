import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../services/ProductService";
import LoaderModal from "../Loader/LoaderModal";
import ErrorMessageModel from "../ErrorMessageModel/ErrorMessageModel"; // Assuming you have this component for showing error messages

const CreateNewProductComponent = ({ selectedCustomer }) => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    customerId: selectedCustomer.customerId,
    productName: "",
    dateOfInstallation: "",
    warranty: "",
    model: "",
    pump: "",
    membrane: "",
    powerSupply: "",
    modeOfPurchase: "",
    reminderDays: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <LoaderModal />;
  }

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createNewProduct(productData);
      navigate("/create-service");
    } catch (error) {
      setModalMessage(error.message);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return Object.values(productData).every((value) => value.trim() !== "");
  };

  return (
    <div className="container">
      <h2>Create New Product</h2>
      <div className="form-container">
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
          <div>
            <label htmlFor="modeOfPurchase">Mode of Purchase:</label>
            <select
              id="modeOfPurchase"
              name="modeOfPurchase"
              value={productData.modeOfPurchase}
              onChange={handleInputChange}
              required
            >
              <option value="">Select...</option>
              <option value="online">Online</option>
              <option value="store">Store</option>
            </select>
          </div>
          <div>
            <label htmlFor="reminderDays">Reminder Days:</label>
            <input
              id="reminderDays"
              name="reminderDays"
              type="number"
              value={productData.reminderDays}
              onChange={handleInputChange}
              required
              min="0" // Ensure that reminder days cannot be negative
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
      </div>

      <ErrorMessageModel
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CreateNewProductComponent;
