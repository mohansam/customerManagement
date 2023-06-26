import React from "react";
import PropTypes from "prop-types";
import "./CustomerModal.css";

const CustomerModal = ({ customerData, isLoading, closeModal }) => {
  console.log("customer data from modal", customerData);
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Customer Details</h2>
        {isLoading ? (
          <p>Loading customer data...</p>
        ) : (
          <>
            {customerData ? (
              <div>
                <p>Customer ID: {customerData.customerId}</p>
                <p>Customer Name: {customerData.customerName}</p>
                <p>Customer Address: {customerData.customerAddress}</p>
                <p>Customer Mobile Number: {customerData.customerMobileNum}</p>
              </div>
            ) : (
              <p>No customer data available.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

CustomerModal.propTypes = {
  customerData: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default CustomerModal;
