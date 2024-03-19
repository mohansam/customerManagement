import React, { useState } from "react";
import { getCustomerByMobileNum } from "../services/CustomerService";
import CustomerCard from "../component/Customer/CustomerCard";
import CreateNewProductComponent from "../component/Product/CreateNewProductComponent";
import LoaderModal from "../component/Loader/LoaderModal";
import ErrorMessageModel from "../component/ErrorMessageModel/ErrorMessageModel";

const ProductToServiceWorkflow = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [mobileNum, setMobileNum] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <LoaderModal />;
  }

  const handleMobileNumChange = (e) => {
    setMobileNum(e.target.value);
  };

  const fetchCustomer = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const customerData = await getCustomerByMobileNum(mobileNum);
      setCustomer(customerData);
    } catch (error) {
      setModalMessage(error.message);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {!selectedCustomer ? (
        <div className="container">
          <h2>Create New Product</h2>
          <input
            type="text"
            placeholder="Enter customer's mobile number"
            value={mobileNum}
            onChange={handleMobileNumChange}
            className="form-input"
          />
          <button
            onClick={fetchCustomer}
            disabled={isLoading}
            className="form-button"
          >
            Fetch Customer
          </button>
          {customer && (
            <div className="card-item-list">
              <div onClick={() => setSelectedCustomer(customer)}>
                <CustomerCard customer={customer} />
              </div>
            </div>
          )}
          <ErrorMessageModel
            isOpen={isModalOpen}
            message={modalMessage}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      ) : (
        <CreateNewProductComponent selectedCustomer={selectedCustomer} />
      )}
    </div>
  );
};

export default ProductToServiceWorkflow;
